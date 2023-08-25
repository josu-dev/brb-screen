const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      // addBase()
      // addComponents()
      addUtilities({
        '.box-dev': {
          'boxShadow': '0 0 0 1px #ff00ff'
        }
      })
    })
  ],
};

module.exports = config;
