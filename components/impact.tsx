"use client"

import { useLanguage } from "@/contexts/language-context"
import { useReveal } from "@/hooks/use-reveal"
import { METRICS } from "@/lib/profile"

export default function Impact() {
  const { t } = useLanguage()
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden border-t border-border px-6 py-20 md:py-28"
    >
      <div aria-hidden className="atmosphere atmosphere--quiet" />

      <div className={`relative mx-auto max-w-content reveal ${isVisible ? "reveal-visible" : ""}`}>
        <p className="eyebrow">{t("impact.eyebrow")}</p>
        <h2 className="section-title mt-3">{t("impact.title")}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("impact.subtitle")}
        </p>

        <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map((metric) => (
            <div key={metric.id} className="bg-background p-6">
              <dt className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                {metric.value}
              </dt>
              <dd className="mt-2">
                <span className="block text-sm text-foreground">
                  {t(`impact.${metric.id}.label`)}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  {t(`impact.${metric.id}.context`)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
