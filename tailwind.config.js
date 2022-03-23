module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      green: "#60ae7b",
      lightgreen: "#74C590",
      black: "#000",
      pink: "#fad9cd",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
