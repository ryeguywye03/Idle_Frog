module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', './app.html'],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // add more themes as needed
  },
}
