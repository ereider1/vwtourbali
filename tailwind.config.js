/** @type {import("tailwindcss").Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f5ff",
          100: "#e0ebff",
          500: "#4f46e5",
          600: "#4338ca",
          700: "#3730a3",
          900: "#1e1b4b",
        },
        secondary: {
          400: "#f59e0b",
          500: "#f97316",
          600: "#ea580c",
        },
        accent: {
          50: "#fdf2f8",
          500: "#ec4899",
          600: "#db2777",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system"],
        serif: ["var(--font-serif)"],
      },
      spacing: {
        "safe-top": "var(--safe-area-inset-top)",
        "safe-bottom": "var(--safe-area-inset-bottom)",
        "safe-left": "var(--safe-area-inset-left)",
        "safe-right": "var(--safe-area-inset-right)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        "elevation-1": "0 2px 4px rgba(0, 0, 0, 0.1)",
        "elevation-2": "0 4px 8px rgba(0, 0, 0, 0.15)",
        "elevation-3": "0 8px 16px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};

module.exports = config;
