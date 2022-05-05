module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        accent: 'var(--color-bg-accent)',
        disable: 'var(--color-bg-disable)',
        select: 'var(--color-bg-select)',
      },
      textColor: {
        accent: 'var(--color-text-accent)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif']
      },
      backgroundImage: {
        'Login-bg': "url('/LoginBG.jpg')",
      },
      boxShadow: {
        'custom': '0px 4px 6px 0px rgba(34, 60, 80, 0.49)',
        'custom-gor': '4px 0px 6px 0px rgba(34, 60, 80, 0.5)'
      },
      colors: {
      
      }
    }
  },
  plugins: [],
}