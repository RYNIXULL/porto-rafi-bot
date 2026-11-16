/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#02040a',
          900: '#050914',
          850: '#090f24',
          800: '#0d1636',
          700: '#14224f',
        },
        cosmic: {
          blue: '#2c67ed',
          light: '#5388ff',
          cyan: '#00e5ff',
          neon: '#38bdf8',
          glow: 'rgba(44, 103, 237, 0.5)',
          purple: '#7c3aed',
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(44, 103, 237, 0.4)',
        'glow-md': '0 0 25px rgba(44, 103, 237, 0.55)',
        'glow-lg': '0 0 45px rgba(44, 103, 237, 0.7)',
        'glow-cyan': '0 0 25px rgba(0, 229, 255, 0.5)',
        'navbar-glow': '0 10px 30px -5px rgba(44, 103, 237, 0.45), 0 0 15px rgba(44, 103, 237, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spinReverse 25s linear infinite',
        'meteor': 'meteor 5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}

