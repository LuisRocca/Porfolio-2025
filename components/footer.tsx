"use client"

import { useLanguage } from "@/contexts/language-context"
import { LINKS } from "@/lib/profile"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-content flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Luis Miguel Alfonzo Roca. {t("footer.rights")}
        </p>

        <nav aria-label={t("footer.social")} className="flex items-center gap-6 text-xs">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            GitHub
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            LinkedIn
          </a>
          <a href={`mailto:${LINKS.email}`} className="link-underline">
            Email
          </a>
        </nav>
      </div>
    </footer>
  )
}
