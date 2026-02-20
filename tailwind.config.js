/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00f5ff',
        'neon-violet': '#bf00ff',
        'neon-blue': '#0066ff',
        'deep-space': '#02010a',
        'cosmic-purple': '#1a0533',
        'star-white': '#e8f4fd',
      },
      fontFamily: {
        'display': ['"Orbitron"', 'monospace'],
        'mono': ['"Share Tech Mono"', 'monospace'],
        'body': ['"Exo 2"', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'border-glow': 'borderGlow 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff33' },
          '50%': { boxShadow: '0 0 40px #00f5ff, 0 0 80px #00f5ff66, 0 0 100px #00f5ff22' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: '#00f5ff' },
          '50%': { borderColor: '#bf00ff' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
