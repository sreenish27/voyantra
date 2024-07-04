/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
      borderRadius: {
        'lg': '1.7rem',
        'custom': '1rem',
        'searchBox': '3rem',
        'subSearchBox': '2.1rem',
      },
      padding: {
        '120': '30rem',
      },
    },
  },
  plugins: [],
}

