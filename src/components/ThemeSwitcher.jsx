import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { themeColor, setThemeColor } = useContext(ThemeContext);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 flex items-center space-x-2">
      {/* Floating Theme Button */}
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="w-12 h-12 rounded-full shadow-md border-2 border-gray-300 flex items-center justify-center"
        style={{ backgroundColor: themeColor }}
      >
        🎨
      </button>

      {/* Color Picker - Opens directly next to the button */}
      {showPicker && (
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
          className="w-10 h-10 rounded-full border-none cursor-pointer"
          autoFocus
          onBlur={() => setShowPicker(false)} // Hide picker when clicking outside
        />
      )}
    </div>
  );
}
