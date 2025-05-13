module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#373435",
          200: "#423F40",
        },
        gray: {
          100: "#ECECEC",
          200: "#D4D4D4",
          300: "#E7E7E799",
          400: "#F6F6F6",
          500: "#959595",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
