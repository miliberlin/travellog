/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-gray': '#77878b',
        'dark-slate': '#305252',
        'onyx': '#373e40',
        'steel-teal': '#488286',
        'powder-blue': '#b7d5d4',
        'burnt-sienna': '#cd5334',
      },
    },
  },
  plugins: [],
}
