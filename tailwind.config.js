/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          light: "#4375FF",
          DEFAULT: "#0044FF",
          dark: "#002a9d",
        },
        gray: {
          dark: "#707070",
          DEFAULT: "#00000029",
          light: "#F3F4F6",
        },
      },
    },
  },
  plugins: [],
};
