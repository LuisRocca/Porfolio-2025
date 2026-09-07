"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useReveal } from "@/hooks/use-reveal"
import { PROJECTS } from "@/lib/profile"

/** Tiempo entre páginas. Por debajo de ~5 s no da tiempo a leer una tarjeta. */
const AUTOPLAY_MS = 6500

export default function Projects() {
  const { t } = useLanguage()
  const { ref, isVisible } = useReveal<HTMLElement>()

  // Embla anima con requestAnimationFrame, que el media query de CSS no puede
  // desactivar: hay que leerlo aquí. Además apaga el avance automático, que es
  // movimiento no solicitado.
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  // Dos tarjetas completas por vista y avance de dos en dos, para que pase de
  // página en vez de deslizar de una en una. En móvil cabe una.
  // Sin `loop`: el bucle de Embla clona diapositivas y las recoloca, y con
  // sólo cuatro tarjetas y dos por vista no hay suficientes para que el ciclo
  // sea estable. Al llegar al final el avance automático rebobina al inicio,
  // que además deja claro que la lista se terminó.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    duration: reduceMotion ? 0 : 22,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
    },
  })

  const [snapCount, setSnapCount] = useState(0)
  const [selected, setSelected] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const sync = () => {
      setSnapCount(emblaApi.scrollSnapList().length)
      onSelect()
    }
    sync()
    emblaApi.on("select", onSelect).on("reInit", sync)
    return () => {
      emblaApi.off("select", onSelect).off("reInit", sync)
    }
  }, [emblaApi, onSelect])

  // Arrastrar equivale a tomar el control: el avance automático no vuelve solo.
  useEffect(() => {
    if (!emblaApi) return
    const stop = () => setIsPlaying(false)
    emblaApi.on("pointerDown", stop)
    return () => {
      emblaApi.off("pointerDown", stop)
    }
  }, [emblaApi])

  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!emblaApi || !isPlaying || isPaused || reduceMotion) return

    timer.current = window.setInterval(() => {
      if (emblaApi.canScrollNext()) emblaApi.scrollNext()
      else emblaApi.scrollTo(0)
    }, AUTOPLAY_MS)
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [emblaApi, isPlaying, isPaused, reduceMotion])

  const takeControl = (scroll: () => void) => {
    setIsPlaying(false)
    scroll()
  }

  return (
    <section ref={ref} id="work" className="scroll-mt-20 border-t border-border py-20 md:py-28">
      <div className={`reveal ${isVisible ? "reveal-visible" : ""}`}>
        <div className="mx-auto max-w-content px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{t("projects.eyebrow")}</p>
              <h2 className="section-title mt-3">{t("projects.title")}</h2>
            </div>

            <div className="flex items-center gap-2">
              {/*
                WCAG 2.2.2 exige poder detener cualquier contenido que se mueva
                solo más de cinco segundos. Pausar al pasar el ratón y al
                enfocar cubre ratón y teclado, pero no el táctil: por eso el
                control es visible y no sólo un gesto.
              */}
              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => setIsPlaying((playing) => !playing)}
                  aria-label={isPlaying ? t("projects.pause") : t("projects.play")}
                  className="mr-1 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-foreground"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>
              )}

              <button
                type="button"
                onClick={() => takeControl(() => emblaApi?.scrollPrev())}
                disabled={!canScrollPrev}
                aria-label={t("projects.previous")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors duration-150 hover:border-border-strong disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => takeControl(() => emblaApi?.scrollNext())}
                disabled={!canScrollNext}
                aria-label={t("projects.next")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors duration-150 hover:border-border-strong disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("projects.subtitle")}
          </p>
        </div>

        {/*
          El carril vive dentro de la misma columna que el resto de la página,
          así que la primera tarjeta alinea exactamente con el título. Se
          descartó sangrarlo a pantalla completa: exigía calcular el margen con
          `100vw`, que incluye la barra de scroll y el contenedor no, y dejaba
          la alineación desviada el ancho de esa barra.
        */}
        <div
          className="mx-auto mt-12 max-w-content px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div
            ref={emblaRef}
            className="overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label={t("projects.title")}
          >
            {/* La canaleta se hace con margen negativo en el carril y relleno
                en cada tarjeta: así `basis-1/2` da mitades exactas y ninguna
                tarjeta queda cortada. */}
            <ul className="-ml-4 flex touch-pan-y">
              {PROJECTS.map((project, index) => (
                <li
                  key={project.id}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} / ${PROJECTS.length}`}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border transition-colors duration-150 hover:border-border-strong">
                    <div className="relative aspect-[16/10] border-b border-border bg-muted">
                      <Image
                        src={project.image}
                        alt={t(`projects.${project.id}.alt`)}
                        fill
                        sizes="(max-width: 768px) 88vw, 46vw"
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <p className="font-mono text-xs text-muted-foreground">{project.host}</p>
                      <h3 className="mt-2 text-base font-medium text-foreground">
                        {t(`projects.${project.id}.title`)}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {t(`projects.${project.id}.description`)}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {project.tech.map((tech) => (
                          <li
                            key={tech}
                            className="rounded border border-border px-2 py-1 font-mono text-[0.7rem] text-muted-foreground"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline inline-flex items-center gap-1 text-sm"
                        >
                          {t("projects.visit")}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>

                        {project.codeUrl && (
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-underline inline-flex items-center gap-1 text-sm"
                          >
                            {t("projects.viewCode")}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          {/* Una marca por página, no por tarjeta: con `slidesToScroll` en 2 lo
              que avanza es la página, y contar tarjetas confundiría. */}
          {snapCount > 1 && (
            <div className="mt-8 flex items-center gap-2">
              {Array.from({ length: snapCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => takeControl(() => emblaApi?.scrollTo(index))}
                  aria-label={`${t("projects.goToPage")} ${index + 1}`}
                  aria-current={selected === index}
                  className={`h-px flex-1 transition-colors duration-300 ${
                    selected === index ? "bg-brand" : "bg-border hover:bg-border-strong"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
