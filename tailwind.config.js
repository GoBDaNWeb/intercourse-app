module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif']
      },
      backgroundImage: {
        'Login-bg': "url('/LoginBG.jpg')",
      }
    },
  },
  plugins: [],
}