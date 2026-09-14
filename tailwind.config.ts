import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#030b0f",
          900: "#0a1118",
          850: "#091a2a",
          800: "#0a1b2c",
          700: "#123049",
          600: "#08244e",
        },
        coral: {
          400: "#ff955c",
          500: "#ff7e3d",
          600: "#e66727",
        },
        softblue: {
          50: "#f9fdff",
          100: "#f0f9ff",
          200: "#e8f4ff",
          300: "#e2eaee",
          500: "#317dc4",
          700: "#124697",
        },
        gold: {
          300: "#fff3d3",
          400: "#ffd978",
          500: "#feb823",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
        display: ["var(--font-work-sans)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse at 50% 30%, #123049 0%, #091a2a 70%, #030b0f 100%)",
        "gold-gradient": "linear-gradient(90deg, #ffd978 0%, #fff3d3 50%, #ffd978 100%)",
        "orange-gradient": "linear-gradient(135deg, #feb823 0%, #ff7e3d 100%)",
      },
      boxShadow: {
        "card-soft": "0 10px 30px -5px rgba(9, 26, 42, 0.05), 0 4px 10px -2px rgba(9, 26, 42, 0.02)",
        "card-hover": "0 20px 40px -10px rgba(9, 26, 42, 0.1), 0 8px 16px -4px rgba(9, 26, 42, 0.04)",
      },
      borderRadius: {
        "card": "16px",
        "pill": "80px",
      },
    },
  },
  plugins: [],
} satisfies Config;
