import type { Config } from "tailwindcss";
import { blackA } from "@radix-ui/colors";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      aspectRatio: {
        'w-16': '16',
        'h-9': '9',
      },
      colors: {
        ...blackA,
        border: "hsl(342, 60%, 40%)", // Changed from blue to maroon
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          400: "#60a5fa", // blue-400 equivalent 
          500: "#3b82f6", // blue-500 equivalent
          600: "#2563eb", // blue-600 equivalent
          700: "#1d4ed8", // blue-700 equivalent
          800: "#1e40af", // blue-800 equivalent
          900: "#1e3a8a", // blue-900 equivalent
        },
        lavender: {
          300: "#d8b4fe", // Light lavender
          400: "#c084fc", // Medium-light lavender
          500: "#a855f7", // Medium lavender
          600: "#9333ea", // Medium-dark lavender
          700: "#7e22ce", // Dark lavender
        },
        gold: {
          300: "#fcd34d", // Light gold
          400: "#fbbf24", // Medium-light gold
          500: "#f59e0b", // Medium gold
          600: "#d97706", // Medium-dark gold
          700: "#b45309", // Dark gold
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.97)" },
          "50%": { opacity: "0.5", transform: "scale(1.02)" },
        },
        "pulse-very-slow": {
          "0%, 100%": { opacity: "0.1", transform: "scale(0.98)" },
          "50%": { opacity: "0.4", transform: "scale(1.03)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-very-slow": "pulse-very-slow 7s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "zoom-in": "zoom-in 0.3s ease-out",
        "bounce-subtle": "bounce-subtle 1.5s infinite",
        "float": "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      backgroundImage: {
        'gold-lavender-gradient': 'linear-gradient(to right, #fbbf24, #c084fc)',
        'lavender-gold-gradient': 'linear-gradient(to right, #a855f7, #f59e0b)',
        'student-hero-gradient': 'linear-gradient(135deg, #f59e0b15, #a855f715)',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/aspect-ratio')],
} satisfies Config;

export default config;
