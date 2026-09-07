"use client"

import { ArrowDownToLine, ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { CV_PATH, LINKS } from "@/lib/profile"

export default function Hero() {
  const { language, t } = useLanguage()

  // `on-dark` reasigna los tokens de color dentro del hero: el banner es
  // oscuro en los dos temas, así que su contenido no puede seguir al tema de
  // la página.
  return (
    <section
      id="hero"
      className="on-dark relative isolate overflow-hidden px-6 pb-28 pt-36 md:pb-36 md:pt-48"
    >
      <div aria-hidden className="atmosphere atmosphere--hero" />

      <div className="relative mx-auto max-w-content">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-border px-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-solid opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-solid" />
          </span>
          <span className="text-xs text-muted-foreground">{t("hero.available")}</span>
        </div>

        <h1 className="mt-8 text-[clamp(2.5rem,7vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground">
          Luis Miguel
          <br />
          Alfonzo Roca
        </h1>

        <p className="mt-6 max-w-2xl text-[clamp(1.125rem,2.4vw,1.5rem)] leading-snug tracking-tight text-muted-foreground">
          {t("hero.role")}
        </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("hero.description")}
        </p>

        <p className="mt-6 font-mono text-xs leading-relaxed text-muted-foreground">
          Node.js · NestJS · React · Next.js · Angular · PostgreSQL · Docker
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={CV_PATH[language]}
            download
            className="inline-flex h-11 items-center gap-2 rounded-md bg-brand-solid px-5 text-sm font-medium text-brand-solid-foreground transition-opacity duration-150 hover:opacity-90"
          >
            <ArrowDownToLine className="h-4 w-4" />
            {t("hero.downloadCV")}
          </a>

          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1 text-sm"
          >
            LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1 text-sm"
          >
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <a href={`mailto:${LINKS.email}`} className="link-underline text-sm">
            {LINKS.email}
          </a>
        </div>
      </div>
    </section>
  )
}
