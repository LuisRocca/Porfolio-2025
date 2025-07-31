"use client"

import { Github, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="py-12 px-6 border-t border-cyber-purple/30 relative bg-cyber-darker">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-300">© 2024 Luis Miguel Alfonzo Roca. {t("footer.rights")}</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-2 text-cyber-blue hover:text-cyber-blue-glow transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>{t("footer.github")}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cyber-purple/20 text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
            {t("footer.madeWith")} <Heart className="h-4 w-4 text-cyber-purple animate-pulse" /> {t("footer.code")}
            <span className="text-cyber-lime opacity-60">• {t("footer.powered")}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
