import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Repositories from "@/components/repositories"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Experience from "@/components/experience"
import { LanguageProvider } from "@/contexts/language-context"

export default function Portfolio() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white font-cyber">
        <Navbar />

        {/* Circuit pattern background - más sutil */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23a855f7' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Repositories />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  )
}
