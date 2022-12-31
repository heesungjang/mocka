/* eslint @typescript-eslint/no-var-requires: "off" */
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
    },
    colors: {
      ...colors,
      brand_bg: "#222222",
      brand_sub_bg: "#3B3B3B",
      brand_color: "#B2DABB",
      brand_bg_dark: "#151618",
    },
  },
  plugins: [],
};
