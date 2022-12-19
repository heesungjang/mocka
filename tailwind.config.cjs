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
      brand_bg: "#18181B",
      brand_sub_bg: "#1F1F23",
      brand_color: "#FDE68A",
      brand_bg_dark: "#151618",
    },
  },
  plugins: [],
};
