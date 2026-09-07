"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { useReveal } from "@/hooks/use-reveal"

const education = [
  { years: "2026 — 2028", degreeKey: "about.degree1", schoolKey: "about.university1" },
  { years: "2023 — 2026", degreeKey: "about.degree2", schoolKey: "about.university2" },
  { years: "2021", degreeKey: "about.degree3", schoolKey: "about.university3" },
]

export default function About() {
  const { t } = useLanguage()
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="about" className="scroll-mt-20 border-t border-border px-6 py-20 md:py-28">
      <div className={`mx-auto max-w-content reveal ${isVisible ? "reveal-visible" : ""}`}>
        <p className="eyebrow">{t("about.eyebrow")}</p>
        <h2 className="section-title mt-3">{t("about.title")}</h2>

        <div className="mt-12 grid gap-12 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-2">
            <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl border border-border">
              <Image
                src="/luis-miguel-alfonzo-roca.jpg"
                alt={t("about.photoAlt")}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
                priority
              />
            </div>

            <dl className="mt-8 max-w-xs space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted-foreground">{t("about.basedIn")}</dt>
                <dd className="text-right text-foreground">Bogotá, Colombia</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted-foreground">{t("about.languages")}</dt>
                <dd className="text-right text-foreground">{t("about.languagesValue")}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t("about.workingWith")}</dt>
                <dd className="text-right text-foreground">{t("about.workingWithValue")}</dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-3">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>

            <div className="mt-12">
              <p className="eyebrow">{t("about.education")}</p>
              <ul className="mt-5 space-y-5">
                {education.map((item) => (
                  <li
                    key={item.degreeKey}
                    className="grid gap-1 border-b border-border pb-5 last:border-0 last:pb-0 sm:grid-cols-[8rem_1fr] sm:gap-6"
                  >
                    <span className="font-mono text-xs text-muted-foreground sm:pt-1">
                      {item.years}
                    </span>
                    <span>
                      <span className="block text-sm text-foreground">{t(item.degreeKey)}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {t(item.schoolKey)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
