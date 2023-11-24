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
        sans: [" Montserrat_500Medium"],
        sans_light: ["Montserrat_300Light"],
        sans_regular: ["Montserrat_400Regular"],
        sans_semibold: [" Montserrat_600SemiBold"],
        sans_bold: ["Montserrat_700Bold"],
        sans_extrabold: [" Montserrat_800ExtraBold"],
      },
    },
  },
  plugins: [],
}

