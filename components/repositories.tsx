import { Button } from "@/components/ui/button"
import { ExternalLink, Star, GitFork } from "lucide-react"

const repositories = [
  {
    name: "angular-ecommerce",
    description: "Aplicación de e-commerce completa construida con Angular y Material Design",
    language: "TypeScript",
    stars: 124,
    forks: 32,
    url: "#",
  },
  {
    name: "react-dashboard",
    description: "Dashboard administrativo responsive con React y Chart.js",
    language: "JavaScript",
    stars: 89,
    forks: 21,
    url: "#",
  },
  {
    name: "nodejs-api-rest",
    description: "API RESTful robusta con Node.js, Express y MongoDB",
    language: "JavaScript",
    stars: 156,
    forks: 45,
    url: "#",
  },
  {
    name: "dotnet-microservices",
    description: "Arquitectura de microservicios con .NET Core y Docker",
    language: "C#",
    stars: 203,
    forks: 67,
    url: "#",
  },
  {
    name: "vue-task-manager",
    description: "Gestor de tareas colaborativo con Vue.js y Socket.io",
    language: "Vue",
    stars: 78,
    forks: 18,
    url: "#",
  },
  {
    name: "python-data-analysis",
    description: "Herramientas de análisis de datos con Python y Pandas",
    language: "Python",
    stars: 95,
    forks: 28,
    url: "#",
  },
]

const languageColors: { [key: string]: string } = {
  TypeScript: "cyber-blue",
  JavaScript: "cyber-lime",
  "C#": "cyber-purple",
  Vue: "cyber-lime",
  Python: "cyber-blue",
}

export default function Repositories() {
  return (
    <section className="py-20 px-6 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-cyber-purple">Repositorios GitHub</h2>
          <div className="h-1 w-24 bg-cyber-blue mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repositories.map((repo, index) => (
            <div
              key={repo.name}
              className="bg-cyber-gray/60 backdrop-blur-sm border border-cyber-purple/50 rounded-lg p-6 shadow-cyber-card hover:shadow-neon-purple transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white hover:text-cyber-lime transition-colors cursor-pointer">
                  {repo.name}
                </h3>
                <Button size="sm" variant="ghost" className="text-cyber-blue hover:text-cyber-blue-glow">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-gray-200 text-sm mb-4 leading-relaxed">{repo.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded-full bg-${languageColors[repo.language]}`} />
                    <span className="text-gray-300">{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-300">
                    <Star className="h-4 w-4" />
                    <span>{repo.stars}</span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-300">
                    <GitFork className="h-4 w-4" />
                    <span>{repo.forks}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-cyber-blue hover:bg-cyber-blue-glow text-white px-8 py-4 text-lg font-semibold shadow-neon-blue hover:shadow-neon-blue transition-all duration-300">
            Ver todos los repositorios
          </Button>
        </div>
      </div>
    </section>
  )
}
