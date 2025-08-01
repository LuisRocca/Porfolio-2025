"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Linkedin, Phone, MapPin, Send, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Contact() {
  const { t } = useLanguage()
  
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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
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
      } else {
        setSubmitStatus("error")
        setTimeout(() => {
          setSubmitStatus("idle")
        }, 3000)
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus("error")
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="contact" className="py-20 px-6 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-cyber-blue">{t("contact.title")}</h2>
          <div className="h-1 w-24 bg-cyber-lime mx-auto" />
          <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            {t("contact.subtitle")}
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
                  <h4 className="font-bold text-white">{t("contact.phone")}</h4>
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
                <h4 className="font-bold text-white">{t("contact.availability")}</h4>
              </div>
              <p className="text-gray-200 text-sm mb-2">{t("contact.schedule")}</p>
              <p className="text-gray-200 text-sm">{t("contact.response")}</p>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-cyber-gray/60 backdrop-blur-sm border border-cyber-purple/50 rounded-lg p-8 shadow-cyber-card">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Send className="h-6 w-6 text-cyber-purple" />
                {t("contact.formTitle")}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">{t("contact.name")} *</label>
                    <Input
                      required
                      placeholder={t("contact.namePlaceholder")}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-cyber-darker/80 border-cyber-purple/60 text-white placeholder-gray-400 focus:border-cyber-purple focus:ring-cyber-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">{t("contact.email")} *</label>
                    <Input
                      type="email"
                      required
                      placeholder={t("contact.emailPlaceholder")}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-cyber-darker/80 border-cyber-purple/60 text-white placeholder-gray-400 focus:border-cyber-purple focus:ring-cyber-purple"
                    />
                  </div>
                </div>

                {/* Contact & Company Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">{t("contact.phone")}</label>
                    <Input
                      placeholder={t("contact.phonePlaceholder")}
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-cyber-darker/80 border-cyber-purple/60 text-white placeholder-gray-400 focus:border-cyber-purple focus:ring-cyber-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">{t("contact.company")}</label>
                    <Input
                      placeholder={t("contact.companyPlaceholder")}
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="bg-cyber-darker/80 border-cyber-purple/60 text-white placeholder-gray-400 focus:border-cyber-purple focus:ring-cyber-purple"
                    />
                  </div>
                </div>

                {/* Project Details Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">{t("contact.projectType")} *</label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => handleInputChange("projectType", value)}
                    >
                      <SelectTrigger className="bg-cyber-darker/80 border-cyber-purple/60 text-white">
                        <SelectValue placeholder={t("contact.projectTypePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darker border-cyber-purple/60">
                        <SelectItem value="web-app">{t("contact.projectType.web-app")}</SelectItem>
                        <SelectItem value="mobile-app">{t("contact.projectType.mobile-app")}</SelectItem>
                        <SelectItem value="ecommerce">{t("contact.projectType.ecommerce")}</SelectItem>
                        <SelectItem value="dashboard">{t("contact.projectType.dashboard")}</SelectItem>
                        <SelectItem value="api">{t("contact.projectType.api")}</SelectItem>
                        <SelectItem value="maintenance">{t("contact.projectType.maintenance")}</SelectItem>
                        <SelectItem value="consulting">{t("contact.projectType.consulting")}</SelectItem>
                        <SelectItem value="other">{t("contact.projectType.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">{t("contact.budget")}</label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="bg-cyber-darker/80 border-cyber-purple/60 text-white">
                        <SelectValue placeholder={t("contact.budgetPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-darker border-cyber-purple/60">
                        <SelectItem value="under-5k">{t("contact.budget.under-5k")}</SelectItem>
                        <SelectItem value="5k-15k">{t("contact.budget.5k-15k")}</SelectItem>
                        <SelectItem value="15k-30k">{t("contact.budget.15k-30k")}</SelectItem>
                        <SelectItem value="30k-50k">{t("contact.budget.30k-50k")}</SelectItem>
                        <SelectItem value="over-50k">{t("contact.budget.over-50k")}</SelectItem>
                        <SelectItem value="discuss">{t("contact.budget.discuss")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">{t("contact.timeline")}</label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                    <SelectTrigger className="bg-cyber-darker/80 border-cyber-purple/60 text-white">
                      <SelectValue placeholder={t("contact.timelinePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-darker border-cyber-purple/60">
                      <SelectItem value="asap">{t("contact.timeline.asap")}</SelectItem>
                      <SelectItem value="1-month">{t("contact.timeline.1-month")}</SelectItem>
                      <SelectItem value="2-3-months">{t("contact.timeline.2-3-months")}</SelectItem>
                      <SelectItem value="3-6-months">{t("contact.timeline.3-6-months")}</SelectItem>
                      <SelectItem value="flexible">{t("contact.timeline.flexible")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">{t("contact.message")} *</label>
                  <Textarea
                    required
                    placeholder={t("contact.messagePlaceholder")}
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
                    {t("contact.newsletter")}
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4 pb-4">
                  {submitStatus === "success" ? (
                    <div className="flex items-center justify-center gap-3 p-4 bg-cyber-lime/20 border border-cyber-lime/50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-cyber-lime" />
                      <span className="text-cyber-lime font-medium">{t("contact.success")}</span>
                    </div>
                  ) : submitStatus === "error" ? (
                    <div className="flex items-center justify-center gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-lg mb-4">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <span className="text-red-400 font-medium">{t("contact.error")}</span>
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
                        {t("contact.sending")}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Send className="h-5 w-5" />
                        {t("contact.send")}
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
