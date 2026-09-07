import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Impact from "@/components/impact"
import Skills from "@/components/skills"
import AiWorkflow from "@/components/ai-workflow"
import Projects from "@/components/projects"
import Repositories from "@/components/repositories"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"

export default function Portfolio() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Impact />
        <Skills />
        <AiWorkflow />
        <Projects />
        <Repositories />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
