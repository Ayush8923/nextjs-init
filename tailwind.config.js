module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#373435",
        },
        gray: {
          100: "#ECECEC",
          500: "#959595",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
