# Portfolio 2025 — Luis Miguel Alfonzo Roca

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

Portafolio personal de **Luis Miguel Alfonzo Roca**, Senior Full Stack Engineer
& Tech Lead. Diseño minimalista editorial, bilingüe (ES/EN), con tema claro y
oscuro.

**🌐 [porfolio-2025-chi.vercel.app](https://porfolio-2025-chi.vercel.app/)**

---

## Sistema de diseño

El sitio es monocromo con **un único color de acento**. Todo el color vive en
variables CSS de `app/globals.css`, y Tailwind las consume como tokens
semánticos; no hay valores de color escritos en los componentes.

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `background` | `#FAFAFA` | `#121212` | Fondo de página |
| `card` | `#FFFFFF` | `#1C1C1C` | Superficies (nivel 1) |
| `secondary` / `muted` | `#F5F5F5` | `#262626` | Nivel 2 |
| `foreground` | `#0A0A0A` | `#FAFAFA` | Texto principal |
| `muted-foreground` | `#6B6B72` | `#A8A8B0` | Texto secundario |
| `border` | `#E5E5E5` | `#2E2E2E` | Separadores hairline |
| `brand` | `hsl(262 48% 45%)` | `hsl(258 78% 76%)` | Enlaces, sección activa, énfasis |
| `brand-solid` | `hsl(262 58% 50%)` | `hsl(262 58% 54%)` | Fondo del CTA principal (texto blanco) |

`brand` cambia de tono entre temas a propósito: un mismo violeta no puede
cumplir contraste AA de texto sobre `#FAFAFA` y sobre `#0A0A0A` a la vez, así
que en claro se oscurece (5.9:1) y en oscuro se aclara (8.5:1). `brand-solid`
sólo se usa como **fondo**, con texto blanco encima.

El tema oscuro **no parte de negro puro**: sobre `#000` los niveles de
elevación no se separan y todas las superficies se leen iguales. Los niveles
además están más espaciados que en claro, porque sin luz ambiente hace falta
más diferencia entre ellos para percibir la misma jerarquía.

### Atmósfera

Dos tratamientos distintos en `app/globals.css`, aplicados en **tres** de las
ocho secciones:

| Clase | Dónde | Capas |
|---|---|---|
| `.atmosphere--hero` | Hero — "Deep Smoke" | Base opaca · resplandor · halftone 11px · partículas de polvo · viñeta · telones superior y lateral · grano |
| `.atmosphere--quiet` | Impacto y Contacto — "Midnight Smoke" | Masa · haz de luz · líneas de órbita · viñeta · grano |

El hero es **oscuro en los dos temas**: su base es un degradado opaco que no se
puede aclarar sin perder el efecto. En vez de traducirlo, la clase `.on-dark`
reasigna los tokens de color dentro del hero (y de la barra mientras flota
sobre él), así que todo lo que ya usa `text-foreground`, `border-border` o
`text-muted-foreground` se adapta solo, sin tocar clase por clase.

Que el hero tenga un tratamiento distinto es lo que permite repetir el segundo
dos veces sin que se lea como papel pintado: pasa a ser el lenguaje de las
secciones secundarias.

Las secciones densas de lectura (experiencia, stack, proyectos, repositorios)
**no llevan fondo**. Esa alternancia es intencional: la atmósfera se percibe
como decisión porque no está en todas partes.

Restricciones que fijan los valores:

- **El telón superior no es decorativo.** La franja más luminosa del banner
  coincide con la barra de navegación; sin él, sus enlaces bajan de 3:1.
- **El telón lateral izquierdo tampoco.** La base llega a `#b3acb7` por arriba
  y sin él el texto blanco del hero quedaría por debajo de 4.5:1.
- **El haz de luz corre al 57–61% del ancho**, fuera de la columna de texto,
  que termina en el 54%. Cruzarla ensuciaba la lectura.
- **Las líneas de órbita son anillos de 1px cada 58px.** El snippet de origen
  usaba anillos cada 2px, que producen muaré.
- **Nada de `filter: blur()`** a viewport completo: obliga a componer una capa
  del tamaño de la pantalla en cada scroll. El "humo" lo da una capa de grano
  (`feTurbulence`) al 3% / 5,5%, que además rompe el banding.
- En claro **no hay viñeta profunda**: sobre un fondo casi blanco se lee como
  suciedad de pantalla, no como profundidad.

**Tipografía.** Geist Sans para todo el texto y Geist Mono para etiquetas,
fechas y nombres de tecnología. Se cargan como variables CSS en `<html>` y
Tailwind las expone en `font-sans` / `font-mono`.

**Movimiento.** Sólo dos cosas se animan: la aparición de cada sección al
entrar en viewport (opacidad + 12px, 600 ms) y los cambios de color en hover
(150 ms). Nada de escalas, brillos ni animación decorativa en bucle. Todo
queda desactivado bajo `prefers-reduced-motion`.

---

## Características

- **Bilingüe ES/EN** vía Context API, con persistencia en `localStorage` y
  actualización del atributo `lang` del documento.
- **Tema claro/oscuro** con `next-themes`, respetando la preferencia del
  sistema por defecto.
- **Repositorios de GitHub en vivo**, cacheados 1 hora, ordenados priorizando
  los que tienen descripción.
- **Formulario de contacto** funcional con Nodemailer.
- **CV descargable** en español e inglés.
- **Metadatos completos**: Open Graph, Twitter card, JSON-LD `Person`, y
  favicon y OG image generados con `next/og`.

---

## Instalación

Requiere Node.js 18+.

```bash
git clone https://github.com/LuisRocca/Porfolio-2025.git
cd Porfolio-2025
npm install
cp .env.example .env.local   # y rellenar los valores
npm run dev
```

### Variables de entorno

| Variable | Uso | Obligatoria |
|---|---|---|
| `EMAIL_USER` | Cuenta Gmail que envía el formulario | Sí, para `/api/contact` |
| `EMAIL_PASS` | Contraseña de aplicación de esa cuenta | Sí, para `/api/contact` |
| `GITHUB_USERNAME` | Usuario cuyos repos se listan (por defecto `LuisRocca`) | No |
| `GITHUB_TOKEN` | Sube el límite de la API de GitHub a 5.000 req/hora | No |

---

## Estructura

```
├── app/
│   ├── api/
│   │   ├── contact/route.ts       # Envío del formulario (Nodemailer)
│   │   └── repositories/route.ts  # Repos de GitHub, cacheados 1 h
│   ├── globals.css                # Tokens de color, tipografía y motion
│   ├── icon.tsx                   # Favicon generado
│   ├── opengraph-image.tsx        # Imagen de compartir generada
│   ├── layout.tsx                 # Metadatos, fuentes, ThemeProvider
│   └── page.tsx
├── components/
│   ├── ui/                        # shadcn/ui (Radix)
│   ├── hero.tsx  about.tsx  experience.tsx  impact.tsx
│   ├── skills.tsx  projects.tsx  repositories.tsx
│   ├── contact.tsx  footer.tsx  navbar.tsx
│   ├── theme-provider.tsx  theme-toggle.tsx
├── contexts/language-context.tsx  # Traducciones ES/EN
├── hooks/use-reveal.ts            # Aparición al hacer scroll
├── lib/profile.ts                 # Datos de perfil no traducibles
└── public/                        # CVs, foto, capturas
```

Los datos que no se traducen (URLs, empresas, nombres de tecnología, cifras)
viven en `lib/profile.ts`; el copy traducible, en `contexts/language-context.tsx`.

---

## Scripts

```bash
npm run dev     # Desarrollo
npm run build   # Build de producción
npm run start   # Servidor de producción
npm run lint    # ESLint (flat config)
```

Antes de dar un cambio por terminado: `npx tsc --noEmit`, `npm run lint` y
`npm run build` deben pasar en verde.

---

## Problemas conocidos

Los bugs diagnosticados en este repo, con su causa y su prevención, están en
[`KNOWN_ISSUES.md`](KNOWN_ISSUES.md). **Consultarlo antes de depurar.**

---

## Licencia

MIT — ver [`LICENSE`](LICENSE).

## Autor

**Luis Miguel Alfonzo Roca**

- [Portfolio](https://porfolio-2025-chi.vercel.app/)
- [LinkedIn](https://www.linkedin.com/in/luis-miguel-alfonzo-roca-software-enginer/)
- [GitHub](https://github.com/LuisRocca)
- [luis.rocca96@gmail.com](mailto:luis.rocca96@gmail.com)
