"use client"

import { useState, useEffect, useRef } from "react"
import { Briefcase, Calendar, MapPin, Users, Zap, Code, Award } from "lucide-react"

const experiences = [
  {
    title: "Cofundador",
    company: "QODE-OS",
    period: "noviembre 2024 - Presente",
    location: "Distrito Capital, Colombia",
    description:
      "Somos una nueva empresa de desarrollo de software que ofrece soluciones optimizadas para pequeñas y grandes empresas.",
    technologies: ["Emprendimiento", "Software Factory", "Liderazgo", "Estrategia"],
    type: "current",
    icon: <Award className="h-5 w-5" />,
  },
  {
    title: "Desarrollador Full Stack",
    company: "Karggu",
    period: "abril 2024 - junio 2025",
    location: "México (Remoto)",
    description:
      "Especializado en la integración de nuevas funcionalidades, resolución de bugs, optimización de rendimiento en proyectos web y estructuración óptima del software. Trabajo en estrecha colaboración con equipos multidisciplinarios para ofrecer soluciones sólidas y escalables.",
    technologies: ["Angular.js", "React", "Node.js", "MongoDB", "Optimización"],
    type: "current",
    icon: <Code className="h-5 w-5" />,
  },
  {
    title: "Education Mentor",
    company: "Henry",
    period: "febrero 2023 - Presente",
    location: "Buenos Aires, Argentina (Remoto)",
    description:
      "Mentorizo grupos de 6 a 8 personas por grupo, mi objetivo es guiar a estos participantes a construir un producto digital capaz de satisfacer las necesidades de un cliente, implementando las mejores prácticas, código limpio y legible.",
    technologies: ["Mentoring", "Team Leadership", "Best Practices", "Clean Code"],
    type: "mentor",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Desarrollador Front-End",
    company: "ASOFTY",
    period: "octubre 2023 - mayo 2024",
    location: "Colombia",
    description:
      "Desarrollo avanzado en HTML, CSS, TypeScript y Angular. Experiencia sólida en implementación y optimización de bases de datos, así como en la lógica del lado del servidor utilizando MySQL y .NetCore.",
    technologies: ["Angular", "TypeScript", "MySQL", ".NET Core", "HTML", "CSS"],
    type: "past",
    icon: <Code className="h-5 w-5" />,
  },
  {
    title: "Desarrollador Web",
    company: "Need SEO Services",
    period: "abril 2023 - octubre 2023",
    location: "Colombia",
    description:
      "Optimización y mantenimiento de sistemas web, SEO técnico, implementación de mejoras en estructura y código para optimizar posicionamiento en buscadores. Auditorías SEO completas y colaboración con equipos multidisciplinarios.",
    technologies: ["WordPress", "Wix", "SEO Técnico", "Schema.org", "Auditorías"],
    type: "past",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "Desarrollador Full Stack",
    company: "SunPower E.S.P.",
    period: "febrero 2022 - febrero 2023",
    location: "Bogotá, Colombia",
    description:
      "Encargado de proyecto, soporte técnico, nuevas implementaciones, reuniones con clientes, Scrum Master, entrega y distribución de tiempos, consecución de objetivos, demostraciones de producto al cliente final.",
    technologies: ["Project Management", "Scrum Master", "Client Relations", "Technical Support"],
    type: "past",
    icon: <Briefcase className="h-5 w-5" />,
  },
]

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-6 relative bg-cyber-darker overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-20 w-40 h-40 border border-cyber-blue/10 rotate-45 animate-spin opacity-30"
          style={{ animationDuration: "25s" }}
        />
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-cyber-lime/10 rotate-12 animate-pulse opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-cyber-purple hover:text-cyber-purple-glow transition-colors duration-300 cursor-pointer">
            Experiencia
          </h2>
          <div className="h-1 w-24 bg-cyber-lime mx-auto hover:w-32 transition-all duration-300" />
          <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            Más de 5 años construyendo soluciones tecnológicas innovadoras
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`bg-cyber-gray/60 backdrop-blur-sm border rounded-lg p-8 shadow-cyber-card transition-all duration-500 hover:scale-105 cursor-pointer ${
                exp.type === "current"
                  ? "border-cyber-lime/50 hover:shadow-neon-lime"
                  : exp.type === "mentor"
                    ? "border-cyber-blue/50 hover:shadow-neon-blue"
                    : "border-cyber-purple/50 hover:shadow-neon-purple"
              } ${isVisible ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10"}`}
              style={{
                transitionDelay: `${index * 200}ms`,
                transform: hoveredIndex === index ? "scale(1.02) translateY(-5px)" : undefined,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        exp.type === "current"
                          ? "bg-cyber-lime/20 text-cyber-lime"
                          : exp.type === "mentor"
                            ? "bg-cyber-blue/20 text-cyber-blue"
                            : "bg-cyber-purple/20 text-cyber-purple"
                      } ${hoveredIndex === index ? "animate-pulse scale-110" : ""}`}
                    >
                      {exp.icon}
                    </div>
                    <h3
                      className={`text-2xl font-bold text-white transition-colors duration-300 ${
                        hoveredIndex === index ? "text-cyber-lime" : ""
                      }`}
                    >
                      {exp.title}
                    </h3>
                    {exp.type === "current" && (
                      <span className="px-3 py-1 bg-cyber-lime/20 border border-cyber-lime/50 rounded-full text-xs text-cyber-lime font-medium animate-pulse">
                        Actual
                      </span>
                    )}
                  </div>
                  <h4
                    className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                      exp.type === "current"
                        ? "text-cyber-lime"
                        : exp.type === "mentor"
                          ? "text-cyber-blue"
                          : "text-cyber-purple"
                    } ${hoveredIndex === index ? "animate-pulse" : ""}`}
                  >
                    {exp.company}
                  </h4>
                </div>

                <div className="flex flex-col md:items-end gap-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar
                      className={`h-4 w-4 transition-all duration-300 ${hoveredIndex === index ? "animate-spin" : ""}`}
                    />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin
                      className={`h-4 w-4 transition-all duration-300 ${hoveredIndex === index ? "animate-bounce" : ""}`}
                    />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <p
                className={`text-gray-200 leading-relaxed mb-6 transition-colors duration-300 ${
                  hoveredIndex === index ? "text-white" : ""
                }`}
              >
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 cursor-pointer ${
                      exp.type === "current"
                        ? "bg-cyber-lime/20 border border-cyber-lime/50 text-cyber-lime hover:bg-cyber-lime/30"
                        : exp.type === "mentor"
                          ? "bg-cyber-blue/20 border border-cyber-blue/50 text-cyber-blue hover:bg-cyber-blue/30"
                          : "bg-cyber-purple/20 border border-cyber-purple/50 text-cyber-purple hover:bg-cyber-purple/30"
                    } ${hoveredIndex === index ? "animate-pulse" : ""}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
