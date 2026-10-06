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
        romantic: {
          bg: '#0B0710',
          'bg-light': '#FAF3F6',
          burgundy: {
            DEFAULT: '#5C1030',
            dark: '#2E0A18',
            deep: '#1C060F',
            light: '#7A1B40',
            glow: '#9E2454'
          },
          rose: {
            DEFAULT: '#E8A6C1',
            bright: '#FF6FA5',
            muted: '#C9A8B6',
            soft: '#F5D5E2',
            deep: '#B85D83'
          },
          gold: {
            DEFAULT: '#D4AF8C',
            light: '#F3E5AB',
            dark: '#B08866',
            shimmer: '#FFE8B8'
          },
          text: {
            DEFAULT: '#F5E9EE',
            muted: '#C9A8B6',
            dim: '#8E7382',
            dark: '#3D1828',
            'dark-muted': '#6B4054'
          },
          dusk: {
            bg: '#FAF3F6',
            card: 'rgba(255, 255, 255, 0.72)',
            cardHover: 'rgba(255, 255, 255, 0.88)',
            border: '#E8D5DF',
            text: '#3D1828',
            muted: '#7A4D62',
            burgundy: '#6E1B3D'
          }
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
        bengali: ['"Noto Serif Bengali"', 'Hind Siliguri', '"Cormorant Garamond"', 'serif']
      },
      boxShadow: {
        'glow-rose': '0 0 35px -5px rgba(255, 111, 165, 0.35)',
        'glow-burgundy': '0 0 45px -10px rgba(122, 27, 64, 0.45)',
        'glow-gold': '0 0 30px -5px rgba(212, 175, 140, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(232, 166, 193, 0.25)',
        'glass-dusk': '0 8px 24px -4px rgba(110, 27, 61, 0.08)'
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'heartbeat': 'heartbeat 2s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(24px)' },
          '50%': { opacity: '0.9', filter: 'blur(32px)' }
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' }
        }
      }
    }
  },
  plugins: [],
}
