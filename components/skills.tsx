"use client"

import { useLanguage } from "@/contexts/language-context"
import { useReveal } from "@/hooks/use-reveal"
import { STACK_GROUPS } from "@/lib/profile"

export default function Skills() {
  const { t } = useLanguage()
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="stack" className="scroll-mt-20 border-t border-border px-6 py-20 md:py-28">
      <div className={`mx-auto max-w-content reveal ${isVisible ? "reveal-visible" : ""}`}>
        <p className="eyebrow">{t("stack.eyebrow")}</p>
        <h2 className="section-title mt-3">{t("stack.title")}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("stack.subtitle")}
        </p>

        <dl className="mt-12">
          {STACK_GROUPS.map((group) => (
            <div
              key={group.id}
              className="grid gap-3 border-t border-border py-7 first:border-t-0 first:pt-0 md:grid-cols-[11rem_1fr] md:gap-10"
            >
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground md:pt-1.5">
                {t(`stack.${group.id}`)}
              </dt>
              <dd className="flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-border px-2.5 py-1 text-sm text-foreground transition-colors duration-150 hover:border-border-strong"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
