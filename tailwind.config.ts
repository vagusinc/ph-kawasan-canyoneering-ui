import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        garet: ["Garet", "sans-serif"],
        "garet-heavy": ["Garet-Heavy", "sans-serif"],
        "sofija-italic": ["Sofija-Italic", "sans-serif"],
        rushink: ["Rushink", "sans-serif"],
        sans: [
          'Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          'Apple Color Emoji"',
          'Segoe UI Emoji"',
          'Segoe UI Symbol"',
          'Noto Color Emoji"',
        ],
      },
      colors: {
        primary: "#C26DBC",
        "primary-100": "#F5E7F4",
        "primary-200": "#EBCEE9",
        "primary-300": "#ECE6F0",
        "primary-600": "#9E4297",
        neutral: "#908B8B",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
