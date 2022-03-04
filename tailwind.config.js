module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      green: "#67B281",
      lightgreen: "#74C590",
      black: "#000",
      pink: "#ffd6cc",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
