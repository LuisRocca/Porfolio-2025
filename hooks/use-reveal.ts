"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Marca un elemento como visible la primera vez que entra en viewport.
 * Se combina con las clases `reveal` / `reveal-visible` de globals.css:
 * el estado inicial es CSS, así que no parpadea antes de la hidratación.
 *
 * El estado oculto vive en CSS, así que si el observer no llegara a entregar
 * nada el contenido quedaría invisible. Para que eso no pueda pasar se
 * cronometra la primera entrega: un IntersectionObserver operativo siempre
 * entrega una entrada inicial, intersecte o no. Si en 1,5 s no llegó ninguna
 * (pestaña en segundo plano, navegador sin soporte real), se muestra igual.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.05) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Sin IntersectionObserver no se crea el observer y `delivered` se queda
    // en false, así que el temporizador de seguridad revela igualmente. Se
    // resuelve por ahí en vez de con un setState suelto dentro del efecto.
    const supported = typeof IntersectionObserver !== "undefined"
    let delivered = false
    let observer: IntersectionObserver | null = null

    if (supported) {
      observer = new IntersectionObserver(
        (entries) => {
          delivered = true
          if (entries.some((entry) => entry.isIntersecting)) {
            setIsVisible(true)
            observer?.disconnect()
          }
        },
        { threshold, rootMargin: "0px 0px -10% 0px" },
      )
      observer.observe(element)
    }

    const fallback = window.setTimeout(
      () => {
        if (!delivered) setIsVisible(true)
      },
      supported ? 1500 : 0,
    )

    return () => {
      window.clearTimeout(fallback)
      observer?.disconnect()
    }
  }, [threshold])

  return { ref, isVisible }
}
