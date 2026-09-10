import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          DEFAULT: "#2563eb",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        ink: "#0f172a",
        muted: "#64748b",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 8px 24px -8px rgb(15 23 42 / 0.10)",
        "card-hover": "0 2px 4px 0 rgb(15 23 42 / 0.06), 0 12px 32px -8px rgb(15 23 42 / 0.16)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(60rem 32rem at 50% -12rem, rgb(219 234 254 / 0.9) 0%, rgb(219 234 254 / 0) 70%)",
        "brand-gradient": "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        "hero-dark":
          "radial-gradient(52rem 30rem at 72% -12%, rgb(59 130 246 / 0.28) 0%, transparent 60%), radial-gradient(42rem 26rem at 8% 112%, rgb(99 102 241 / 0.2) 0%, transparent 60%), linear-gradient(160deg, #020617 0%, #0f172a 55%, #172554 100%)",
        "hero-grid":
          "linear-gradient(rgb(148 163 184 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(148 163 184 / 0.08) 1px, transparent 1px)",
        "result-gradient":
          "linear-gradient(135deg, #1e40af 0%, #2563eb 55%, #4f46e5 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
