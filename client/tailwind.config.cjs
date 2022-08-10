/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-red-500',
    'bg-red-700',
    'bg-green-500',
    'bg-green-700',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'bubble-gradient-dark': '#74c9e7',
        'bubble-gradient-mid': '#c3e7f5',
        'bubble-dark-blue': '#2E80BC',
        'bubble-yellow': '#FBCD5A'
      },
    },
  },
  fontFamily: {
    body: ['Nunito Sans', 'sans-serif']
  },
  plugins: [],
}