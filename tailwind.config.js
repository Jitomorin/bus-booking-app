/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        burtons: 'burtons',
        melodrama: 'melodrama',
        melodrama_bold: 'melodrama_bold',
        khand: 'khand',
      },
      colors: {
        bg_color: '#F0F0F0',
        dark_blue: '#2D2D34',
        pink_red: '#B97375',
      }
    },
  },
  plugins: [],
}