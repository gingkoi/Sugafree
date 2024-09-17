/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#41D2F2",
        secondary:"#C6F2FC",
        background:"#FFFFFF",
        textPrimary:"#000000",
        textSecondary:"#808080",
      },
      fontFamily:{
        merriBlack: ['Merriweather-Black', 'sans-serif'],
        inter: ["Inter",'sans-serif']
      }
    },
  },
  plugins: [],
}

