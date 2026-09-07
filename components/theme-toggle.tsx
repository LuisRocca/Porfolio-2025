"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-foreground"
    >
      {/*
        Se pintan los dos iconos y decide el CSS por la clase `dark` del
        documento. Antes hacia falta un estado `mounted` para no desajustar la
        hidratacion, y eso obligaba a llamar a setState dentro de un efecto.
      */}
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="h-4 w-4 dark:hidden" />
    </button>
  )
}
