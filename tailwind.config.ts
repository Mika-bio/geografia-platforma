import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0f7f2",
          100: "#dceee2",
          200: "#bbddc6",
          300: "#8ec5a3",
          400: "#5ea87c",
          500: "#3d8b5e",
          600: "#2d6f49",
          700: "#25593c",
          800: "#1f4731",
          900: "#1a3a29",
        },
        earth: {
          50: "#faf6f1",
          100: "#f0e6d8",
          200: "#e0cbb0",
          300: "#cda882",
          400: "#b8875a",
          500: "#a06f45",
          600: "#875838",
          700: "#6d4630",
          800: "#5a3b2b",
          900: "#4c3326",
        },
        sky: {
          50: "#f0f7fc",
          100: "#dcecf8",
          200: "#c0ddf2",
          300: "#94c6e8",
          400: "#61a7da",
          500: "#3d8ac6",
          600: "#2d6ea8",
          700: "#265888",
          800: "#244b71",
          900: "#233f5e",
        },
        mountain: {
          50: "#f5f6f8",
          100: "#e8eaef",
          200: "#d5d9e2",
          300: "#b7bdcc",
          400: "#939baf",
          500: "#767e96",
          600: "#60667c",
          700: "#4e5365",
          800: "#444756",
          900: "#3b3d49",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "mountain-gradient":
          "linear-gradient(180deg, #dcecf8 0%, #f0f7f2 40%, #faf6f1 100%)",
        "leaf-pattern":
          "radial-gradient(circle at 20% 80%, rgba(61,139,94,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(61,138,198,0.08) 0%, transparent 50%)",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(37, 89, 60, 0.08)",
        card: "0 8px 30px rgba(37, 89, 60, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
