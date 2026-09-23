/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          50: '#eff8ff',
          100: '#dbeffe',
          200: '#bfe5fe',
          300: '#93d6fd',
          400: '#60bffa',
          500: '#3aa3f2',
          600: '#2684e0',
          700: '#1f6bc4',
          800: '#1f589f',
          900: '#1f4a7e',
        },
        surface: {
          bg: '#f4f7fb',
          card: '#ffffff',
          border: '#e7ebf1',
          muted: '#8993a4',
          heading: '#1c2536',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)',
      },
      borderRadius: {
        xl2: '14px',
      },
    },
  },
  plugins: [],
}
