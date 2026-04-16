import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#06100b",
          900: "#0b1b12",
          800: "#102718",
          700: "#1b3b29",
          500: "#4f7657",
        },
        mineral: {
          50: "#f7f4ed",
          100: "#eee8da",
          200: "#ded2bd",
          300: "#c9b58f",
          500: "#9b7f49",
          700: "#5f4a2a",
        },
        ink: {
          950: "#080a09",
          900: "#111412",
          800: "#1b201d",
          700: "#2b312d",
          500: "#68706a",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      boxShadow: {
        premium:
          "0 28px 80px rgba(8, 10, 9, 0.16), 0 1px 0 rgba(255,255,255,0.12) inset",
        soft: "0 18px 50px rgba(8, 10, 9, 0.12)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(.2,.8,.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;
