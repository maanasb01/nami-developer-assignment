/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        encodeSans:["Encode Sans Expanded","ui-sans-serif", "system-ui", "-apple-system"],
        montserrat:["Montserrat","ui-sans-serif", "system-ui", "-apple-system"]
      }
    },
  },
  plugins: [],
}