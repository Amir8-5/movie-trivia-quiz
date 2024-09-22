/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        tan : '#CBAC88',
        outerspace : '#394648',
        asparagus : '#69995D',
        melon : '#EDB6A3',
        lavender : '#F8E9E9'
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

