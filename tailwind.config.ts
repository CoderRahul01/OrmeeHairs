import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
      },
      fontFamily: {
        heading: ["var(--font-playfair-display)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
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