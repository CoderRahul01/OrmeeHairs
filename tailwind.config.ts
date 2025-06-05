import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-background',
    'bg-background-secondary',
    'text-text-primary',
    'text-text-secondary',
    'bg-accent-gold',
    'bg-accent-rose',
    'text-white',
    'hover:bg-accent-gold/90',
    'hover:bg-accent-rose/90',
    'border-accent-gold',
    'hover:bg-accent-gold/10',
  ],
  theme: {
    extend: {
      colors: {
        // Main backgrounds
        background: {
          DEFAULT: "#FFFBF5", // Warm Cream
          secondary: "#FFFFFF", // Soft White
        },
        // Accents and CTAs
        accent: {
          gold: "#B08D57", // Muted Gold
          rose: "#D9AFA4", // Rose Gold
        },
        // Text colors
        text: {
          primary: "#4A3B32", // Deep Brown
          secondary: "#333333", // Charcoal Grey
        },
        // Direct color mapping for RGB variables
        foreground: "rgb(var(--foreground-rgb))",
        "accent-gold": "rgb(var(--accent-gold-rgb))",
        "accent-rose": "rgb(var(--accent-rose-rgb))",
      },
      fontFamily: {
        heading: ["var(--font-playfair-display)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderColor: {
        DEFAULT: "rgb(var(--accent-gold-rgb) / 0.1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animate"),
  ],
}

export default config 