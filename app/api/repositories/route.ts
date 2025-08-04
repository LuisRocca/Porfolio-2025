import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'LuisRocca';
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    // Si no hay token, usar la API pública (limitada a 60 requests por hora)
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // Solo agregar autorización si hay token
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    
    // Filtrar solo repositorios públicos y mapear datos
    const publicRepos = repos
      .filter((repo: any) => !repo.fork && !repo.private)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description || 'No description available',
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        updated_at: repo.updated_at,
        topics: repo.topics || []
      }))
      .slice(0, 6); // Limitar a 6 repositorios para el portfolio

    return NextResponse.json(
      { message: publicRepos },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error)
    return NextResponse.json(
      { message: 'Error al obtener los repositorios de GitHub' },
      { status: 500 }
    )
  }
} 