"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useReveal } from "@/hooks/use-reveal"
import { LINKS } from "@/lib/profile"

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
  newsletter: false,
}

const projectTypes = [
  "web-app",
  "mobile-app",
  "ecommerce",
  "dashboard",
  "api",
  "maintenance",
  "consulting",
  "other",
]

const budgets = ["under-5k", "5k-15k", "15k-30k", "30k-50k", "over-50k", "discuss"]

const timelines = ["asap", "1-month", "2-3-months", "3-6-months", "flexible"]

export default function Contact() {
  const { t } = useLanguage()
  const { ref, isVisible } = useReveal<HTMLElement>()
  const [formData, setFormData] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error(`Request failed: ${response.status}`)

      setSubmitStatus("success")
      setFormData(emptyForm)
    } catch (error) {
      console.error("No se pudo enviar el mensaje:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-border px-6 py-20 md:py-28"
    >
      <div aria-hidden className="atmosphere atmosphere--quiet" />

      <div className={`relative mx-auto max-w-content reveal ${isVisible ? "reveal-visible" : ""}`}>
        <p className="eyebrow">{t("contact.eyebrow")}</p>
        <h2 className="section-title mt-3">{t("contact.title")}</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("contact.subtitle")}
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <dl className="space-y-5 text-sm">
              <div className="border-b border-border pb-5">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${LINKS.email}`} className="link-underline">
                    {LINKS.email}
                  </a>
                </dd>
              </div>

              <div className="border-b border-border pb-5">
                <dt className="text-muted-foreground">LinkedIn</dt>
                <dd className="mt-1">
                  <a
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1"
                  >
                    {t("contact.viewProfile")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </dd>
              </div>

              <div className="border-b border-border pb-5">
                <dt className="text-muted-foreground">{t("contact.phone")}</dt>
                <dd className="mt-1">
                  <a href={LINKS.phoneHref} className="link-underline">
                    {LINKS.phone}
                  </a>
                </dd>
              </div>

              <div className="border-b border-border pb-5">
                <dt className="text-muted-foreground">{t("contact.location")}</dt>
                <dd className="mt-1 text-foreground">Bogotá, Colombia (GMT-5)</dd>
              </div>

              <div>
                <dt className="text-muted-foreground">{t("contact.availability")}</dt>
                <dd className="mt-1 text-foreground">{t("contact.schedule")}</dd>
                <dd className="mt-1 text-muted-foreground">{t("contact.response")}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm text-foreground">
                    {t("contact.name")} <span className="text-muted-foreground">*</span>
                  </label>
                  <Input
                    id="name"
                    required
                    autoComplete="name"
                    placeholder={t("contact.namePlaceholder")}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm text-foreground">
                    Email <span className="text-muted-foreground">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={t("contact.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm text-foreground">
                    {t("contact.phone")}
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t("contact.phonePlaceholder")}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm text-foreground">
                    {t("contact.company")}
                  </label>
                  <Input
                    id="company"
                    autoComplete="organization"
                    placeholder={t("contact.companyPlaceholder")}
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="projectType" className="block text-sm text-foreground">
                    {t("contact.projectType")} <span className="text-muted-foreground">*</span>
                  </label>
                  <Select
                    required
                    value={formData.projectType}
                    onValueChange={(value) => handleInputChange("projectType", value)}
                  >
                    <SelectTrigger id="projectType">
                      <SelectValue placeholder={t("contact.projectTypePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {t(`contact.projectType.${type}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="block text-sm text-foreground">
                    {t("contact.budget")}
                  </label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => handleInputChange("budget", value)}
                  >
                    <SelectTrigger id="budget">
                      <SelectValue placeholder={t("contact.budgetPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {budgets.map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {t(`contact.budget.${budget}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="timeline" className="block text-sm text-foreground">
                  {t("contact.timeline")}
                </label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => handleInputChange("timeline", value)}
                >
                  <SelectTrigger id="timeline">
                    <SelectValue placeholder={t("contact.timelinePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline} value={timeline}>
                        {t(`contact.timeline.${timeline}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm text-foreground">
                  {t("contact.message")} <span className="text-muted-foreground">*</span>
                </label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  placeholder={t("contact.messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="resize-none"
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange("newsletter", checked === true)}
                  className="mt-0.5"
                />
                <label htmlFor="newsletter" className="text-sm leading-snug text-muted-foreground">
                  {t("contact.newsletter")}
                </label>
              </div>

              <div
                aria-live="polite"
                className={submitStatus === "idle" ? "sr-only" : "text-sm"}
              >
                {submitStatus === "success" && (
                  <p className="flex items-center gap-2 text-brand">
                    <CheckCircle2 className="h-4 w-4" />
                    {t("contact.success")}
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {t("contact.error")}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 bg-brand-solid px-5 text-sm font-medium text-brand-solid-foreground hover:bg-brand-solid hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("contact.sending")}
                  </>
                ) : (
                  t("contact.send")
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
