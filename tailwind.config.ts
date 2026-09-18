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
          50: "#eef8f1",
          100: "#d5eee0",
          200: "#aeddbf",
          300: "#7bc69a",
          400: "#4aad74",
          500: "#2f9159",
          600: "#247448",
          700: "#1e5c3b",
          800: "#1a4a31",
          900: "#153d29",
          950: "#0f2c1d",
        },
        earth: {
          50: "#fbf7f1",
          100: "#f3e8d8",
          200: "#e5cfb0",
          300: "#d4b084",
          400: "#c28f5c",
          500: "#ad7544",
          600: "#925c37",
          700: "#76492f",
          800: "#613d2a",
          900: "#513426",
        },
        sky: {
          50: "#eef6fc",
          100: "#d6eaf8",
          200: "#b4d8f1",
          300: "#82bfe6",
          400: "#4a9fd6",
          500: "#2f83bd",
          600: "#23689f",
          700: "#1f5481",
          800: "#1e476b",
          900: "#1e3c5a",
          950: "#152c43",
        },
        horizon: {
          50: "#fff8ed",
          100: "#ffefd4",
          200: "#ffdba8",
          300: "#ffc170",
          400: "#ff9e38",
          500: "#f97c12",
          600: "#ea6008",
          700: "#c24809",
          800: "#9a390f",
          900: "#7c3010",
        },
        mountain: {
          50: "#f4f6f8",
          100: "#e4e8ee",
          200: "#ccd3de",
          300: "#a8b3c5",
          400: "#7e8da6",
          500: "#63718c",
          600: "#4e5a73",
          700: "#40495e",
          800: "#383f50",
          900: "#323744",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "mountain-gradient":
          "linear-gradient(180deg, #cfe6f7 0%, #e8f4ec 38%, #fbf7f1 72%, #fff8ed 100%)",
        "hero-journey":
          "radial-gradient(ellipse 80% 60% at 70% 10%, rgba(74,159,214,0.28) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 15% 80%, rgba(47,145,89,0.22) 0%, transparent 50%), radial-gradient(ellipse 40% 40% at 90% 70%, rgba(249,124,18,0.12) 0%, transparent 45%)",
        "leaf-pattern":
          "radial-gradient(circle at 18% 82%, rgba(47,145,89,0.1) 0%, transparent 48%), radial-gradient(circle at 82% 18%, rgba(47,131,189,0.1) 0%, transparent 48%)",
        "card-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.55) 100%)",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(30, 92, 59, 0.08)",
        card: "0 10px 36px rgba(30, 92, 59, 0.12)",
        glow: "0 0 0 1px rgba(47,145,89,0.12), 0 12px 40px rgba(35,104,159,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
