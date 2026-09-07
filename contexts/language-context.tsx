"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const es = {
  // Navbar
  "nav.about": "Sobre mí",
  "nav.experience": "Experiencia",
  "nav.skills": "Stack",
  "nav.ai": "Método",
  "nav.projects": "Proyectos",
  "nav.contact": "Contacto",
  "nav.downloadCV": "Descargar CV",
  "nav.primary": "Navegación principal",
  "nav.switchLanguage": "Cambiar a inglés",
  "nav.switchTheme": "Cambiar tema",
  "nav.menu": "Abrir menú",

  // Hero
  "hero.available": "Disponible para proyectos",
  "hero.role": "Senior Full Stack Engineer & Tech Lead",
  "hero.description":
    "Más de 5 años construyendo productos digitales end-to-end. Hoy: arquitectura SaaS multi-tenant en TelOnline y liderazgo del equipo frontend en SMS Sudamérica.",
  "hero.downloadCV": "Descargar CV",

  // Sobre mí
  "about.eyebrow": "01 — Perfil",
  "about.title": "Sobre mí",
  "about.photoAlt": "Retrato de Luis Miguel Alfonzo Roca",
  "about.basedIn": "Ubicación",
  "about.languages": "Idiomas",
  "about.languagesValue": "Español nativo · Inglés B1",
  "about.workingWith": "Modalidad",
  "about.workingWithValue": "Remoto · LATAM y EE.UU.",
  "about.p1":
    "Desarrollador fullstack senior y líder técnico con más de 5 años construyendo productos digitales para compañías de Colombia, LATAM y Estados Unidos, con dominio de los dos lados del stack: servicios Node.js / NestJS y frontends React / Next.js y Angular.",
  "about.p2":
    "Hoy soy Arquitecto de Software en TelOnline, proveedor de telefonía VoIP y call centers en Florida, donde diseño la arquitectura modular de una plataforma SaaS multi-tenant y sus APIs REST. En paralelo lidero el equipo frontend de una plataforma gubernamental para el Ministerio de Educación de Santa Fe.",
  "about.p3":
    "Trabajo como referente técnico y ejecutor directo: defino la arquitectura, escribo el código crítico, monto los pipelines CI/CD y respondo por el despliegue en producción. Llevo dos años con desarrollo asistido por IA incorporado al flujo de entrega del equipo.",
  "about.education": "Formación",
  "about.degree1": "Ingeniería en Desarrollo de Software (en curso)",
  "about.university1": "Utel Universidad · Remoto",
  "about.degree2": "Estudios en Ingeniería Informática",
  "about.university2": "UNINI México, vía FUNIBER",
  "about.degree3": "Desarrollador Web Full Stack",
  "about.university3": "Henry Bootcamp · Remoto",

  // Experiencia
  "experience.eyebrow": "02 — Trayectoria",
  "experience.title": "Experiencia",
  "experience.subtitle":
    "Nueve equipos, de startups a plataformas gubernamentales, siempre como referente técnico y ejecutor directo.",
  "experience.current": "Actual",

  "experience.telonline.role": "Arquitecto de Software y Desarrollador Fullstack",
  "experience.telonline.period": "Mar 2026 — Actualidad",
  "experience.telonline.location": "Miami, FL, EE.UU. (Remoto)",
  "experience.telonline.desc":
    "Referente técnico y ejecutor directo del análisis, la arquitectura y la implementación de la plataforma SaaS de comercio unificado de la compañía.",
  "experience.telonline.b1":
    "Diseñé una arquitectura multi-tenant modular y sin estado: store_id inyectado en el token JWT combinado con Row Level Security de PostgreSQL, sin filtración de datos entre clientes.",
  "experience.telonline.b2":
    "Lideré la migración a MedusaJS v2, personalizando motores de cálculo de impuestos, proveedores de fulfillment y flujos de pago B2B/B2C (NMI, Google Pay, Stripe).",
  "experience.telonline.b3":
    "Despliego y monitoreo en producción sobre Docker y GCP Cloud Run, y redacté las guías de migración de API con las que trabaja el equipo.",

  "experience.sms.role": "Desarrollador Frontend Senior y Líder de Equipo",
  "experience.sms.period": "Oct 2025 — Actualidad",
  "experience.sms.location": "Miami, FL, EE.UU. (Remoto)",
  "experience.sms.desc":
    "Lidero el equipo frontend que construye plataformas empresariales de gran escala para el Ministerio de Educación de Santa Fe, Argentina.",
  "experience.sms.b1":
    "Reduje la deuda técnica un 60% refactorizando módulos críticos y mejoré los tiempos de carga y renderizado entre un 25% y 45%.",
  "experience.sms.b2":
    "Definí la arquitectura modular sobre la que construyen equipos distribuidos, con pruebas automatizadas (Jasmine + Karma) y ESLint en el flujo de entrega.",
  "experience.sms.b3":
    "Soy el referente técnico del equipo: mentorizo desarrolladores mid y junior y coordino releases con backend, QA y producto.",

  "experience.qode.role": "Cofundador y Arquitecto de Software Principal",
  "experience.qode.period": "Nov 2024 — Actualidad",
  "experience.qode.location": "Bogotá, Colombia",
  "experience.qode.desc":
    "Cofundé un estudio de software que entrega productos end-to-end y coordina equipos de frontend y backend.",
  "experience.qode.b1":
    "Entregas con Node.js, NestJS, React, Angular, PostgreSQL y Docker, con reducción de tiempos de carga en producción de hasta un 40%.",
  "experience.qode.b2":
    "Responsable del ciclo completo: análisis, arquitectura, desarrollo, QA y despliegue.",

  "experience.henry.role": "Mentor Educativo, Desarrollo Web Full Stack",
  "experience.henry.period": "Feb 2023 — Actualidad",
  "experience.henry.location": "Buenos Aires, Argentina (Remoto)",
  "experience.henry.desc":
    "Mentorizo cohortes de 6 a 8 desarrolladores en Node.js, React y Angular, arquitectura limpia y toma de decisiones técnicas, sobre productos reales.",

  "experience.forwarty.role": "Desarrollador Fullstack",
  "experience.forwarty.period": "Jun 2025 — Ago 2025",
  "experience.forwarty.location": "Colombia (Remoto)",
  "experience.forwarty.desc":
    "Mejoré los tiempos de respuesta del backend un 35% optimizando consultas y refactorizando módulos sobre servicios Node.js y .NET Core, y reduje deuda técnica aplicando buenas prácticas de arquitectura.",

  "experience.karggu.role": "Desarrollador Fullstack",
  "experience.karggu.period": "Abr 2024 — Jun 2025",
  "experience.karggu.location": "México (Remoto)",
  "experience.karggu.desc":
    "Integré funcionalidades y resolví bugs críticos sobre Node.js, TypeScript y Angular; mejoré los tiempos de carga un 40%. Construí desde cero los entornos de desarrollo y producción con Docker Compose, desplegados en AWS y GCP.",

  "experience.asofty.role": "Desarrollador Frontend",
  "experience.asofty.period": "Oct 2023 — May 2024",
  "experience.asofty.location": "Colombia (Híbrido)",
  "experience.asofty.desc":
    "Construí interfaces de alto rendimiento y apoyé el desarrollo backend con .NET Core y MySQL; reduje tiempos de carga un 30% y mejoré la mantenibilidad un 40%.",

  "experience.seo.role": "Desarrollador Web",
  "experience.seo.period": "Abr 2023 — Oct 2023",
  "experience.seo.location": "Colombia",
  "experience.seo.desc":
    "Optimización técnica de sistemas web: SEO on-page, Schema.org y auditorías completas que mejoraron el rendimiento entre un 20% y 35% y la salud técnica de los sitios más de un 50%.",

  "experience.sunpower.role": "Desarrollador Fullstack",
  "experience.sunpower.period": "Feb 2022 — Feb 2023",
  "experience.sunpower.location": "Bogotá, Colombia",
  "experience.sunpower.desc":
    "Construí plataformas operativas internas con integración de APIs, reduciendo tiempos de carga y procesamiento un 25%. Me desempeñé como Scrum Master: coordiné al equipo y conduje las demos con el cliente.",

  // Impacto
  "impact.eyebrow": "03 — Impacto",
  "impact.title": "Resultados medibles",
  "impact.subtitle":
    "Cifras de los equipos en los que trabajé, las mismas que declaro en mi CV y verificables en cada rol.",
  "impact.debt.label": "Deuda técnica reducida",
  "impact.debt.context": "Refactor de módulos críticos en SMS Sudamérica",
  "impact.render.label": "Mejora en carga y renderizado",
  "impact.render.context": "Optimización de componentes en plataforma gubernamental",
  "impact.backend.label": "Tiempos de respuesta backend",
  "impact.backend.context": "Optimización de consultas y módulos en Forwarty",
  "impact.years.label": "Años en producción",
  "impact.years.context": "Colombia, LATAM y Estados Unidos",
  "impact.companies.label": "Empresas y equipos",
  "impact.companies.context": "De startups a plataformas gubernamentales",
  "impact.mentees.label": "Desarrolladores por cohorte",
  "impact.mentees.context": "Mentoría continua en Henry desde 2023",

  // Stack
  "stack.eyebrow": "04 — Stack",
  "stack.title": "Tecnologías con las que trabajo",
  "stack.subtitle": "Lo que uso en producción hoy, agrupado por dominio.",
  "stack.backend": "Backend",
  "stack.frontend": "Frontend",
  "stack.data": "Datos",
  "stack.platform": "Plataforma",
  "stack.practices": "Prácticas",

  // IA en el flujo de trabajo
  "ai.eyebrow": "05 — Método",
  "ai.title": "IA dentro del flujo de entrega",
  "ai.lead":
    "Llevo dos años programando con asistencia de IA a diario, y el punto no es usarla: es que esté incorporada al flujo del equipo con reglas versionadas, no en el portátil de una persona. Estas son las tres piezas que lo sostienen.",
  "ai.tools": "Herramientas",

  "ai.context.unit": "ficheros por repo",
  "ai.context.title": "Contexto versionado junto al código",
  "ai.context.desc":
    "Cada repositorio lleva su CLAUDE.md con las convenciones, su AGENTS.md con el mapa del proyecto y su KNOWN_ISSUES.md con los fallos ya resueltos. El agente lee esas reglas antes de tocar nada, así que la calidad no depende de cómo se le pida cada vez. Está en producción en los repos de TelOnline y SMS Sudamérica.",

  "ai.knowledge.unit": "errores documentados",
  "ai.knowledge.title": "Una base de conocimiento que se consulta antes de depurar",
  "ai.knowledge.desc":
    "Todo bug no trivial se documenta con problema, causa y prevención en un vault compartido entre proyectos. Antes de depurar se busca ahí primero. El objetivo es que un fallo cueste caro una sola vez: si la lección sirve fuera del repo donde apareció, se guarda fuera del repo.",

  "ai.decisions.unit": "ADR escritos",
  "ai.decisions.title": "Decisiones de arquitectura que no se relitigan",
  "ai.decisions.desc":
    "Cada decisión de peso queda como un ADR con su contexto, sus alternativas descartadas y sus consecuencias. Una decisión aceptada no se vuelve a discutir: se supersede con otro ADR. Eso le da a cualquiera —persona o agente— el porqué de lo que se hizo, meses después.",

  "ai.system.unit": "tipos de nota con esquema",
  "ai.system.title": "Un vault que los agentes saben leer y escribir",
  "ai.system.desc":
    "Todo eso vive en un vault de Obsidian con esquema propio: cada nota declara su tipo —proyecto, ADR, error, snippet— y cinco vistas lo consultan como una base de datos. Siete plantillas fijan la forma, ocho lienzos dibujan la arquitectura de cada proyecto, y el vault lleva su propio fichero de instrucciones que le dice al agente dónde va cada cosa y cuándo escribirla. Versionado con git, igual que el código.",

  // Proyectos
  "projects.eyebrow": "06 — Trabajo",
  "projects.title": "Proyectos destacados",
  "projects.subtitle":
    "Sitios en producción: dos propios y dos tenants de la plataforma de comercio unificado cuya arquitectura diseño.",
  "projects.visit": "Visitar sitio",
  "projects.viewCode": "Ver código",
  "projects.previous": "Proyectos anteriores",
  "projects.next": "Proyectos siguientes",
  "projects.pause": "Pausar el carrusel",
  "projects.play": "Reanudar el carrusel",
  "projects.goToPage": "Ir a la página",

  "projects.qodeos.title": "Qode-OS — Landing corporativa",
  "projects.qodeos.description":
    "Sitio de captación del estudio de software que cofundé: cualifica leads antes de la llamada con un formulario multi-paso propio. Estáticos y endpoint en el mismo despliegue de Cloudflare Workers, con Resend para el correo. Cero JavaScript de framework en el cliente: el parallax y el movimiento son código propio sobre requestAnimationFrame.",
  "projects.qodeos.alt": "Portada del sitio de Qode-OS",

  "projects.mudanzas.title": "Mudanzas Navarro 507",
  "projects.mudanzas.description":
    "Landing de captación por WhatsApp para una empresa de mudanzas en Panamá. Bilingüe con URLs separadas y hreflang para que Google posicione cada idioma por su cuenta, y traducciones tipadas: si falta una clave en inglés, el build falla en vez de publicar la web a medias.",
  "projects.mudanzas.alt": "Portada del sitio de Mudanzas Navarro 507",

  "projects.ctown.title": "C-Town — Storefront de comercio unificado",
  "projects.ctown.description":
    "Tienda online de supermercado para TelOnline, sobre la plataforma SaaS cuya arquitectura diseño: storefront en Next.js 15 y React 19 contra un backend MedusaJS v2, con búsqueda en Algolia y pagos B2B/B2C. Desplegado en Docker sobre GCP Cloud Run.",
  "projects.ctown.alt": "Portada de la tienda C-Town",

  "projects.foodfair.title": "Food Fair — El mismo motor, otro tenant",
  "projects.foodfair.description":
    "La misma plataforma sirviendo a otra cadena, con su marca y su catálogo. Es la arquitectura multi-tenant en funcionamiento: el store_id viaja en el token JWT y Row Level Security de PostgreSQL garantiza que ninguna tienda vea los datos de otra. Comparar las dos portadas es ver la misma base de código bajo dos identidades.",
  "projects.foodfair.alt": "Portada de la tienda Food Fair",

  // Repositorios
  "repositories.eyebrow": "07 — Código",
  "repositories.title": "Código público",
  "repositories.subtitle":
    "El trabajo de las empresas donde he estado es privado. Aquí van proyectos personales y pruebas técnicas, con su código completo y sus pruebas automatizadas.",
  "repositories.viewAll": "Ver todos en GitHub",
  "repositories.error": "No se pudieron cargar los repositorios en este momento.",
  "repositories.noDescription": "Sin descripción.",

  // Descripciones propias: varias están vacías o se describen a la baja en GitHub
  "repositories.technical-test-luismiguelalfonzo.desc":
    "Plataforma de inversión en fondos con Angular 21 y RxJS: suscripción y cancelación de fondos, historial de transacciones y notificaciones. Cubierta con Vitest.",
  "repositories.Motai_app.desc":
    "Panel de administración de productos en Next.js 15 (App Router) y React 19: autenticación, CRUD, paginación y tema claro/oscuro. Tailwind 4 y Jest.",
  "repositories.amari-technical-test.desc":
    "Gestión de usuarios en Angular 21 con filtrado, búsqueda y vista de detalle. Arquitectura por componentes standalone y pruebas con Vitest.",
  "repositories.DynamoDB_NestJS_FP.desc":
    "Servicio NestJS conectado a DynamoDB de AWS, con una estructura deliberadamente mínima para que la integración se lea de un vistazo.",
  "repositories.backend-api-jwt-flutter.desc":
    "API REST en TypeScript con autenticación JWT, construida como backend del cliente Flutter que la consume.",
  "repositories.Porfolio-2025.desc":
    "Este mismo sitio: Next.js 15, React 19 y TypeScript, bilingüe, con tema claro/oscuro y sistema de diseño en variables CSS.",

  // Contacto
  "contact.eyebrow": "08 — Contacto",
  "contact.title": "Hablemos",
  "contact.subtitle":
    "¿Tienes un proyecto o una vacante en mente? Cuéntame los detalles y te respondo el mismo día.",
  "contact.name": "Nombre completo",
  "contact.phone": "Teléfono",
  "contact.location": "Ubicación",
  "contact.viewProfile": "Ver perfil completo",
  "contact.company": "Empresa u organización",
  "contact.projectType": "Tipo de proyecto",
  "contact.budget": "Presupuesto estimado",
  "contact.timeline": "Plazo",
  "contact.message": "Descripción",
  "contact.newsletter": "Quiero recibir novedades sobre nuevos proyectos y tecnologías",
  "contact.send": "Enviar mensaje",
  "contact.sending": "Enviando…",
  "contact.success": "Mensaje enviado. Te respondo pronto.",
  "contact.error": "No se pudo enviar. Inténtalo de nuevo o escríbeme por email.",
  "contact.availability": "Disponibilidad",
  "contact.schedule": "Lun – Vie · 8:00 – 18:00 (GMT-5)",
  "contact.response": "Respuesta típica: 2–4 horas",
  "contact.namePlaceholder": "Tu nombre",
  "contact.emailPlaceholder": "tu@email.com",
  "contact.phonePlaceholder": "+57 300 123 4567",
  "contact.companyPlaceholder": "Nombre de tu empresa",
  "contact.messagePlaceholder":
    "Cuéntame el objetivo, el alcance y qué necesitas resolver.",
  "contact.projectTypePlaceholder": "Selecciona el tipo",
  "contact.budgetPlaceholder": "Rango de presupuesto",
  "contact.timelinePlaceholder": "¿Cuándo lo necesitas?",

  "contact.projectType.web-app": "Aplicación web",
  "contact.projectType.mobile-app": "Aplicación móvil",
  "contact.projectType.ecommerce": "E-commerce",
  "contact.projectType.dashboard": "Dashboard / Analytics",
  "contact.projectType.api": "API / Backend",
  "contact.projectType.maintenance": "Mantenimiento",
  "contact.projectType.consulting": "Consultoría / Arquitectura",
  "contact.projectType.other": "Otro",

  "contact.budget.under-5k": "Menos de $5.000 USD",
  "contact.budget.5k-15k": "$5.000 – $15.000 USD",
  "contact.budget.15k-30k": "$15.000 – $30.000 USD",
  "contact.budget.30k-50k": "$30.000 – $50.000 USD",
  "contact.budget.over-50k": "Más de $50.000 USD",
  "contact.budget.discuss": "Prefiero conversarlo",

  "contact.timeline.asap": "Lo antes posible",
  "contact.timeline.1-month": "En 1 mes",
  "contact.timeline.2-3-months": "En 2 – 3 meses",
  "contact.timeline.3-6-months": "En 3 – 6 meses",
  "contact.timeline.flexible": "Flexible",

  // Footer
  "footer.rights": "Todos los derechos reservados.",
  "footer.social": "Enlaces",
}

const en: Record<keyof typeof es, string> = {
  // Navbar
  "nav.about": "About",
  "nav.experience": "Experience",
  "nav.skills": "Stack",
  "nav.ai": "Method",
  "nav.projects": "Work",
  "nav.contact": "Contact",
  "nav.downloadCV": "Download CV",
  "nav.primary": "Main navigation",
  "nav.switchLanguage": "Switch to Spanish",
  "nav.switchTheme": "Toggle theme",
  "nav.menu": "Open menu",

  // Hero
  "hero.available": "Available for projects",
  "hero.role": "Senior Full Stack Engineer & Tech Lead",
  "hero.description":
    "5+ years building digital products end to end. Today: multi-tenant SaaS architecture at TelOnline and frontend team leadership at SMS Sudamérica.",
  "hero.downloadCV": "Download CV",

  // About
  "about.eyebrow": "01 — Profile",
  "about.title": "About me",
  "about.photoAlt": "Portrait of Luis Miguel Alfonzo Roca",
  "about.basedIn": "Based in",
  "about.languages": "Languages",
  "about.languagesValue": "Spanish native · English B1",
  "about.workingWith": "Setup",
  "about.workingWithValue": "Remote · LATAM and US",
  "about.p1":
    "Senior fullstack developer and technical lead with over 5 years building digital products for companies across Colombia, LATAM and the United States, working confidently on both sides of the stack: Node.js / NestJS services and React / Next.js and Angular frontends.",
  "about.p2":
    "I'm currently Software Architect at TelOnline, a VoIP telephony and call center provider in Florida, where I design the modular architecture of a multi-tenant SaaS platform and its REST APIs. In parallel I lead the frontend team of a government platform for the Ministry of Education of Santa Fe, Argentina.",
  "about.p3":
    "I work as both the technical reference and the hands-on builder: I define the architecture, write the critical code, set up the CI/CD pipelines and own the production deploy. Two years of daily AI-assisted development, already part of the team's delivery flow.",
  "about.education": "Education",
  "about.degree1": "Software Development Engineering (in progress)",
  "about.university1": "Utel Universidad · Remote",
  "about.degree2": "Computer Engineering studies",
  "about.university2": "UNINI México, via FUNIBER",
  "about.degree3": "Full Stack Web Developer",
  "about.university3": "Henry Bootcamp · Remote",

  // Experience
  "experience.eyebrow": "02 — Track record",
  "experience.title": "Experience",
  "experience.subtitle":
    "Nine teams, from startups to government platforms, always as the technical reference and the hands-on builder.",
  "experience.current": "Current",

  "experience.telonline.role": "Software Architect & Fullstack Developer",
  "experience.telonline.period": "Mar 2026 — Present",
  "experience.telonline.location": "Miami, FL, USA (Remote)",
  "experience.telonline.desc":
    "Technical reference and hands-on builder for the analysis, architecture and implementation of the company's unified commerce SaaS platform.",
  "experience.telonline.b1":
    "Designed a modular, stateless multi-tenant architecture: store_id injected into the JWT combined with PostgreSQL Row Level Security, with no data leaking between tenants.",
  "experience.telonline.b2":
    "Led the migration to MedusaJS v2, customizing tax calculation engines, fulfillment providers and B2B/B2C payment flows (NMI, Google Pay, Stripe).",
  "experience.telonline.b3":
    "Deploy and monitor in production on Docker and GCP Cloud Run, and wrote the API migration guides the team works from.",

  "experience.sms.role": "Senior Frontend Developer & Team Lead",
  "experience.sms.period": "Oct 2025 — Present",
  "experience.sms.location": "Miami, FL, USA (Remote)",
  "experience.sms.desc":
    "I lead the frontend team building large-scale enterprise platforms for the Ministry of Education of Santa Fe, Argentina.",
  "experience.sms.b1":
    "Cut technical debt by 60% refactoring critical modules, and improved load and render times between 25% and 45%.",
  "experience.sms.b2":
    "Defined the modular architecture distributed teams build on, with automated tests (Jasmine + Karma) and ESLint in the delivery flow.",
  "experience.sms.b3":
    "I'm the team's technical reference: I mentor mid and junior developers and coordinate releases with backend, QA and product.",

  "experience.qode.role": "Co-founder & Principal Software Architect",
  "experience.qode.period": "Nov 2024 — Present",
  "experience.qode.location": "Bogotá, Colombia",
  "experience.qode.desc":
    "Co-founded a software studio that ships end-to-end products and coordinates frontend and backend teams.",
  "experience.qode.b1":
    "Deliveries with Node.js, NestJS, React, Angular, PostgreSQL and Docker, cutting production load times by up to 40%.",
  "experience.qode.b2":
    "Own the full cycle: analysis, architecture, development, QA and deployment.",

  "experience.henry.role": "Education Mentor, Full Stack Web Development",
  "experience.henry.period": "Feb 2023 — Present",
  "experience.henry.location": "Buenos Aires, Argentina (Remote)",
  "experience.henry.desc":
    "I mentor cohorts of 6 to 8 developers in Node.js, React and Angular, clean architecture and technical decision-making, on real products.",

  "experience.forwarty.role": "Fullstack Developer",
  "experience.forwarty.period": "Jun 2025 — Aug 2025",
  "experience.forwarty.location": "Colombia (Remote)",
  "experience.forwarty.desc":
    "Improved backend response times by 35% optimizing queries and refactoring modules across Node.js and .NET Core services, and reduced technical debt applying sound architecture practices.",

  "experience.karggu.role": "Fullstack Developer",
  "experience.karggu.period": "Apr 2024 — Jun 2025",
  "experience.karggu.location": "Mexico (Remote)",
  "experience.karggu.desc":
    "Shipped features and fixed critical bugs across Node.js, TypeScript and Angular; improved load times by 40%. Built the development and production environments from scratch with Docker Compose, deployed on AWS and GCP.",

  "experience.asofty.role": "Frontend Developer",
  "experience.asofty.period": "Oct 2023 — May 2024",
  "experience.asofty.location": "Colombia (Hybrid)",
  "experience.asofty.desc":
    "Built high-performance interfaces and supported backend development with .NET Core and MySQL; cut load times by 30% and improved maintainability by 40%.",

  "experience.seo.role": "Web Developer",
  "experience.seo.period": "Apr 2023 — Oct 2023",
  "experience.seo.location": "Colombia",
  "experience.seo.desc":
    "Technical optimization of web systems: on-page SEO, Schema.org and full audits that improved performance between 20% and 35% and site technical health by over 50%.",

  "experience.sunpower.role": "Fullstack Developer",
  "experience.sunpower.period": "Feb 2022 — Feb 2023",
  "experience.sunpower.location": "Bogotá, Colombia",
  "experience.sunpower.desc":
    "Built internal operations platforms with API integrations, cutting load and processing times by 25%. Served as Scrum Master: coordinated the team and ran client demos.",

  // Impact
  "impact.eyebrow": "03 — Impact",
  "impact.title": "Measurable results",
  "impact.subtitle":
    "Numbers from the teams I worked with — the same ones stated in my CV and verifiable in each role.",
  "impact.debt.label": "Technical debt reduced",
  "impact.debt.context": "Refactor of critical modules at SMS Sudamérica",
  "impact.render.label": "Load and render improvement",
  "impact.render.context": "Component optimization on a government platform",
  "impact.backend.label": "Backend response times",
  "impact.backend.context": "Query and module optimization at Forwarty",
  "impact.years.label": "Years in production",
  "impact.years.context": "Colombia, LATAM and the United States",
  "impact.companies.label": "Companies and teams",
  "impact.companies.context": "From startups to government platforms",
  "impact.mentees.label": "Developers per cohort",
  "impact.mentees.context": "Ongoing mentorship at Henry since 2023",

  // Stack
  "stack.eyebrow": "04 — Stack",
  "stack.title": "Technologies I work with",
  "stack.subtitle": "What I use in production today, grouped by domain.",
  "stack.backend": "Backend",
  "stack.frontend": "Frontend",
  "stack.data": "Data",
  "stack.platform": "Platform",
  "stack.practices": "Practices",

  // AI in the delivery flow
  "ai.eyebrow": "05 — Method",
  "ai.title": "AI inside the delivery flow",
  "ai.lead":
    "I've been coding with AI assistance daily for two years, and the point isn't using it: it's that it lives in the team's flow through version-controlled rules, not on one person's laptop. These are the three pieces that hold it up.",
  "ai.tools": "Tools",

  "ai.context.unit": "files per repo",
  "ai.context.title": "Context version-controlled next to the code",
  "ai.context.desc":
    "Every repository carries its CLAUDE.md with the conventions, its AGENTS.md with the project map and its KNOWN_ISSUES.md with the bugs already solved. The agent reads those rules before touching anything, so quality doesn't depend on how well each prompt was worded. It's in production across the TelOnline and SMS Sudamérica repos.",

  "ai.knowledge.unit": "documented bugs",
  "ai.knowledge.title": "A knowledge base you check before debugging",
  "ai.knowledge.desc":
    "Every non-trivial bug is written down as problem, cause and prevention in a vault shared across projects, and that's the first place to look before debugging. The goal is for a bug to be expensive exactly once: if the lesson travels beyond the repo where it appeared, it gets stored beyond that repo.",

  "ai.decisions.unit": "ADRs written",
  "ai.decisions.title": "Architecture decisions that aren't relitigated",
  "ai.decisions.desc":
    "Every decision of weight becomes an ADR with its context, the alternatives rejected and the consequences. An accepted decision isn't reopened: it's superseded by another ADR. That gives anyone — person or agent — the reasoning behind what was built, months later.",

  "ai.system.unit": "schema-typed note kinds",
  "ai.system.title": "A vault agents know how to read and write",
  "ai.system.desc":
    "All of it lives in an Obsidian vault with its own schema: every note declares its kind — project, ADR, bug, snippet — and five views query it like a database. Seven templates enforce the shape, eight canvases map each project's architecture, and the vault carries its own instruction file telling the agent where each thing goes and when to write it. Version-controlled with git, same as the code.",

  // Work
  "projects.eyebrow": "06 — Work",
  "projects.title": "Selected projects",
  "projects.subtitle":
    "Live production sites: two of my own, and two tenants of the unified commerce platform whose architecture I design.",
  "projects.visit": "Visit site",
  "projects.viewCode": "View code",
  "projects.previous": "Previous projects",
  "projects.next": "Next projects",
  "projects.pause": "Pause the carousel",
  "projects.play": "Resume the carousel",
  "projects.goToPage": "Go to page",

  "projects.qodeos.title": "Qode-OS — Company landing",
  "projects.qodeos.description":
    "Lead-capture site for the software studio I co-founded: it qualifies leads before the call through a custom multi-step form. Static pages and the form endpoint ship in the same Cloudflare Workers deploy, with Resend for email. Zero client-side framework JavaScript — the parallax and motion are hand-written on requestAnimationFrame.",
  "projects.qodeos.alt": "Qode-OS website home page",

  "projects.mudanzas.title": "Mudanzas Navarro 507",
  "projects.mudanzas.description":
    "WhatsApp lead-capture landing for a moving company in Panama. Bilingual with separate URLs and hreflang so Google ranks each language on its own, and typed translations: a missing English key fails the build instead of shipping a half-translated site.",
  "projects.mudanzas.alt": "Mudanzas Navarro 507 website home page",

  "projects.ctown.title": "C-Town — Unified commerce storefront",
  "projects.ctown.description":
    "Online grocery store for TelOnline, built on the SaaS platform whose architecture I design: a Next.js 15 and React 19 storefront against a MedusaJS v2 backend, with Algolia search and B2B/B2C payments. Deployed on Docker over GCP Cloud Run.",
  "projects.ctown.alt": "C-Town storefront home page",

  "projects.foodfair.title": "Food Fair — Same engine, different tenant",
  "projects.foodfair.description":
    "The same platform serving another chain, with its own brand and catalogue. This is the multi-tenant architecture at work: store_id travels inside the JWT and PostgreSQL Row Level Security guarantees no store ever sees another's data. Comparing both home pages is seeing one codebase under two identities.",
  "projects.foodfair.alt": "Food Fair storefront home page",

  // Repositories
  "repositories.eyebrow": "07 — Code",
  "repositories.title": "Public code",
  "repositories.subtitle":
    "Work from the companies I've been at is private. What's here are personal projects and technical tests, with their full source and automated tests.",
  "repositories.viewAll": "View all on GitHub",
  "repositories.error": "Repositories couldn't be loaded right now.",
  "repositories.noDescription": "No description.",

  "repositories.technical-test-luismiguelalfonzo.desc":
    "Investment fund platform built with Angular 21 and RxJS: fund subscription and cancellation, transaction history and notifications. Covered with Vitest.",
  "repositories.Motai_app.desc":
    "Product admin panel in Next.js 15 (App Router) and React 19: authentication, CRUD, pagination and light/dark theme. Tailwind 4 and Jest.",
  "repositories.amari-technical-test.desc":
    "User management in Angular 21 with filtering, search and detail view. Standalone component architecture and Vitest tests.",
  "repositories.DynamoDB_NestJS_FP.desc":
    "NestJS service wired to AWS DynamoDB, with a deliberately minimal structure so the integration reads at a glance.",
  "repositories.backend-api-jwt-flutter.desc":
    "REST API in TypeScript with JWT authentication, built as the backend for the Flutter client that consumes it.",
  "repositories.Porfolio-2025.desc":
    "This very site: Next.js 15, React 19 and TypeScript, bilingual, with light/dark theming and a design system in CSS variables.",

  // Contact
  "contact.eyebrow": "08 — Contact",
  "contact.title": "Let's talk",
  "contact.subtitle":
    "Have a project or a role in mind? Send me the details and I'll get back to you the same day.",
  "contact.name": "Full name",
  "contact.phone": "Phone",
  "contact.location": "Location",
  "contact.viewProfile": "View full profile",
  "contact.company": "Company or organization",
  "contact.projectType": "Project type",
  "contact.budget": "Estimated budget",
  "contact.timeline": "Timeline",
  "contact.message": "Description",
  "contact.newsletter": "I'd like updates about new projects and technologies",
  "contact.send": "Send message",
  "contact.sending": "Sending…",
  "contact.success": "Message sent. I'll get back to you soon.",
  "contact.error": "Couldn't send. Try again or reach me by email.",
  "contact.availability": "Availability",
  "contact.schedule": "Mon – Fri · 8:00 – 18:00 (GMT-5)",
  "contact.response": "Typical response: 2–4 hours",
  "contact.namePlaceholder": "Your name",
  "contact.emailPlaceholder": "you@email.com",
  "contact.phonePlaceholder": "+57 300 123 4567",
  "contact.companyPlaceholder": "Your company name",
  "contact.messagePlaceholder": "Tell me the goal, the scope and what you need solved.",
  "contact.projectTypePlaceholder": "Select a type",
  "contact.budgetPlaceholder": "Budget range",
  "contact.timelinePlaceholder": "When do you need it?",

  "contact.projectType.web-app": "Web application",
  "contact.projectType.mobile-app": "Mobile application",
  "contact.projectType.ecommerce": "E-commerce",
  "contact.projectType.dashboard": "Dashboard / Analytics",
  "contact.projectType.api": "API / Backend",
  "contact.projectType.maintenance": "Maintenance",
  "contact.projectType.consulting": "Consulting / Architecture",
  "contact.projectType.other": "Other",

  "contact.budget.under-5k": "Under $5,000 USD",
  "contact.budget.5k-15k": "$5,000 – $15,000 USD",
  "contact.budget.15k-30k": "$15,000 – $30,000 USD",
  "contact.budget.30k-50k": "$30,000 – $50,000 USD",
  "contact.budget.over-50k": "Over $50,000 USD",
  "contact.budget.discuss": "I'd rather discuss it",

  "contact.timeline.asap": "As soon as possible",
  "contact.timeline.1-month": "Within 1 month",
  "contact.timeline.2-3-months": "In 2 – 3 months",
  "contact.timeline.3-6-months": "In 3 – 6 months",
  "contact.timeline.flexible": "Flexible",

  // Footer
  "footer.rights": "All rights reserved.",
  "footer.social": "Links",
}

const translations = { es, en }

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const saved = localStorage.getItem("language")
    if (saved === "es" || saved === "en") setLanguage(saved)
  }, [])

  // El atributo lang del documento debe seguir al idioma elegido: los
  // lectores de pantalla eligen la voz a partir de él.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string =>
    translations[language][key as keyof typeof es] ?? key

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
