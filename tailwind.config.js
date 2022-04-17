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
      },
      boxShadow: {
        'custom': '0px 4px 6px 0px rgba(34, 60, 80, 0.49)',
        'custom-gor': '4px 0px 6px 0px rgba(34, 60, 80, 0.5)'
      }
    },
  },
  plugins: [],
}