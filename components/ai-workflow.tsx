"use client"

import { useLanguage } from "@/contexts/language-context"
import { useReveal } from "@/hooks/use-reveal"
import { AI_PRACTICES } from "@/lib/profile"

const TOOLS = ["Claude Code", "MCP", "Obsidian", "n8n", "GitHub Copilot"]

export default function AiWorkflow() {
  const { t } = useLanguage()
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="ai" className="scroll-mt-20 border-t border-border px-6 py-20 md:py-28">
      <div className={`mx-auto max-w-content reveal ${isVisible ? "reveal-visible" : ""}`}>
        <p className="eyebrow">{t("ai.eyebrow")}</p>
        <h2 className="section-title mt-3">{t("ai.title")}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t("ai.lead")}
        </p>

        <ol className="mt-12">
          {AI_PRACTICES.map((practice) => (
            <li
              key={practice.id}
              className="grid gap-3 border-t border-border py-8 first:border-t-0 first:pt-0 md:grid-cols-[11rem_1fr] md:gap-10"
            >
              {/* Número y unidad apilados: en línea, las etiquetas largas se
                  parten y rompen la alineación de la columna. */}
              <p className="md:pt-0.5">
                <span className="block text-3xl font-medium tracking-tight text-foreground">
                  {practice.stat}
                </span>
                <span className="mt-1.5 block font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
                  {t(`ai.${practice.id}.unit`)}
                </span>
              </p>

              <div>
                <h3 className="text-base font-medium text-foreground">
                  {t(`ai.${practice.id}.title`)}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {t(`ai.${practice.id}.desc`)}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-8">
          <span className="eyebrow">{t("ai.tools")}</span>
          <ul className="flex flex-wrap gap-1.5">
            {TOOLS.map((tool) => (
              <li
                key={tool}
                className="rounded border border-border px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
