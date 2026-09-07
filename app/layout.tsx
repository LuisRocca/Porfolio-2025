import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const siteUrl = 'https://porfolio-2025-chi.vercel.app'
const title = 'Luis Miguel Alfonzo Roca — Senior Full Stack Engineer & Tech Lead'
const description =
  'Senior Full Stack Engineer y Tech Lead con más de 5 años construyendo productos digitales end-to-end. Arquitectura SaaS multi-tenant en TelOnline y liderazgo frontend en SMS Sudamérica. Node.js · NestJS · React · Next.js · Angular · PostgreSQL.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s — Luis Miguel Alfonzo Roca',
  },
  description,
  keywords: [
    'Senior Full Stack Engineer',
    'Tech Lead',
    'Arquitecto de Software',
    'Node.js',
    'NestJS',
    'React',
    'Next.js',
    'Angular',
    'PostgreSQL',
    'Docker',
    'Bogotá',
    'Colombia',
  ],
  authors: [{ name: 'Luis Miguel Alfonzo Roca', url: siteUrl }],
  creator: 'Luis Miguel Alfonzo Roca',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: siteUrl,
    siteName: 'Luis Miguel Alfonzo Roca',
    title,
    description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Luis Miguel Alfonzo Roca — Senior Full Stack Engineer & Tech Lead',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@LuisRoc54300069',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon',
    apple: '/icon',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Luis Miguel Alfonzo Roca',
  url: siteUrl,
  jobTitle: 'Senior Full Stack Engineer & Tech Lead',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bogotá',
    addressCountry: 'CO',
  },
  sameAs: [
    'https://www.linkedin.com/in/luis-miguel-alfonzo-roca-software-enginer/',
    'https://github.com/LuisRocca',
  ],
  knowsAbout: [
    'Node.js',
    'NestJS',
    'React',
    'Next.js',
    'Angular',
    'TypeScript',
    'PostgreSQL',
    'Docker',
    'Arquitectura de software',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* El contenido se sirve completo en el HTML: sin JavaScript nadie
            añade `reveal-visible`, así que se desactiva el estado inicial
            oculto en lugar de dejar la página en blanco. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  )
}
