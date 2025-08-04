"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Star, GitFork } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

const languageColors: { [key: string]: string } = {
  TypeScript: "cyber-blue",
  JavaScript: "cyber-lime",
  "C#": "cyber-purple",
  Vue: "cyber-lime",
  Python: "cyber-blue",
  HTML: "cyber-orange",
  CSS: "cyber-pink",
  Java: "cyber-red",
  PHP: "cyber-purple",
  Ruby: "cyber-red",
  Dart: "cyber-blue",
  Rust: "cyber-orange",
  Swift: "cyber-orange",
  Kotlin: "cyber-purple",
  Unknown: "cyber-gray",
}

export default function Repositories() {
  const { t } = useLanguage()
  const [repositories, setRepositories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRepositories();
  }, []);

  const getRepositories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/repositories', {
        method: 'GET',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      // Mapear los datos de GitHub al formato esperado
      const mappedRepos = data.message.map((repo: any) => ({
        name: repo.name,
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        description: repo.description || 'No description available'
      }))
      
      setRepositories(mappedRepos)
      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <section className="py-20 px-6 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-cyber-purple">{t("repositories.title")}</h2>
          <div className="h-1 w-24 bg-cyber-blue mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-cyber-lime">Loading repositories...</p>
            </div>
          ) : (
            repositories.map((repo, index) => (
            <div
              key={repo.name}
              className="bg-cyber-gray/60 backdrop-blur-sm border border-cyber-purple/50 rounded-lg p-6 shadow-cyber-card hover:shadow-neon-purple transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white hover:text-cyber-lime transition-colors cursor-pointer">
                  {repo.name}
                </h3>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-cyber-blue hover:text-cyber-blue-glow"
                  onClick={() => window.open(repo.url, '_blank')}
                >
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
          ))
          )}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-cyber-blue hover:bg-cyber-blue-glow text-white px-8 py-4 text-lg font-semibold shadow-neon-blue hover:shadow-neon-blue transition-all duration-300">
            {t("repositories.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  )
}
