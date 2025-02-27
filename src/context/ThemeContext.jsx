import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  // const storedTheme = localStorage.getItem("theme") || "light";
  const storedColor = localStorage.getItem("themeColor") || "#3b82f6"; // Default Blue

  // const [theme, setTheme] = useState(storedTheme);
  const [themeColor, setThemeColor] = useState(storedColor);

  // useEffect(() => {
  //   if (theme === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }

  //   // Set the theme color CSS variable for buttons
  //   document.documentElement.style.setProperty("--theme-color", themeColor);
  //   document.documentElement.style.setProperty("--theme-color-dark", darkenColor(themeColor, 20));

  //   localStorage.setItem("theme", theme);
  //   localStorage.setItem("themeColor", themeColor);
  // }, [theme, themeColor]);

  function darkenColor(hex, percent) {
    let num = parseInt(hex.slice(1), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = ((num >> 8) & 0x00ff) - amt,
      B = (num & 0x0000ff) - amt;
    return `#${(0x1000000 + (R < 0 ? 0 : R) * 0x10000 + (G < 0 ? 0 : G) * 0x100 + (B < 0 ? 0 : B))
      .toString(16)
      .slice(1)}`;
  }

  return (
    <ThemeContext.Provider value={{  themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
