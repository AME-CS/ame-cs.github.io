/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#08090a',
          panel: '#0f1011',
          elevated: '#191a1b',
        },
        brand: {
          indigo: '#5e6ad2',
          violet: '#7170ff',
          hover: '#828fff',
        },
        text: {
          primary: '#f7f8f8',
          secondary: '#d0d6e0',
          tertiary: '#8a8f98',
          quaternary: '#62666d',
        },
        border: {
          primary: '#23252a',
          subtle: 'rgba(255,255,255,0.05)',
          standard: 'rgba(255,255,255,0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Berkeley Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        display: '-0.022em',
        'display-lg': '-0.022em',
        'display-xl': '-0.022em',
      },
    },
  },
  plugins: [],
}
