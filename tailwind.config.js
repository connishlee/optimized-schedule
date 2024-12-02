/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // All files inside src/app
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // If you have a components folder
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        2: "repeat(2, 0.25fr)",
      },
      width: {
        128: "26rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
