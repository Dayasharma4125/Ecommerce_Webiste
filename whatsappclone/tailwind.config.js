/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      screens: {
        "small": "350px",
        "ms":"430px",
        "medium": "558px",
        "large": "1350px",
        "3xl":"1600px"
      },

    },
  },
  plugins: [],
}

