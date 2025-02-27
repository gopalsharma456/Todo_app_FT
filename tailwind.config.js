module.exports = {
  darkMode: "class", // Enable dark mode with the "dark" class
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: "var(--theme-color)", // Allow dynamic theme colors
      },
    },
  },
  plugins: [],
};
