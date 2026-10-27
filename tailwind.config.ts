import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dvoid: {
          gold: "#C98A2B",
          blue: "#0047AB",
          dark: "#080808",
          card: "#0a0a0c",
          light: "#F4F4F0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
