"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Download, Github, Linkedin, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { name: t("nav.home"), href: "#hero" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.experience"), href: "#experience" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, []) // Removed navItems from the dependency array

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/95 backdrop-blur-md border-b border-cyber-purple/30 shadow-cyber-glow" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo with animation */}
          <div className="flex items-center">
            <div className="text-2xl font-black bg-gradient-to-r from-cyber-purple to-cyber-lime bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 cursor-pointer">
              LMA
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-white hover:text-cyber-lime transition-all duration-300 font-medium relative group ${
                  activeSection === item.href.substring(1) ? "text-cyber-lime" : ""
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-cyber-lime transition-all duration-300 ${
                    activeSection === item.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleLanguage}
              className="text-cyber-lime hover:text-cyber-lime-glow hover:bg-cyber-lime/10 hover:scale-110 transition-all duration-300 flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-bold">{language.toUpperCase()}</span>
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="text-cyber-blue hover:text-cyber-blue-glow hover:bg-cyber-blue/10 hover:scale-110 transition-all duration-300"
              onClick={() => window.open("https://github.com/LuisRocca", "_blank")}
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-cyber-blue hover:text-cyber-blue-glow hover:bg-cyber-blue/10 hover:scale-110 transition-all duration-300"
              onClick={() =>
                window.open("https://www.linkedin.com/in/luis-miguel-alfonzo-roca-software-enginer/", "_blank")
              }
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="bg-cyber-purple hover:bg-cyber-purple-glow text-white shadow-neon-purple hover:shadow-neon-purple transition-all duration-300 hover:scale-110"
            >
              <Download className="h-4 w-4 mr-2" />
              {t("nav.downloadCV")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-cyber-lime hover:scale-110 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black/98 backdrop-blur-md border-b border-cyber-purple/30 shadow-cyber-glow animate-in slide-in-from-top duration-300">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left text-white hover:text-cyber-lime transition-colors duration-200 font-medium py-2 ${
                    activeSection === item.href.substring(1) ? "text-cyber-lime" : ""
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-cyber-purple/20 flex flex-col space-y-3">
                {/* Mobile Language Toggle */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="text-cyber-lime hover:text-cyber-lime-glow justify-start flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === "es" ? "English" : "Español"}</span>
                </Button>

                <Button
                  size="sm"
                  className="bg-cyber-purple hover:bg-cyber-purple-glow text-white shadow-neon-purple justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t("nav.downloadCV")}
                </Button>
                <div className="flex space-x-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-cyber-blue hover:text-cyber-blue-glow"
                    onClick={() => window.open("https://github.com/LuisRocca", "_blank")}
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-cyber-blue hover:text-cyber-blue-glow"
                    onClick={() =>
                      window.open("https://www.linkedin.com/in/luis-miguel-alfonzo-roca-software-enginer/", "_blank")
                    }
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
