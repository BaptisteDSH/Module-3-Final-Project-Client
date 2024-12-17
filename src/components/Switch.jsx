import React, { useContext } from "react";
import ReactSwitch from "react-switch"; // Import the react-switch component
import { ThemeContext } from "../context/ThemeContext";

const Switch = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext); // Access the ThemeContext

  const updateThemeBasedOnSwitch = (isDarkModeEnabled) => {
    if (isDarkModeEnabled) {
      setDarkTheme(true); // Activate dark mode
    } else {
      setDarkTheme(false); // Activate light mode
    }
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span>{darkTheme ? "🌙" : "☀️"}</span>
      <ReactSwitch
        onChange={updateThemeBasedOnSwitch}
        checked={darkTheme}
        offColor="#d3d3d3"
        onColor="#1a1a1a"
        offHandleColor="#fff"
        onHandleColor="#000"
        uncheckedIcon={<div style={{ padding: "5px", color: "#000" }}></div>}
        checkedIcon={<div style={{ padding: "5px", color: "#fff" }}></div>}
        handleDiameter={20}
        height={24}
        width={48}
      />
    </div>
  );
};

export default Switch;
