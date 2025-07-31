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

const translations = {
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.about": "Sobre Mí",
    "nav.experience": "Experiencia",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.downloadCV": "Descargar CV",

    // Hero
    "hero.available": "Disponible para proyectos",
    "hero.location": "Bogotá, Colombia",
    "hero.role": "Full Stack Developer",
    "hero.description1":
      "Desarrollador Web Full Stack con más de 5 años de experiencia, especializado en crear soluciones tecnológicas escalables y optimizadas",
    "hero.description2": "Experto en Angular, React, Node.js, .NET Core, SEO Técnico y WordPress",
    "hero.downloadCV": "Descargar CV",
    "hero.scrollExplore": "Scroll para explorar",

    // About
    "about.title": "Sobre Mí",
    "about.passion": "Mi Pasión",
    "about.passionDesc":
      "Desarrollador Web Full Stack con más de 5 años de experiencia, especializado en crear soluciones tecnológicas escalables, modulares y optimizadas bajo las mejores prácticas y metodologías ágiles como SCRUM y TDD.",
    "about.passionDesc2":
      "Actualmente combino mi pasión por el desarrollo con el emprendimiento, liderando una Software Factory, donde aplico mi experiencia en SEO técnico para potenciar el posicionamiento web.",
    "about.education": "Educación",
    "about.degree1": "Licenciatura en Ingeniería Informática",
    "about.university1": "Universidad Internacional Iberoamericana de México (UNINI México) - FUNIBER (2023 - 2028)",
    "about.degree2": "Programador Web Full Stack",
    "about.university2": "Henry Bootcamp (2021)",
    "about.certifications": "Certificaciones & Habilidades",
    "about.certificationsDesc":
      "Poseo múltiples certificaciones en tecnologías como React.js, Node.js, Python y desarrollo Full Stack. Soy un apasionado del aprendizaje continuo.",
    "about.english": "Inglés: Nivel B1",
    "about.skillsDesc":
      "Experiencia en WordPress, SEO técnico, posicionamiento web y automatizaciones con herramientas como N8n.",
    "about.leadership": "Liderazgo & Mentoría",
    "about.leadershipDesc":
      "Experiencia liderando y ofreciendo mentorías a equipos multidisciplinarios de hasta 8 personas en el área del desarrollo de software, garantizando entregas en tiempos estimados y cumpliendo necesidades específicas de cada proyecto.",

    // Experience
    "experience.title": "Experiencia",
    "experience.subtitle": "Más de 5 años construyendo soluciones tecnológicas innovadoras",
    "experience.current": "Actual",
    "experience.cofounder": "Cofundador",
    "experience.qodeDesc":
      "Somos una nueva empresa de desarrollo de software que ofrece soluciones optimizadas para pequeñas y grandes empresas.",
    "experience.fullstack": "Desarrollador Full Stack",
    "experience.kargguDesc":
      "Especializado en la integración de nuevas funcionalidades, resolución de bugs, optimización de rendimiento en proyectos web y estructuración óptima del software. Trabajo en estrecha colaboración con equipos multidisciplinarios para ofrecer soluciones sólidas y escalables.",
    "experience.mentor": "Education Mentor",
    "experience.henryDesc":
      "Mentorizo grupos de 6 a 8 personas por grupo, mi objetivo es guiar a estos participantes a construir un producto digital capaz de satisfacer las necesidades de un cliente, implementando las mejores prácticas, código limpio y legible.",
    "experience.frontend": "Desarrollador Front-End",
    "experience.asoftyDesc":
      "Desarrollo avanzado en HTML, CSS, TypeScript y Angular. Experiencia sólida en implementación y optimización de bases de datos, así como en la lógica del lado del servidor utilizando MySQL y .NET Core.",
    "experience.webdev": "Desarrollador Web",
    "experience.seoDesc":
      "Optimización y mantenimiento de sistemas web, SEO técnico, implementación de mejoras en estructura y código para optimizar posicionamiento en buscadores. Auditorías SEO completas y colaboración con equipos multidisciplinarios.",
    "experience.sunpowerDesc":
      "Encargado de proyecto, soporte técnico, nuevas implementaciones, reuniones con clientes, Scrum Master, entrega y distribución de tiempos, consecución de objetivos, demostraciones de producto al cliente final.",
    
    // Experience periods and locations
    "experience.period.qode": "noviembre 2024 - Presente",
    "experience.period.karggu": "abril 2024 - junio 2025",
    "experience.period.henry": "febrero 2023 - Presente",
    "experience.period.asofty": "octubre 2023 - mayo 2024",
    "experience.period.seo": "abril 2023 - octubre 2023",
    "experience.period.sunpower": "febrero 2022 - febrero 2023",
    
    "experience.location.qode": "Distrito Capital, Colombia",
    "experience.location.karggu": "México (Remoto)",
    "experience.location.henry": "Buenos Aires, Argentina (Remoto)",
    "experience.location.asofty": "Colombia",
    "experience.location.seo": "Colombia",
    "experience.location.sunpower": "Bogotá, Colombia",

    // Skills
    "skills.title": "Habilidades & Stack",
    "skills.technologies": "Tecnologías",
    "skills.tools": "Herramientas & Metodologías",

    // Projects
    "projects.title": "Proyectos Destacados",
    "projects.viewDemo": "Ver Demo",
    "projects.viewCode": "Ver Código",
    
    // Project details
    "projects.ecommerce.title": "E-Commerce Platform",
    "projects.ecommerce.description": "Plataforma completa de comercio electrónico con panel de administración, gestión de inventario y pasarela de pagos.",
    "projects.task.title": "Task Management App",
    "projects.task.description": "Aplicación de gestión de tareas con colaboración en tiempo real, notificaciones push y sincronización offline.",
    "projects.analytics.title": "Analytics Dashboard",
    "projects.analytics.description": "Dashboard interactivo para análisis de datos con gráficos en tiempo real y reportes personalizables.",
    "projects.iot.title": "IoT Monitoring System",
    "projects.iot.description": "Sistema de monitoreo para dispositivos IoT con alertas automáticas y visualización de datos en tiempo real.",

    // Repositories
    "repositories.title": "Repositorios GitHub",
    "repositories.viewAll": "Ver todos los repositorios",
    
    // Repository details
    "repositories.angular-ecommerce.name": "angular-ecommerce",
    "repositories.angular-ecommerce.description": "Aplicación de e-commerce completa construida con Angular y Material Design",
    "repositories.react-dashboard.name": "react-dashboard",
    "repositories.react-dashboard.description": "Dashboard administrativo responsive con React y Chart.js",
    "repositories.nodejs-api-rest.name": "nodejs-api-rest",
    "repositories.nodejs-api-rest.description": "API RESTful robusta con Node.js, Express y MongoDB",
    "repositories.dotnet-microservices.name": "dotnet-microservices",
    "repositories.dotnet-microservices.description": "Arquitectura de microservicios con .NET Core y Docker",
    "repositories.vue-task-manager.name": "vue-task-manager",
    "repositories.vue-task-manager.description": "Gestor de tareas colaborativo con Vue.js y Socket.io",
    "repositories.python-data-analysis.name": "python-data-analysis",
    "repositories.python-data-analysis.description": "Herramientas de análisis de datos con Python y Pandas",

    // Testimonials
    "testimonials.title": "Testimonios",
    
    // Testimonial details
    "testimonials.maria.name": "María González",
    "testimonials.maria.role": "Product Manager",
    "testimonials.maria.company": "TechCorp",
    "testimonials.maria.content": "Luis Miguel entregó un producto excepcional que superó nuestras expectativas. Su atención al detalle y capacidad técnica son impresionantes.",
    
    "testimonials.carlos.name": "Carlos Rodríguez",
    "testimonials.carlos.role": "CTO",
    "testimonials.carlos.company": "StartupXYZ",
    "testimonials.carlos.content": "Trabajar con Luis Miguel fue una experiencia fantástica. Su conocimiento técnico y profesionalismo hicieron que el proyecto fuera un éxito total.",
    
    "testimonials.ana.name": "Ana Martínez",
    "testimonials.ana.role": "Lead Developer",
    "testimonials.ana.company": "DevStudio",
    "testimonials.ana.content": "La calidad del código y la arquitectura propuesta por Luis Miguel son de primer nivel. Definitivamente recomendaría sus servicios.",

    // Contact
    "contact.title": "Contacto",
    "contact.subtitle": "¿Tienes un proyecto en mente? ¡Hablemos y hagámoslo realidad juntos!",
    "contact.formTitle": "Cuéntame sobre tu proyecto",
    "contact.name": "Nombre completo",
    "contact.email": "Email",
    "contact.phone": "Teléfono",
    "contact.company": "Empresa/Organización",
    "contact.projectType": "Tipo de proyecto",
    "contact.budget": "Presupuesto estimado",
    "contact.timeline": "Timeline del proyecto",
    "contact.message": "Descripción del proyecto",
    "contact.newsletter": "Quiero recibir actualizaciones sobre nuevos proyectos y tecnologías",
    "contact.send": "Enviar mensaje",
    "contact.sending": "Enviando mensaje...",
    "contact.success": "¡Mensaje enviado exitosamente!",
    "contact.availability": "Disponibilidad",
    "contact.schedule": "Lun - Vie: 8:00 AM - 6:00 PM (COT)",
    "contact.response": "Respuesta típica: 2-4 horas",
    "contact.projectQuestion": "¿Tienes un proyecto en mente? ¡Hablemos!",
    "contact.scheduleCall": "Agendar llamada",
    "contact.error": "Error al enviar. Inténtalo de nuevo.",
    "contact.namePlaceholder": "Tu nombre",
    "contact.emailPlaceholder": "tu@email.com",
    "contact.phonePlaceholder": "+57 300 123 4567",
    "contact.companyPlaceholder": "Nombre de tu empresa",
    "contact.messagePlaceholder": "Cuéntame más detalles sobre tu proyecto, objetivos, funcionalidades requeridas, etc.",
    "contact.projectTypePlaceholder": "Selecciona el tipo",
    "contact.budgetPlaceholder": "Rango de presupuesto",
    "contact.timelinePlaceholder": "¿Cuándo necesitas el proyecto?",
    
    // Project types
    "contact.projectType.web-app": "Aplicación Web",
    "contact.projectType.mobile-app": "Aplicación Móvil",
    "contact.projectType.ecommerce": "E-commerce",
    "contact.projectType.dashboard": "Dashboard/Analytics",
    "contact.projectType.api": "API/Backend",
    "contact.projectType.maintenance": "Mantenimiento",
    "contact.projectType.consulting": "Consultoría",
    "contact.projectType.other": "Otro",
    
    // Budget ranges
    "contact.budget.under-5k": "Menos de $5,000 USD",
    "contact.budget.5k-15k": "$5,000 - $15,000 USD",
    "contact.budget.15k-30k": "$15,000 - $30,000 USD",
    "contact.budget.30k-50k": "$30,000 - $50,000 USD",
    "contact.budget.over-50k": "Más de $50,000 USD",
    "contact.budget.discuss": "Prefiero discutirlo",
    
    // Timeline options
    "contact.timeline.asap": "Lo antes posible",
    "contact.timeline.1-month": "En 1 mes",
    "contact.timeline.2-3-months": "En 2-3 meses",
    "contact.timeline.3-6-months": "En 3-6 meses",
    "contact.timeline.flexible": "Flexible",

    // Footer
    "footer.rights": "Todos los derechos reservados.",
    "footer.github": "GitHub Profile",
    "footer.madeWith": "Hecho con",
    "footer.code": "y mucho código",
    "footer.powered": "Powered by Next.js",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.downloadCV": "Download CV",

    // Hero
    "hero.available": "Available for projects",
    "hero.location": "Bogotá, Colombia",
    "hero.role": "Full Stack Developer",
    "hero.description1":
      "Full Stack Web Developer with over 5 years of experience, specialized in creating scalable and optimized technological solutions",
    "hero.description2": "Expert in Angular, React, Node.js, .NET Core, Technical SEO and WordPress",
    "hero.downloadCV": "Download CV",
    "hero.scrollExplore": "Scroll to explore",

    // About
    "about.title": "About Me",
    "about.passion": "My Passion",
    "about.passionDesc":
      "Full Stack Web Developer with over 5 years of experience, specialized in creating scalable, modular and optimized technological solutions under best practices and agile methodologies like SCRUM and TDD.",
    "about.passionDesc2":
      "Currently I combine my passion for development with entrepreneurship, leading a Software Factory, where I apply my experience in technical SEO to boost web positioning.",
    "about.education": "Education",
    "about.degree1": "Bachelor's Degree in Computer Engineering",
    "about.university1": "Universidad Internacional Iberoamericana de México (UNINI México) - FUNIBER (2023 - 2028)",
    "about.degree2": "Full Stack Web Programmer",
    "about.university2": "Henry Bootcamp (2021)",
    "about.certifications": "Certifications & Skills",
    "about.certificationsDesc":
      "I have multiple certifications in technologies like React.js, Node.js, Python and Full Stack development. I'm passionate about continuous learning.",
    "about.english": "English: B1 Level",
    "about.skillsDesc": "Experience in WordPress, technical SEO, web positioning and automations with tools like N8n.",
    "about.leadership": "Leadership & Mentoring",
    "about.leadershipDesc":
      "Experience leading and mentoring multidisciplinary teams of up to 8 people in software development, ensuring deliveries on estimated times and meeting specific needs of each project.",

    // Experience
    "experience.title": "Experience",
    "experience.subtitle": "Over 5 years building innovative technological solutions",
    "experience.current": "Current",
    "experience.cofounder": "Co-founder",
    "experience.qodeDesc":
      "We are a new software development company that offers optimized solutions for small and large companies.",
    "experience.fullstack": "Full Stack Developer",
    "experience.kargguDesc":
      "Specialized in integrating new functionalities, bug resolution, performance optimization in web projects and optimal software structuring. I work closely with multidisciplinary teams to offer solid and scalable solutions.",
    "experience.mentor": "Education Mentor",
    "experience.henryDesc":
      "I mentor groups of 6 to 8 people per group, my goal is to guide these participants to build a digital product capable of satisfying a client's needs, implementing best practices, clean and readable code.",
    "experience.frontend": "Front-End Developer",
    "experience.asoftyDesc":
      "Advanced development in HTML, CSS, TypeScript and Angular. Solid experience in database implementation and optimization, as well as server-side logic using MySQL and .NET Core.",
    "experience.webdev": "Web Developer",
    "experience.seoDesc":
      "Web systems optimization and maintenance, technical SEO, implementation of improvements in structure and code to optimize search engine positioning. Complete SEO audits and collaboration with multidisciplinary teams.",
    "experience.sunpowerDesc":
      "Project manager, technical support, new implementations, client meetings, Scrum Master, delivery and time distribution, goal achievement, product demonstrations to end client.",
    
    // Experience periods and locations
    "experience.period.qode": "November 2024 - Present",
    "experience.period.karggu": "April 2024 - June 2025",
    "experience.period.henry": "February 2023 - Present",
    "experience.period.asofty": "October 2023 - May 2024",
    "experience.period.seo": "April 2023 - October 2023",
    "experience.period.sunpower": "February 2022 - February 2023",
    
    "experience.location.qode": "Capital District, Colombia",
    "experience.location.karggu": "Mexico (Remote)",
    "experience.location.henry": "Buenos Aires, Argentina (Remote)",
    "experience.location.asofty": "Colombia",
    "experience.location.seo": "Colombia",
    "experience.location.sunpower": "Bogotá, Colombia",

    // Skills
    "skills.title": "Skills & Stack",
    "skills.technologies": "Technologies",
    "skills.tools": "Tools & Methodologies",

    // Projects
    "projects.title": "Featured Projects",
    "projects.viewDemo": "View Demo",
    "projects.viewCode": "View Code",
    
    // Project details
    "projects.ecommerce.title": "E-Commerce Platform",
    "projects.ecommerce.description": "Complete e-commerce platform with admin panel, inventory management and payment gateway.",
    "projects.task.title": "Task Management App",
    "projects.task.description": "Task management application with real-time collaboration, push notifications and offline synchronization.",
    "projects.analytics.title": "Analytics Dashboard",
    "projects.analytics.description": "Interactive dashboard for data analysis with real-time charts and customizable reports.",
    "projects.iot.title": "IoT Monitoring System",
    "projects.iot.description": "IoT device monitoring system with automatic alerts and real-time data visualization.",

    // Repositories
    "repositories.title": "GitHub Repositories",
    "repositories.viewAll": "View all repositories",
    
    // Repository details
    "repositories.angular-ecommerce.name": "angular-ecommerce",
    "repositories.angular-ecommerce.description": "Complete e-commerce application built with Angular and Material Design",
    "repositories.react-dashboard.name": "react-dashboard",
    "repositories.react-dashboard.description": "Responsive admin dashboard with React and Chart.js",
    "repositories.nodejs-api-rest.name": "nodejs-api-rest",
    "repositories.nodejs-api-rest.description": "Robust RESTful API with Node.js, Express and MongoDB",
    "repositories.dotnet-microservices.name": "dotnet-microservices",
    "repositories.dotnet-microservices.description": "Microservices architecture with .NET Core and Docker",
    "repositories.vue-task-manager.name": "vue-task-manager",
    "repositories.vue-task-manager.description": "Collaborative task manager with Vue.js and Socket.io",
    "repositories.python-data-analysis.name": "python-data-analysis",
    "repositories.python-data-analysis.description": "Data analysis tools with Python and Pandas",

    // Testimonials
    "testimonials.title": "Testimonials",
    
    // Testimonial details
    "testimonials.maria.name": "María González",
    "testimonials.maria.role": "Product Manager",
    "testimonials.maria.company": "TechCorp",
    "testimonials.maria.content": "Luis Miguel delivered an exceptional product that exceeded our expectations. His attention to detail and technical capabilities are impressive.",
    
    "testimonials.carlos.name": "Carlos Rodríguez",
    "testimonials.carlos.role": "CTO",
    "testimonials.carlos.company": "StartupXYZ",
    "testimonials.carlos.content": "Working with Luis Miguel was a fantastic experience. His technical knowledge and professionalism made the project a total success.",
    
    "testimonials.ana.name": "Ana Martínez",
    "testimonials.ana.role": "Lead Developer",
    "testimonials.ana.company": "DevStudio",
    "testimonials.ana.content": "The code quality and architecture proposed by Luis Miguel are top-notch. I would definitely recommend his services.",

    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Have a project in mind? Let's talk and make it happen together!",
    "contact.formTitle": "Tell me about your project",
    "contact.name": "Full name",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.company": "Company/Organization",
    "contact.projectType": "Project type",
    "contact.budget": "Estimated budget",
    "contact.timeline": "Project timeline",
    "contact.message": "Project description",
    "contact.newsletter": "I want to receive updates about new projects and technologies",
    "contact.send": "Send message",
    "contact.sending": "Sending message...",
    "contact.success": "Message sent successfully!",
    "contact.availability": "Availability",
    "contact.schedule": "Mon - Fri: 8:00 AM - 6:00 PM (COT)",
    "contact.response": "Typical response: 2-4 hours",
    "contact.projectQuestion": "Have a project in mind? Let's talk!",
    "contact.scheduleCall": "Schedule call",
    "contact.error": "Error sending message. Please try again.",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "your@email.com",
    "contact.phonePlaceholder": "+57 300 123 4567",
    "contact.companyPlaceholder": "Your company name",
    "contact.messagePlaceholder": "Tell me more details about your project, objectives, required functionalities, etc.",
    "contact.projectTypePlaceholder": "Select type",
    "contact.budgetPlaceholder": "Budget range",
    "contact.timelinePlaceholder": "When do you need the project?",
    
    // Project types
    "contact.projectType.web-app": "Web Application",
    "contact.projectType.mobile-app": "Mobile Application",
    "contact.projectType.ecommerce": "E-commerce",
    "contact.projectType.dashboard": "Dashboard/Analytics",
    "contact.projectType.api": "API/Backend",
    "contact.projectType.maintenance": "Maintenance",
    "contact.projectType.consulting": "Consulting",
    "contact.projectType.other": "Other",
    
    // Budget ranges
    "contact.budget.under-5k": "Less than $5,000 USD",
    "contact.budget.5k-15k": "$5,000 - $15,000 USD",
    "contact.budget.15k-30k": "$15,000 - $30,000 USD",
    "contact.budget.30k-50k": "$30,000 - $50,000 USD",
    "contact.budget.over-50k": "More than $50,000 USD",
    "contact.budget.discuss": "I prefer to discuss it",
    
    // Timeline options
    "contact.timeline.asap": "As soon as possible",
    "contact.timeline.1-month": "In 1 month",
    "contact.timeline.2-3-months": "In 2-3 months",
    "contact.timeline.3-6-months": "In 3-6 months",
    "contact.timeline.flexible": "Flexible",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.github": "GitHub Profile",
    "footer.madeWith": "Made with",
    "footer.code": "and lots of code",
    "footer.powered": "Powered by Next.js",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

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
