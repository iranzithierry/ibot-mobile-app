/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./navigations/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [" NovaSquare_400Regular"],
        sans_light: ["NovaSquare_400Regular"],
        sans_regular: ["NovaSquare_400Regular"],
        sans_semibold: [" NovaSquare_400Regular"],
        sans_bold: ["NovaSquare_400Regular"],
        sans_extrabold: [" NovaSquare_400Regular"],
      },
    },
  },
  plugins: [],
}

