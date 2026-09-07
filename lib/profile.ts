/**
 * Datos de perfil que no se traducen (URLs, nombres de empresa y de
 * tecnología, cifras). Fuente única: antes el CV y los enlaces sociales
 * estaban duplicados en navbar, hero, contacto y footer.
 */

export const CV_PATH = {
  es: "/CvLuisMiguelAlfonzoRocaDevES.pdf",
  en: "/CvLuisMiguelAlfonzoRocaDevIN.pdf",
} as const

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/luis-miguel-alfonzo-roca-software-enginer/",
  github: "https://github.com/LuisRocca",
  email: "luis.rocca96@gmail.com",
  phone: "+57 319 711 0718",
  phoneHref: "tel:+573197110718",
} as const

/**
 * Proyectos del carrusel, en este orden: primero los sitios propios con
 * dominio propio, después los dos tenants de la plataforma de TelOnline.
 *
 * Para añadir uno: una entrada aquí y sus claves
 * `projects.<id>.title` / `.description` / `.alt` en las traducciones.
 */
export type Project = {
  id: string
  image: string
  tech: string[]
  /** Dominio visible en la tarjeta; identifica el proyecto mejor que la URL. */
  host: string
  demoUrl: string
  /** Se omite cuando el repositorio no es público. */
  codeUrl?: string
}

export const PROJECTS: Project[] = [
  {
    id: "qodeos",
    image: "/qodeos-landing.jpg",
    host: "qodeos.net",
    tech: ["Astro 7", "Cloudflare Workers", "Resend", "TypeScript", "Cal.com"],
    demoUrl: "https://qodeos.net/",
  },
  {
    id: "mudanzas",
    image: "/mudanzas-navarro.jpg",
    host: "mudanzasnavarro507.com",
    tech: ["Astro 7", "TypeScript", "i18n tipado", "sharp", "SEO técnico"],
    demoUrl: "https://www.mudanzasnavarro507.com/",
  },
  {
    id: "ctown",
    image: "/shopperdirect-ctown.jpg",
    host: "ctown.shopperdirect.us",
    tech: ["Next.js 15", "React 19", "MedusaJS v2", "PostgreSQL RLS", "Algolia", "GCP Cloud Run"],
    demoUrl: "https://ctown.shopperdirect.us/us",
  },
  {
    id: "foodfair",
    image: "/shopperdirect-foodfair.jpg",
    host: "food-fair.shopperdirect.us",
    tech: ["Multi-tenant", "store_id en JWT", "MedusaJS v2", "TypeScript", "Docker"],
    demoUrl: "https://food-fair.shopperdirect.us/us",
  },
]

/**
 * Repositorios que se muestran, en este orden.
 *
 * Es una lista curada a mano, no el resultado de ordenar lo que devuelve la
 * API. Ordenar por "tiene descripción" enterraba justo los tres mejores
 * —Angular 21 con Vitest y Next.js 15 con React 19— porque su campo
 * `description` está vacío en GitHub, mientras subían proyectos de prácticas
 * de 2021 cuya descripción decía "un trabajo de universidad".
 *
 * La descripción visible sale de las traducciones (`repositories.<nombre>.desc`),
 * no de GitHub, porque varias están vacías o se describen a la baja.
 *
 * OJO: si un repositorio se renombra en GitHub hay que cambiarlo aquí y en su
 * clave de traducción; si no, deja de aparecer sin ningún error visible.
 */
export const FEATURED_REPOS = [
  "technical-test-luismiguelalfonzo",
  "Motai_app",
  "amari-technical-test",
  "DynamoDB_NestJS_FP",
  "backend-api-jwt-flutter",
  "Porfolio-2025",
] as const

/**
 * Prácticas de desarrollo asistido por IA.
 *
 * Las cifras salen del vault de conocimiento propio y de los repos, y por eso
 * están aquí: "uso IA" no distingue a nadie, un recuento verificable sí.
 *
 * Deliberadamente NO se afirma haber escrito servidores MCP: hay conexión y
 * gestión por proyecto, no un servidor propio en el código.
 *
 * Medido el 2026-09-07 excluyendo plantillas. Son cifras de un sistema vivo:
 * conviene rehacer el recuento cada pocos meses.
 */
export const AI_PRACTICES = [
  { id: "context", stat: "3" },
  { id: "knowledge", stat: "60+" },
  { id: "decisions", stat: "34" },
  { id: "system", stat: "16" },
] as const

/**
 * Stack agrupado por dominio. Sustituye a las barras de porcentaje:
 * agrupar comunica alcance, un porcentaje solo invita a leer el número
 * más bajo como una carencia declarada.
 */
export const STACK_GROUPS = [
  {
    id: "backend",
    items: ["Node.js", "NestJS", "Express", "TypeScript", "MedusaJS v2", "Prisma", "TypeORM", ".NET Core"],
  },
  {
    id: "frontend",
    items: ["React 19", "Next.js 15", "Angular 19", "TypeScript", "TailwindCSS", "shadcn/ui", "RxJS", "Redux"],
  },
  {
    id: "data",
    items: ["PostgreSQL", "Row Level Security", "MySQL", "SQL Server", "MongoDB", "Firestore", "Neon"],
  },
  {
    id: "platform",
    items: ["Docker", "GCP Cloud Run", "AWS", "Vercel", "GitHub Actions", "Jenkins", "Cloudflare Workers"],
  },
  {
    id: "practices",
    items: ["Clean Architecture", "Multi-tenant SaaS", "DDD", "ADR", "Scrum", "Code review", "Vitest", "Jasmine + Karma"],
  },
] as const

/**
 * Métricas verificables tomadas del CV y de LinkedIn. Sustituyen a la
 * sección de testimonios, que contenía nombres y empresas inventados.
 */
export const METRICS = [
  { id: "debt", value: "60%" },
  { id: "render", value: "25–45%" },
  { id: "backend", value: "35%" },
  { id: "years", value: "5+" },
  { id: "companies", value: "9" },
  { id: "mentees", value: "6–8" },
] as const
