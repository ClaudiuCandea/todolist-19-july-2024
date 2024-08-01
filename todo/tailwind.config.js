/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        rightToLeft: {
          "0%": { transform: "translateX(0%)" },
          "25%": { transform: "translateX(-25%)" },
          "50%": { transform: "translateX(-50%)" },
          "75%": { transform: "translateX(-75%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        rightToLeft: "rightToLeft 5s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover"],
    },
  },
  plugins: [],
};
