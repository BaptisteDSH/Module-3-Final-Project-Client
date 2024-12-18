import { createContext, useState } from "react";
import { API_URL } from "../config/apiUrl.config";

const ThemeContext = createContext();

const ThemeWrapper = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeWrapper, ThemeContext };
