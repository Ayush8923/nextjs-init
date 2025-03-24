module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#373435",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
