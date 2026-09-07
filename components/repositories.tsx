"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, GitFork, Star } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useReveal } from "@/hooks/use-reveal"
import { LINKS } from "@/lib/profile"

type Repository = {
  name: string
  description: string
  language: string
  stars: number
  forks: number
  url: string
}

/**
 * Color por lenguaje en hexadecimal, no en clases de Tailwind: el valor
 * viene de la API en tiempo de ejecución y Tailwind sólo genera las clases
 * que encuentra escritas en el código, así que `bg-${color}` nunca existía
 * en el CSS compilado y los puntos salían invisibles.
 */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  "C#": "#178600",
  HTML: "#E34C26",
  CSS: "#563D7C",
  SCSS: "#C6538C",
  Python: "#3572A5",
  Java: "#B07219",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Dart: "#00B4AB",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Vue: "#41B883",
  Shell: "#89E051",
}

const FALLBACK_COLOR = "#6E7681"

export default function Repositories() {
  const { t } = useLanguage()
  const { ref, isVisible } = useReveal<HTMLElement>()
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const response = await fetch("/api/repositories")
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)

        const data = await response.json()
        if (!Array.isArray(data.message)) throw new Error("Unexpected payload")

        if (cancelled) return
        setRepositories(
          data.message.map((repo: Record<string, unknown>) => ({
            name: String(repo.name),
            description: (repo.description as string) || "",
            language: (repo.language as string) || "—",
            stars: Number(repo.stars ?? 0),
            forks: Number(repo.forks ?? 0),
            url: String(repo.url),
          })),
        )
        setStatus("ready")
      } catch (error) {
        if (cancelled) return
        console.error("No se pudieron cargar los repositorios:", error)
        setStatus("error")
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  // Se prefiere la descripción propia: la de GitHub está vacía en los repos
  // más recientes y se queda corta en los antiguos. `t` devuelve la clave tal
  // cual cuando no existe, y eso es lo que se usa para detectar el hueco.
  const describe = (repo: Repository) => {
    const key = `repositories.${repo.name}.desc`
    const own = t(key)
    if (own !== key) return own
    return repo.description || t("repositories.noDescription")
  }

  return (
    <section ref={ref} id="repos" className="scroll-mt-20 border-t border-border px-6 py-20 md:py-28">
      <div className={`mx-auto max-w-content reveal ${isVisible ? "reveal-visible" : ""}`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t("repositories.eyebrow")}</p>
            <h2 className="section-title mt-3">{t("repositories.title")}</h2>
          </div>

          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1 text-sm"
          >
            {t("repositories.viewAll")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("repositories.subtitle")}
        </p>

        {status === "error" ? (
          <p className="mt-12 text-sm text-muted-foreground">{t("repositories.error")}</p>
        ) : (
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {status === "loading"
              ? Array.from({ length: 6 }, (_, index) => (
                  <div key={index} className="bg-background p-6">
                    <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                    <div className="mt-3 h-3 w-full animate-pulse rounded bg-muted" />
                    <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-muted" />
                    <div className="mt-6 h-3 w-1/3 animate-pulse rounded bg-muted" />
                  </div>
                ))
              : repositories.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col bg-background p-6 transition-colors duration-150 hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-mono text-sm text-foreground">{repo.name}</h3>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-150 group-hover:text-brand" />
                    </div>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {describe(repo)}
                    </p>

                    <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span
                          aria-hidden
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: LANGUAGE_COLORS[repo.language] ?? FALLBACK_COLOR,
                          }}
                        />
                        {repo.language}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        {repo.forks}
                      </span>
                    </div>
                  </a>
                ))}
          </div>
        )}
      </div>
    </section>
  )
}
