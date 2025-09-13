/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sophisticated Navy Primary
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Warm Copper Accent
        copper: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#b08d57',
          600: '#a67c47',
          700: '#8b6914',
          800: '#723f13',
          900: '#633312',
          950: '#341a09',
        },
        // Premium Neutrals
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        // Sophisticated neutral palette
        neutral: {
          0: '#ffffff',
          25: '#fcfcfc',
          50: '#f9f9f9',
          75: '#f6f6f6',
          100: '#f3f3f3',
          150: '#eeeeee',
          200: '#e8e8e8',
          250: '#e0e0e0',
          300: '#d6d6d6',
          350: '#cccccc',
          400: '#b8b8b8',
          450: '#a8a8a8',
          500: '#888888',
          550: '#777777',
          600: '#666666',
          650: '#555555',
          700: '#444444',
          750: '#383838',
          800: '#2c2c2c',
          850: '#1f1f1f',
          900: '#171717',
          925: '#141414',
          950: '#0f0f0f',
          975: '#0a0a0a',
        },
        // Premium gradient stops
        gradient: {
          'from': '#667eea',
          'via': '#764ba2',
          'to': '#f093fb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'gradient-x': 'gradientX 15s ease infinite',
        'gradient-y': 'gradientY 15s ease infinite',
        'gradient-xy': 'gradientXY 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.4)' },
          '100%': { boxShadow: '0 0 60px rgba(14, 165, 233, 0.8)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        gradientX: {
          '0%, 100%': { transform: 'translateX(-50%)' },
          '50%': { transform: 'translateX(50%)' },
        },
        gradientY: {
          '0%, 100%': { transform: 'translateY(-50%)' },
          '50%': { transform: 'translateY(50%)' },
        },
        gradientXY: {
          '0%, 100%': { transform: 'translate(-50%, -50%)' },
          '25%': { transform: 'translate(50%, -50%)' },
          '50%': { transform: 'translate(50%, 50%)' },
          '75%': { transform: 'translate(-50%, 50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.1)',
        'ultra': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}