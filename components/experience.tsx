"use client"

import { useLanguage } from "@/contexts/language-context"
import { useReveal } from "@/hooks/use-reveal"

type Role = {
  id: string
  company: string
  current?: boolean
  tech: string[]
  bullets?: number
}

/**
 * Orden por fecha de inicio descendente. Los roles vigentes se marcan con
 * `current` y sólo los tres más recientes desglosan logros, para que la
 * sección no se lea como un CV completo pegado en la página.
 */
const roles: Role[] = [
  {
    id: "telonline",
    company: "TelOnline LLC",
    current: true,
    bullets: 3,
    tech: ["NestJS", "Node.js", "React 19", "Next.js 15", "PostgreSQL RLS", "MedusaJS v2", "Docker", "GCP Cloud Run"],
  },
  {
    id: "sms",
    company: "SMS Sudamérica",
    current: true,
    bullets: 3,
    tech: ["Angular 19", "Signals", "RxJS", "Jasmine + Karma", "Clean Architecture"],
  },
  {
    id: "qode",
    company: "QODE-OS",
    current: true,
    bullets: 2,
    tech: ["Node.js", "NestJS", "React", "Angular", "PostgreSQL", "Docker"],
  },
  {
    id: "henry",
    company: "Henry",
    current: true,
    tech: ["Mentoría", "Node.js", "React", "Clean Code"],
  },
  {
    id: "forwarty",
    company: "Forwarty",
    tech: ["Node.js", ".NET Core", "Angular", "SQL Server"],
  },
  {
    id: "karggu",
    company: "Karggu",
    tech: ["Node.js", "TypeScript", "Angular", "Docker Compose", "AWS", "GCP"],
  },
  {
    id: "asofty",
    company: "ASOFTY",
    tech: ["Angular", "TypeScript", "MySQL", ".NET Core"],
  },
  {
    id: "seo",
    company: "Need SEO Services",
    tech: ["SEO técnico", "Schema.org", "WordPress", "Search Console"],
  },
  {
    id: "sunpower",
    company: "SunPower E.S.P.",
    tech: ["JavaScript", "Integración de APIs", "Scrum Master"],
  },
]

export default function Experience() {
  const { t } = useLanguage()
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="experience"
      className="scroll-mt-20 border-t border-border px-6 py-20 md:py-28"
    >
      <div className={`mx-auto max-w-content reveal ${isVisible ? "reveal-visible" : ""}`}>
        <p className="eyebrow">{t("experience.eyebrow")}</p>
        <h2 className="section-title mt-3">{t("experience.title")}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("experience.subtitle")}
        </p>

        <ol className="mt-12">
          {roles.map((role) => (
            <li
              key={role.id}
              className="grid gap-3 border-t border-border py-8 first:border-t-0 first:pt-0 md:grid-cols-[11rem_1fr] md:gap-10"
            >
              <div className="md:pt-0.5">
                <p className="font-mono text-xs text-muted-foreground">
                  {t(`experience.${role.id}.period`)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t(`experience.${role.id}.location`)}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-base font-medium text-foreground">
                    {t(`experience.${role.id}.role`)}
                  </h3>
                  {role.current && (
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-brand">
                      {t("experience.current")}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">{role.company}</p>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {t(`experience.${role.id}.desc`)}
                </p>

                {role.bullets ? (
                  <ul className="mt-4 max-w-2xl space-y-2">
                    {Array.from({ length: role.bullets }, (_, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-border-strong" />
                        {t(`experience.${role.id}.b${index + 1}`)}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {role.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-border px-2 py-1 font-mono text-[0.7rem] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
