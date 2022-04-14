module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        md: "900px",
      },
      width: {
        72: "72%",
        28: "28%",
      },
    },
    colors: {
      green: "#60ae7b",
      lightgreen: "#74C590",
      black: "#000",
      pink: "#F4D2C3",
      white: "#fff",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
