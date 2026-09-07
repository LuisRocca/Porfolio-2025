import { NextResponse } from 'next/server'
import { FEATURED_REPOS } from '@/lib/profile'

type GitHubRepo = {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  updated_at: string
  topics?: string[]
  fork: boolean
  private: boolean
  archived: boolean
}

// La respuesta de GitHub cambia poco: se cachea una hora para no gastar el
// límite de 60 peticiones/hora de la API pública en cada visita.
export const revalidate = 3600

export async function GET() {
  const username = process.env.GITHUB_USERNAME || 'LuisRocca'
  const token = process.env.GITHUB_TOKEN

  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }
    if (token) headers.Authorization = `Bearer ${token}`

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate } },
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos: GitHubRepo[] = await response.json()

    const order = new Map(FEATURED_REPOS.map((name, index) => [name.toLowerCase(), index]))

    const publicRepos = repos
      .filter(
        (repo) =>
          !repo.fork && !repo.private && !repo.archived && order.has(repo.name.toLowerCase()),
      )
      .sort((a, b) => order.get(a.name.toLowerCase())! - order.get(b.name.toLowerCase())!)
      .map((repo) => ({
        name: repo.name,
        // Se devuelve null en vez de un texto por defecto: el cliente resuelve
        // el estado vacío en el idioma activo, y para los repos curados usa su
        // propia descripción en vez de la de GitHub.
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        updated_at: repo.updated_at,
        topics: repo.topics ?? [],
      }))

    return NextResponse.json({ message: publicRepos }, { status: 200 })
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error)
    return NextResponse.json(
      { message: [], error: 'No se pudieron obtener los repositorios de GitHub' },
      { status: 502 },
    )
  }
}
