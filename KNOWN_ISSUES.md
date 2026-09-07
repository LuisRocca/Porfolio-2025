# Problemas Conocidos y Soluciones Aplicadas

Registro de bugs diagnosticados y arreglados en este repo, en formato
**problema → causa → fix/prevención**. Consultar este documento *antes* de
depurar cualquier problema nuevo.

---

## 1. Clases de Tailwind construidas dinámicamente nunca se generan

**Problema.** Las barras de nivel en `components/skills.tsx` salían sin color
en producción, y los puntos de lenguaje en `components/repositories.tsx` eran
invisibles.

**Causa.** El código construía el nombre de la clase en tiempo de ejecución:

```tsx
// skills.tsx (antiguo)
className={`bg-gradient-to-r from-${skill.color} to-${skill.color}-glow`}
// repositories.tsx (antiguo)
className={`w-3 h-3 rounded-full bg-${languageColors[repo.language]}`}
```

Tailwind hace un escaneo **estático** de los archivos: sólo emite CSS para
las clases que encuentra escritas literalmente. `bg-${x}` no existe como
texto, así que esa regla nunca llega al bundle. Agravante: el mapa de
lenguajes referenciaba `cyber-orange`, `cyber-pink` y `cyber-red`, colores
que ni siquiera estaban definidos en `tailwind.config.ts`.

**Fix.** Para un color que depende de datos en tiempo de ejecución, no se usa
Tailwind: se pasa el valor por `style`.

```tsx
<span style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? FALLBACK_COLOR }} />
```

**Prevención.** Nunca interpolar dentro de un nombre de clase de Tailwind. Si
el valor es de un conjunto cerrado y conocido, usar un mapa de clases
completas (`{ blue: "bg-blue-500", red: "bg-red-500" }`); si es abierto, usar
`style` con el valor literal.

---

## 2. `font-cyber` anulaba la fuente Geist en toda la página

**Problema.** El sitio se renderizaba con la fuente del sistema pese a tener
`geist` instalado y configurado.

**Causa.** `app/layout.tsx` fijaba `font-family: GeistSans` en `html`, pero
`app/page.tsx` aplicaba `className="font-cyber"` al `div` raíz. En
`tailwind.config.ts`, `font-cyber` estaba definida como
`["Inter", "system-ui", "sans-serif"]` — e **Inter nunca se cargaba** en
ningún sitio. La regla del `div` (más específica en el árbol) ganaba y la
cadena caía a `system-ui`.

**Fix.** Se eliminó `font-cyber`. Las variables de Geist se aplican en `<html>`
(`GeistSans.variable` / `GeistMono.variable`) y Tailwind las consume vía
`fontFamily: { sans: ["var(--font-geist-sans)", ...] }`.

**Prevención.** Declarar la tipografía en un solo lugar (`fontFamily` de
Tailwind + variables en `<html>`) y no crear familias que apunten a fuentes
que el proyecto no carga.

---

## 3. Botones sin `onClick` que parecían funcionar

**Problema.** "Ver Código" en proyectos y "Ver todos los repositorios" no
hacían nada al pulsarlos.

**Causa.** Eran `<Button>` sin handler ni `href`. Además, el `codeUrl` del
segundo proyecto era `"#"`, así que aunque hubiera tenido handler no habría
llevado a ninguna parte.

**Fix.** Toda navegación se hace con `<a href>` en vez de `<button onClick>`,
y el enlace al repositorio sólo se renderiza si el proyecto declara `codeUrl`.

**Prevención.** Un elemento que navega es un enlace, no un botón: así funciona
el clic medio, "abrir en pestaña nueva" y los lectores de pantalla, y es
imposible olvidar el handler.

---

## 4. ESLint 9 no leía la configuración y el build ignoraba todos los errores

**Problema.** `npx eslint .` fallaba con *"couldn't find an eslint.config.js"*
y el build pasaba siempre, incluso con errores de tipos.

**Causa.** El proyecto tenía `.eslintrc.json` (formato legacy) con ESLint 9
instalado, que sólo lee *flat config*. Para que el deploy no se rompiera se
había puesto en `next.config.mjs`:

```js
eslint: { ignoreDuringBuilds: true },
typescript: { ignoreBuildErrors: true },
```

Es decir, se desplegaba sin ninguna verificación.

**Fix.** Migrado a `eslint.config.mjs` con `FlatCompat` sobre
`next/core-web-vitals`, y eliminadas ambas banderas de `next.config.mjs`.
`tsc --noEmit`, `next lint` y `next build` pasan en verde.

**Prevención.** `ignoreBuildErrors` / `ignoreDuringBuilds` no son una solución,
son una forma de desplegar a ciegas. Si el linter estorba, se arregla la
configuración.

---

## 5. Contenido oculto por el reveal si el `IntersectionObserver` no entrega

**Problema.** Las secciones aparecen con `opacity: 0` desde CSS y sólo se
muestran cuando el observer detecta que entran en viewport. Si el observer no
entrega ninguna entrada, la página queda **en blanco**.

**Causa.** Se detectó al verificar en un navegador automatizado: con
`document.visibilityState === "hidden"` el navegador suspende las entregas de
`IntersectionObserver`, así que ninguna sección se revelaba nunca. Lo mismo
ocurriría sin JavaScript.

**Fix.** Dos redes de seguridad independientes:

1. `hooks/use-reveal.ts` cronometra la **primera entrega**. Un observer
   operativo siempre entrega una entrada inicial, intersecte o no; si a los
   1,5 s no llegó ninguna, se revela el contenido igualmente.
2. `app/layout.tsx` incluye un `<noscript>` que anula el estado oculto, porque
   sin JavaScript nadie añade la clase `reveal-visible`.

**Prevención.** Si un efecto visual esconde contenido por defecto, el estado
por defecto tiene que ser el visible, o debe existir un camino garantizado
para volver a él. Nunca dejar que el contenido dependa de que una API del
navegador se comporte.

---

## 6. La API de repositorios devolvía textos en inglés no traducibles

**Problema.** Con el sitio en español, los repositorios sin descripción
mostraban *"No description available"*.

**Causa.** `app/api/repositories/route.ts` aplicaba el valor por defecto en el
servidor (`repo.description || 'No description available'`), así que el
cliente nunca veía un valor vacío que pudiera traducir.

**Fix.** La API devuelve `description` y `language` tal cual (`null` incluido)
y el estado vacío se resuelve en el cliente con `t("repositories.noDescription")`.

**Prevención.** El texto visible para el usuario se decide en la capa que
conoce el idioma activo. Una API devuelve datos, no copy.

---

## 7. Límite de la API pública de GitHub

**Problema.** Riesgo de agotar el límite de 60 peticiones/hora por IP: cada
visita disparaba una llamada a `api.github.com`.

**Causa.** La ruta no cacheaba nada y era dinámica.

**Fix.** `export const revalidate = 3600` en la ruta y `next: { revalidate }`
en el `fetch`. La ruta pasa a estar prerenderizada con revalidación horaria
(visible en la salida del build). Si se define `GITHUB_TOKEN` el límite sube a
5.000/hora.

**Prevención.** Toda llamada a una API externa con cuota va cacheada; el
contenido de un portafolio no necesita ser fresco al segundo.

---

## 8. Ordenar los repos por "tiene descripción" enterraba los mejores

**Problema.** La sección de código mostraba proyectos de 2021–2023 cuyas
descripciones eran *"un trabajo de universidad"*, *"proyecto grupal del grupo
5"* o *"un login seguro de practica"*, mientras que los tres repositorios
recientes y competentes —Angular 21 con Vitest, Next.js 15 con React 19— no
aparecían en ninguna parte.

**Causa.** La ruta ordenaba priorizando los repos con `description` no vacía,
asumiendo que descripción ≈ calidad:

```ts
.sort((a, b) => Number(Boolean(b.description)) - Number(Boolean(a.description)))
```

En este perfil pasa exactamente lo contrario: los repos recientes tienen README
completo pero **el campo `description` de GitHub vacío**, mientras que los
proyectos de aprendizaje sí lo rellenaron, y encima a la baja. La heurística
seleccionaba justo al revés de lo que pretendía.

**Fix.** Una lista curada a mano en `lib/profile.ts` (`FEATURED_REPOS`) que fija
qué repos se muestran y en qué orden, y descripciones propias en las
traducciones (`repositories.<nombre>.desc`) en vez de las de GitHub.

**Prevención.** Un portafolio se cura, no se autodescubre: la sección que
decide qué te representa no debería depender de una heurística sobre metadatos
que nadie mantiene. Si de verdad hace falta ordenar automáticamente, la señal
tiene que ser algo que correlacione con calidad (actividad reciente, tamaño,
presencia de tests), nunca la existencia de un campo opcional.

> [!warning] Renombrar un repo lo hace desaparecer
> `FEATURED_REPOS` empareja por nombre. Si un repositorio se renombra en
> GitHub, deja de aparecer **sin ningún error visible**. Hay que actualizar la
> lista y su clave de traducción a la vez.

---

## 9. Vercel no despliega aunque el build salga en verde

**Problema.** El despliegue de preview fallaba. El log de Vercel mostraba el
build **completo y correcto** —`Build Completed in /vercel/output [53s]`,
seguido de `Deploying outputs...`— y terminaba en:

```
Vulnerable version of Next.js detected, please update immediately.
```

**Causa.** No era un fallo de compilación: **Vercel bloquea el despliegue**
cuando la versión de Next.js está en su lista de vulnerables. Next 15.2.4
arrastra CVEs críticos (cache key confusion y content injection en la Image
Optimization API, y SSRF por manejo indebido de redirecciones en middleware).

Buscar el error en el build fue el primer instinto y era el sitio equivocado:
el build era correcto, lo que fallaba era la política de despliegue.

**Fix.** Subir a `next@16.3.4` y `eslint-config-next@16.3.4`. Comprobado con
`npm audit`: de `critical` a **cero vulnerabilidades en next**. También
`nodemailer@10` (era `high`).

El salto de major arrastró tres cosas:

1. **Next 16 usa un parser de CSS estricto** y reventaba con
   `var(--spacing(8))`, CSS inválido que Tailwind 3 generaba a partir de
   `components/ui/calendar.tsx`, un fichero de shadcn con sintaxis de
   Tailwind v4. Ese componente **no se usaba**: de los 49 de `components/ui/`
   sólo 5 se importan de verdad. Se eliminaron los 44 restantes.
2. **`next lint` ya no existe** en Next 16. El script pasó a `eslint .`.
3. **`FlatCompat` deja de funcionar** con `eslint-config-next@16`, que ya
   exporta flat config nativo: lanza un error de validación de esquema. La
   config ahora importa `eslint-config-next/core-web-vitals` directamente y
   `@eslint/eslintrc` se desinstaló.

Además se borró `pnpm-lock.yaml`, un stub de 92 bytes sin ninguna dependencia
que hacía a Vercel anunciar `Detected pnpm-lock.yaml` en un proyecto npm.

**Prevención.** Un build verde no garantiza un despliegue: **leer el log hasta
la última línea**, porque el motivo del bloqueo aparece después del resumen de
rutas. Y mantener las dependencias al día no es higiene opcional cuando la
plataforma de despliegue audita la versión del framework.

---

## 10. Reglas nuevas de lint al subir de major

**Problema.** Con `eslint-config-next@16`, tres ficheros pasaron a dar error
por `react-hooks/set-state-in-effect`, una regla que no existía en la versión
anterior.

**Causa.** Llamar a `setState` de forma síncrona dentro de un `useEffect`
provoca renderizados en cascada. Los tres casos eran patrones habituales:
marcar el montaje para no desajustar la hidratación, revelar contenido cuando
falta una API del navegador, y leer `localStorage` tras hidratar.

**Fix.** Dos se arreglaron de verdad y sólo uno se silenció:

- **`theme-toggle.tsx`**: se pintan los dos iconos y decide el CSS por la clase
  `dark` del documento. El estado `mounted` desapareció por completo.
- **`use-reveal.ts`**: cuando no hay `IntersectionObserver` ya no se llama a
  `setState` en el efecto; el temporizador de seguridad que ya existía lo
  resuelve con retardo cero.
- **`language-context.tsx`**: leer el idioma guardado sólo es posible tras
  hidratar. Se silencia la regla **en esa línea, con el motivo escrito**.

**Prevención.** Ante reglas nuevas tras un salto de major, mirarlas caso por
caso. Desactivarlas en bloque es como se llegó a `ignoreDuringBuilds` (ver #4).
Aquí dos de tres tenían arreglo real, y el que no lo tenía lleva su
justificación al lado.

---

## Variables de entorno necesarias

| Variable | Uso | Obligatoria |
|---|---|---|
| `EMAIL_USER` | Cuenta Gmail que envía el formulario de contacto | Sí, para `/api/contact` |
| `EMAIL_PASS` | Contraseña de aplicación de esa cuenta | Sí, para `/api/contact` |
| `GITHUB_USERNAME` | Usuario cuyos repos se listan (por defecto `LuisRocca`) | No |
| `GITHUB_TOKEN` | Sube el límite de la API de GitHub a 5.000 req/hora | No |
