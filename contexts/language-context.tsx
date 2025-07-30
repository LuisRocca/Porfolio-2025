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

    // Skills
    "skills.title": "Habilidades & Stack",
    "skills.technologies": "Tecnologías",
    "skills.tools": "Herramientas & Metodologías",

    // Projects
    "projects.title": "Proyectos Destacados",
    "projects.viewDemo": "Ver Demo",
    "projects.viewCode": "Ver Código",

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

    // Skills
    "skills.title": "Skills & Stack",
    "skills.technologies": "Technologies",
    "skills.tools": "Tools & Methodologies",

    // Projects
    "projects.title": "Featured Projects",
    "projects.viewDemo": "View Demo",
    "projects.viewCode": "View Code",

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
