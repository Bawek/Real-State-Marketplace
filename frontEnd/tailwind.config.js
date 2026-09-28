/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glow':    '0 0 30px rgba(37, 99, 235, 0.15)',
        'glow-lg': '0 0 60px rgba(37, 99, 235, 0.2)',
        'card':    '0 2px 16px rgba(0,0,0,0.08)',
        'card-hover': '0 10px 40px rgba(0,0,0,0.12)',
      },
      animation: {
        'gradient': 'gradient-shift 8s ease infinite',
        'float':    'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 40%, #1e1b4b 100%)',
      },
    },
  },
  plugins: [],
}