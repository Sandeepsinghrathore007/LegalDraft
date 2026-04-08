import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "secondary-container": "#d5e0f7",
        "on-surface": "#181c1e",
        "surface-dim": "#d7dadc",
        "surface-tint": "#455f88",
        "tertiary-fixed": "#ffddba",
        background: "#f7fafc",
        "on-secondary-container": "#586377",
        "error-container": "#ffdad6",
        "on-primary-container": "#86a0cd",
        surface: "#f7fafc",
        "primary-fixed": "#d6e3ff",
        "on-secondary-fixed-variant": "#3c475a",
        "secondary-fixed": "#d8e3fa",
        "inverse-on-surface": "#eef1f3",
        "on-tertiary-fixed-variant": "#633f0f",
        "on-tertiary-container": "#c6955e",
        "primary-fixed-dim": "#adc7f7",
        "surface-container": "#ebeef0",
        outline: "#74777f",
        "tertiary-fixed-dim": "#f2bc82",
        "on-primary-fixed-variant": "#2d476f",
        tertiary: "#321b00",
        "surface-container-highest": "#e0e3e5",
        "on-background": "#181c1e",
        "on-error": "#ffffff",
        "surface-container-high": "#e5e9eb",
        "secondary-fixed-dim": "#bcc7dd",
        "on-tertiary": "#ffffff",
        error: "#ba1a1a",
        "surface-container-lowest": "#ffffff",
        "on-tertiary-fixed": "#2b1700",
        "outline-variant": "#c4c6cf",
        "inverse-primary": "#adc7f7",
        "on-primary": "#ffffff",
        "inverse-surface": "#2d3133",
        "primary-container": "#1a365d",
        "surface-bright": "#f7fafc",
        "surface-variant": "#e0e3e5",
        "surface-container-low": "#f1f4f6",
        "tertiary-container": "#4f2e00",
        "on-primary-fixed": "#001b3c",
        primary: "#002045",
        "on-surface-variant": "#43474e",
        "on-secondary-fixed": "#111c2c",
        "on-secondary": "#ffffff",
        "on-error-container": "#93000a",
        secondary: "#545f72"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"]
      },
      boxShadow: {
        editorial: "0px 20px 40px rgba(24, 28, 30, 0.06)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")]
};

export default config;
