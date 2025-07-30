"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Linkedin, Phone, MapPin, Send, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
    newsletter: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitStatus("success")

    // Reset form after success
    setTimeout(() => {
      setSubmitStatus("idle")
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
        newsletter: false,
      })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="contact" className="py-20 px-6 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-cyber-blue">Contacto</h2>
          <div className="h-1 w-24 bg-cyber-lime mx-auto" />
          <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? ¡Hablemos y hagámoslo realidad juntos!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-cyber-gray/60 backdrop-blur-sm border border-cyber-lime/50 rounded-lg p-6 shadow-cyber-card hover:shadow-neon-lime transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-cyber-lime/20 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-cyber-lime" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Email</h4>
                  <p className="text-cyber-lime">luis.rocca96@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-cyber-gray/60 backdrop-blur-sm border border-cyber-blue/50 rounded-lg p-6 shadow-cyber-card hover:shadow-neon-blue transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-cyber-blue/20 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-cyber-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Teléfono</h4>
                  <p className="text-cyber-blue">+57 319 711 07 18</p>
                </div>
              </div>
            </div>

            <div className="bg-cyber-gray/60 backdrop-blur-sm border border-cyber-purple/50 rounded-lg p-6 shadow-cyber-card hover:shadow-neon-purple transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-cyber-purple/20 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-cyber-purple" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Ubicación</h4>
                  <p className="text-cyber-purple">Bogotá, Colombia</p>
                </div>
              </div>
            </div>

            <div className="bg-cyber-gray/60 backdrop-blur-sm border border-cyber-lime/50 rounded-lg p-6 shadow-cyber-card hover:shadow-neon-lime transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-cyber-lime/20 flex items-center justify-center">
                  <Linkedin className="h-6 w-6 text-cyber-lime" />
                </div>
                <div>
                  <h4 className="font-bold text-white">LinkedIn</h4>
                  <a
                    href="https://www.linkedin.com/in/luis-miguel-alfonzo-roca-software-enginer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-lime hover:text-cyber-lime-glow transition-colors text-sm"
                  >
                    Ver perfil completo
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-cyber-gray/60 backdrop-blur-sm border border-cyber-blue/50 rounded-lg p-6 shadow-cyber-card">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-cyber-blue" />
                <h4 className="font-bold text-white">Disponibilidad</h4>
              </div>
              <p className="text-gray-200 text-sm mb-2">Lun - Vie: 8:00 AM - 6:00 PM (COT)</p>
              <p className="text-gray-200 text-sm">Respuesta típica: 2-4 horas</p>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-cyber-gray/60 backdrop-blur-sm border border-cyber-purple/50 rounded-lg p-8 shadow-cyber-card">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Send className="h-6 w-6 text-cyber-purple" />
                Cuéntame sobre tu proyecto
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Nombre completo *</label>
                    <Input
                      required
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-cyber-darker/80 border-cyber-purple/60 text-white placeholder-gray-400 focus:border-cyber-purple focus:ring-cyber-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email *</label>
                    <Input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-cyber-darker/80 border-cyber-purple/60 text-white placeholder-gray-400 focus:border-cyber-purple focus:ring-cyber-purple"
                    />
                  </div>
                </div>

                {/* Contact & Company Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Teléfono</label>
                    <Input
                      placeholder="+57 300 123 4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-cyber-darker/80 border-cyber-purple/60 text-white placeholder-gray-400 focus:border-cyber-purple focus:ring-cyber-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Empresa/Organización</label>
                    <Input
                      placeholder="Nombre de tu empresa"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="bg-cyber-darker/80 border-cyber-purple/60 text-white placeholder-gray-400 focus:border-cyber-purple focus:ring-cyber-purple"
                    />
                  </div>
                </div>

                {/* Project Details Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Tipo de proyecto *</label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => handleInputChange("projectType", value)}
                    >
                      <SelectTrigger className="bg-cyber-darker/80 border-cyber-purple/60 text-white">
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darker border-cyber-purple/60">
                        <SelectItem value="web-app">Aplicación Web</SelectItem>
                        <SelectItem value="mobile-app">Aplicación Móvil</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="dashboard">Dashboard/Analytics</SelectItem>
                        <SelectItem value="api">API/Backend</SelectItem>
                        <SelectItem value="maintenance">Mantenimiento</SelectItem>
                        <SelectItem value="consulting">Consultoría</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Presupuesto estimado</label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="bg-cyber-darker/80 border-cyber-purple/60 text-white">
                        <SelectValue placeholder="Rango de presupuesto" />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darker border-cyber-purple/60">
                        <SelectItem value="under-5k">Menos de $5,000 USD</SelectItem>
                        <SelectItem value="5k-15k">$5,000 - $15,000 USD</SelectItem>
                        <SelectItem value="15k-30k">$15,000 - $30,000 USD</SelectItem>
                        <SelectItem value="30k-50k">$30,000 - $50,000 USD</SelectItem>
                        <SelectItem value="over-50k">Más de $50,000 USD</SelectItem>
                        <SelectItem value="discuss">Prefiero discutirlo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Timeline del proyecto</label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                    <SelectTrigger className="bg-cyber-darker/80 border-cyber-purple/60 text-white">
                      <SelectValue placeholder="¿Cuándo necesitas el proyecto?" />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darker border-cyber-purple/60">
                      <SelectItem value="asap">Lo antes posible</SelectItem>
                      <SelectItem value="1-month">En 1 mes</SelectItem>
                      <SelectItem value="2-3-months">En 2-3 meses</SelectItem>
                      <SelectItem value="3-6-months">En 3-6 meses</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Descripción del proyecto *</label>
                  <Textarea
                    required
                    placeholder="Cuéntame más detalles sobre tu proyecto, objetivos, funcionalidades requeridas, etc."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="bg-cyber-darker/80 border-cyber-purple/60 text-white placeholder-gray-400 focus:border-cyber-purple focus:ring-cyber-purple resize-none"
                  />
                </div>

                {/* Newsletter Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                    className="border-cyber-purple/60 data-[state=checked]:bg-cyber-purple"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-300">
                    Quiero recibir actualizaciones sobre nuevos proyectos y tecnologías
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  {submitStatus === "success" ? (
                    <div className="flex items-center justify-center gap-3 p-4 bg-cyber-lime/20 border border-cyber-lime/50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-cyber-lime" />
                      <span className="text-cyber-lime font-medium">¡Mensaje enviado exitosamente!</span>
                    </div>
                  ) : submitStatus === "error" ? (
                    <div className="flex items-center justify-center gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-lg mb-4">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <span className="text-red-400 font-medium">Error al enviar. Inténtalo de nuevo.</span>
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={isSubmitting || submitStatus === "success"}
                    className="w-full bg-cyber-purple hover:bg-cyber-purple-glow text-white py-4 text-lg font-semibold shadow-neon-purple hover:shadow-neon-purple transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando mensaje...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Send className="h-5 w-5" />
                        Enviar mensaje
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
