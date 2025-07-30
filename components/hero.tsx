"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Linkedin, Github, ArrowDown, Code, Zap, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black pt-20"
    >
      {/* Interactive cursor effect */}
      <div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transition: "all 0.1s ease-out",
        }}
      >
        <div className="w-full h-full bg-cyber-lime rounded-full opacity-50 animate-pulse" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-10 animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
          }}
        />

        {/* Floating geometric shapes with enhanced animations */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyber-lime rotate-45 animate-bounce opacity-60" />
        <div
          className="absolute top-3/4 right-1/4 w-3 h-3 border border-cyber-blue rotate-12 animate-spin opacity-40"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-8 bg-cyber-purple opacity-30 animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-4 h-4 border-2 border-cyber-lime animate-ping opacity-20" />

        {/* Animated gradient lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-purple/30 to-transparent animate-pulse" />
        <div
          className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-lime/20 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div
        className={`text-center z-10 max-w-5xl mx-auto px-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Status indicator with enhanced animation */}
        <div className="inline-flex items-center gap-2 bg-cyber-gray/50 backdrop-blur-sm border border-cyber-lime/50 rounded-full px-4 py-2 mb-8 hover:scale-105 transition-transform duration-300 cursor-pointer group">
          <div className="w-2 h-2 bg-cyber-lime rounded-full animate-pulse group-hover:animate-ping" />
          <span className="text-cyber-lime text-sm font-medium">{t("hero.available")}</span>
        </div>

        {/* Location with animation */}
        <div
          className={`flex items-center justify-center gap-2 mb-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <MapPin className="h-4 w-4 text-cyber-blue animate-bounce" style={{ animationDelay: "2s" }} />
          <span className="text-gray-300 text-sm">{t("hero.location")}</span>
        </div>

        {/* Main heading with improved gradients */}
        <div className="mb-8">
          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-black mb-2 leading-tight transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="bg-gradient-to-r from-white via-white via-cyber-blue to-cyber-purple bg-clip-text text-transparent hover:scale-95 transition-transform duration-300 inline-block cursor-pointer">
              Luis Miguel
            </span>
          </h1>
          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <span className="bg-gradient-to-r from-white via-cyber-lime via-white to-cyber-blue bg-clip-text text-transparent hover:scale-95 transition-transform duration-300 inline-block cursor-pointer">
              Alfonzo Roca
            </span>
          </h1>

          {/* Animated underline */}
          <div
            className={`flex justify-center mb-8 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
          >
            <div className="h-1 w-32 bg-gradient-to-r from-cyber-purple via-cyber-lime to-cyber-blue animate-pulse shadow-neon-purple hover:w-48 transition-all duration-500" />
          </div>
        </div>

        {/* Role and description with enhanced animations */}
        <div
          className={`mb-12 transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-4 group">
            <Code className="h-6 w-6 text-cyber-lime animate-pulse group-hover:animate-spin transition-all duration-300" />
            <h2 className="text-2xl md:text-4xl font-bold text-white hover:text-cyber-lime transition-colors duration-300">
              {t("hero.role")}
            </h2>
            <Zap className="h-6 w-6 text-cyber-blue animate-pulse group-hover:animate-bounce transition-all duration-300" />
          </div>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4 hover:text-white transition-colors duration-300">
            {t("hero.description1")}
          </p>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{t("hero.description2")}</p>
        </div>

        {/* CTA Buttons with enhanced animations */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-1100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Button className="bg-cyber-purple hover:bg-cyber-purple-glow text-white px-8 py-4 text-lg font-semibold shadow-neon-purple hover:shadow-neon-purple transition-all duration-300 border border-cyber-purple hover:border-cyber-purple-glow group hover:scale-110">
            <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            {t("hero.downloadCV")}
          </Button>

          <Button
            variant="outline"
            className="border-cyber-lime text-cyber-lime hover:bg-cyber-lime hover:text-black px-8 py-4 text-lg font-semibold shadow-neon-lime hover:shadow-neon-lime transition-all duration-300 bg-transparent group hover:scale-110"
            onClick={() =>
              window.open("https://www.linkedin.com/in/luis-miguel-alfonzo-roca-software-enginer/", "_blank")
            }
          >
            <Linkedin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            LinkedIn
          </Button>

          <Button
            variant="outline"
            className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black px-8 py-4 text-lg font-semibold shadow-neon-blue hover:shadow-neon-blue transition-all duration-300 bg-transparent group hover:scale-110"
            onClick={() => window.open("https://github.com/LuisRocca", "_blank")}
          >
            <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            GitHub
          </Button>
        </div>

        {/* Scroll indicator with enhanced animation */}
        <div
          className={`animate-bounce transition-all duration-1000 delay-1300 ${isVisible ? "opacity-100" : "opacity-0"} hover:scale-110 cursor-pointer`}
        >
          <ArrowDown className="h-6 w-6 text-cyber-lime mx-auto opacity-70 hover:opacity-100 transition-opacity" />
          <p className="text-sm text-gray-400 mt-2 hover:text-white transition-colors">{t("hero.scrollExplore")}</p>
        </div>
      </div>

      {/* Enhanced floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyber-purple rounded-full opacity-30 animate-pulse hover:opacity-60 transition-opacity"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </section>
  )
}
