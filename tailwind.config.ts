import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cyber: {
          dark: "#0f0f0f",
          darker: "#0a0a0a",
          darkest: "#050505",
          gray: "#1a1a1a",
          "gray-light": "#2d2d2d",
          "gray-medium": "#404040",
          purple: "#a855f7",
          "purple-glow": "#c084fc",
          "purple-dark": "#7c3aed",
          lime: "#84cc16",
          "lime-glow": "#a3e635",
          "lime-dark": "#65a30d",
          blue: "#3b82f6",
          "blue-glow": "#60a5fa",
          "blue-dark": "#2563eb",
          accent: "#f59e0b",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        cyber: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "neon-purple": "0 0 30px rgba(168, 85, 247, 0.4)",
        "neon-lime": "0 0 30px rgba(132, 204, 22, 0.4)",
        "neon-blue": "0 0 30px rgba(59, 130, 246, 0.4)",
        "cyber-card": "0 8px 32px rgba(0, 0, 0, 0.9)",
        "cyber-glow": "0 0 50px rgba(168, 85, 247, 0.2)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" },
          "100%": { boxShadow: "0 0 30px rgba(168, 85, 247, 0.8)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
