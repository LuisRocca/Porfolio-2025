"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowDownToLine } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ThemeToggle from "@/components/theme-toggle"
import { CV_PATH } from "@/lib/profile"

const sections = ["about", "experience", "stack", "ai", "work", "contact"] as const

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { id: "about", name: t("nav.about") },
    { id: "experience", name: t("nav.experience") },
    { id: "stack", name: t("nav.skills") },
    { id: "ai", name: t("nav.ai") },
    { id: "work", name: t("nav.projects") },
    { id: "contact", name: t("nav.contact") },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Sección activa por IntersectionObserver en vez de leer getBoundingClientRect
  // en cada scroll: el navegador no recalcula layout en cada frame.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es")

  // Sin scroll la barra flota sobre el banner oscuro del hero y hereda sus
  // tokens; al hacer scroll pasa a fondo translúcido y vuelve al tema.
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "vibrancy border-b border-border" : "border-b border-transparent"
      }`}
    >
      {/* `on-dark` va en el nav y no en el header: el desplegable móvil es
          hermano del nav y sí sigue el tema de la página, así que heredarlo
          le dejaría texto claro sobre fondo claro. */}
      <nav
        aria-label={t("nav.primary")}
        className={`mx-auto flex h-16 max-w-content items-center justify-between px-6 ${
          isScrolled ? "" : "on-dark"
        }`}
      >
        <a
          href="#hero"
          className="font-mono text-sm font-medium tracking-tight text-foreground transition-colors duration-150 hover:text-brand"
        >
          LMA
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={`relative py-1 text-sm transition-colors duration-150 hover:text-foreground ${
                  activeSection === item.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-brand transition-all duration-300 ease-out ${
                    activeSection === item.id ? "w-full" : "w-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t("nav.switchLanguage")}
            className="inline-flex h-9 items-center justify-center rounded-md border border-border px-3 font-mono text-xs text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-foreground"
          >
            {language === "es" ? "EN" : "ES"}
          </button>

          <ThemeToggle label={t("nav.switchTheme")} />

          {/* Secundario a propósito: la acción primaria en violeta vive en el
              hero y en contacto, para que no compitan dos CTA idénticos. */}
          <a
            href={CV_PATH[language]}
            download
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3.5 text-sm text-foreground transition-colors duration-150 hover:border-border-strong"
          >
            <ArrowDownToLine className="h-4 w-4" />
            {t("nav.downloadCV")}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle label={t("nav.switchTheme")} />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={t("nav.menu")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors duration-150 hover:border-border-strong"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="px-6 py-2">
            {navItems.map((item) => (
              <li key={item.id} className="border-b border-border last:border-0">
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3.5 text-sm transition-colors duration-150 ${
                    activeSection === item.id ? "text-brand" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 px-6 pb-6 pt-2">
            <a
              href={CV_PATH[language]}
              download
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-brand-solid px-4 text-sm font-medium text-brand-solid-foreground"
            >
              <ArrowDownToLine className="h-4 w-4" />
              {t("nav.downloadCV")}
            </a>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t("nav.switchLanguage")}
              className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 font-mono text-xs text-muted-foreground"
            >
              {language === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
