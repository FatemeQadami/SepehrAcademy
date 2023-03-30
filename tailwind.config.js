/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        Yekan: ["YekanBakh"],
        Gab: ["Gabriola"],
      },
      colors: {
        "white-rgba": "rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
