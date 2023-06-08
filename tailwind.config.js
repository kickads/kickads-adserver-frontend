/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        'kickads': '#14a8a4'
      },
      backgroundImage: {
        'mural-kickads': "url('./src/assets/images/mural-kickads.png')",
        'cloud-notfound': "url('./src/assets/images/notfound/not-found.png')"
      }
    },
    fontFamily: {
      inter: [ 'Inter var', ...defaultTheme.fontFamily.sans ],
      exo: [ 'Exo', ...defaultTheme.fontFamily.sans ]
    }
  },
  plugins: [],
};

