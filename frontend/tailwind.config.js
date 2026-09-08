/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Signature Home Service Theme (Inspired by HomeServiceWebDesign.com)
        "brand-gold": "#F5A623",
        "brand-gold-hover": "#E09415",
        "brand-gold-subtle": "#FFF8EC",
        "brand-gold-light": "#FBAF2C",

        "brand-navy": "#0E4B6E",
        "brand-navy-dark": "#0A3854",
        "brand-navy-light": "#166088",
        "brand-navy-subtle": "#EAF3F8",

        "brand-dark": "#0A0D12",
        "brand-charcoal": "#121720",
        "brand-slate": "#1E293B",

        // Clean white & bright surfaces
        "surface": "#ffffff",
        "surface-alt": "#f8fafc",
        "surface-subtle": "#f1f5f9",
        "border-color": "#e2e8f0",

        // Functional
        "success": "#10b981",
        "error": "#ef4444",
      },
      fontFamily: {
        "heading": ["Rubik", "Plus Jakarta Sans", "sans-serif"],
        "display": ["Plus Jakarta Sans", "Rubik", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "gold": "0 10px 25px -4px rgba(245, 166, 35, 0.45)",
        "gold-sm": "0 4px 12px -2px rgba(245, 166, 35, 0.3)",
        "navy": "0 10px 25px -4px rgba(14, 75, 110, 0.4)",
        "soft-sm": "0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.04)",
        "soft-md": "0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)",
        "soft-lg": "0 10px 25px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04)",
        "soft-xl": "0 20px 35px -6px rgba(15, 23, 42, 0.1), 0 8px 16px -4px rgba(15, 23, 42, 0.05)",
      },
    },
  },
  plugins: [],
};
