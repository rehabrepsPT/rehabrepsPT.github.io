/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts}",
    "./src/**/*.{vue,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'rr-yellow': '#ffe400',
        'rr-black': '#000000',
        'background-light': 'rgb(248,249,250)',
        // Dark mode colors
        'dark': {
          'bg': '#1a1a1a',          // Main dark charcoal
          'surface': '#242424',      // Slightly lighter for cards/surfaces
          'border': '#333333',       // Borders and dividers
          'text': '#f5f5f5',        // Primary text
          'text-secondary': '#b0b0b0', // Secondary text
          'gradient-start': '#1a1a1a',
          'gradient-mid': '#2d2d2d',
          'gradient-end': '#404040',
        }
      },
      fontFamily: {
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      fontWeight: {
        'light': '300',
        'regular': '400', 
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800'
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)',
        'dark-gradient-subtle': 'linear-gradient(135deg, #242424 0%, #2d2d2d 100%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}