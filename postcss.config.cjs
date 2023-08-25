const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

// The order of plugins matters, for example:
// Some plugins, like tailwindcss/nesting, need to run before Tailwind,
// But others, like autoprefixer, need to run after,

const config = {
  plugins: [
    require('tailwindcss/nesting'),
    tailwindcss(),
    autoprefixer,
  ],
};

module.exports = config;
