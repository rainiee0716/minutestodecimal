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
      },
    },
  },
  plugins: [],
};
export default config;
