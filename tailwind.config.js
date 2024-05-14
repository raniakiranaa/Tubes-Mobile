/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./<custom-folder>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { 
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
}

