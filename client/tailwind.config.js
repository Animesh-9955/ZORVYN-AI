/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zorvyn: {
          bg: '#080B16',
          surface: '#111629',
          'surface-light': '#1A223E',
          'surface-card': '#0E1428',
          primary: '#8B5CF6',
          'primary-hover': '#7C3AED',
          secondary: '#6366F1',
          'secondary-hover': '#4F46E5',
          accent: '#A855F7',
          cyan: '#06B6D4',
          text: '#F8FAFC',
          muted: '#94A3B8',
          border: 'rgba(139, 92, 246, 0.18)',
          'border-subtle': 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 35px -5px rgba(139, 92, 246, 0.35)',
        'glow-secondary': '0 0 35px -5px rgba(99, 102, 241, 0.35)',
        'glow-subtle': '0 0 20px -3px rgba(139, 92, 246, 0.2)',
        'glass-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-cycle': 'glowCycle 8s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowCycle: {
          '0%': { opacity: '0.4', transform: 'scale(1)' },
          '100%': { opacity: '0.7', transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
