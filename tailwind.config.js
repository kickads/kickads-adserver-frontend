/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      animation: {
        // 'spin': 'spin 3s linear infinite'
      },
      colors: {
        'kickads': '#14a8a4'
      },
      backgroundImage: {
        'mural-kickads': "url('./src/assets/images/mural-kickads.png')",
        'mural-kickads-mono': "url('./src/assets/images/mural-kickads-monochromatic.png')",
      }
    },
    fontFamily: {
      inter: [ 'Inter var', ...defaultTheme.fontFamily.sans ],
      exo: [ 'Exo', ...defaultTheme.fontFamily.sans ]
    }
  },
  plugins: [],
};

