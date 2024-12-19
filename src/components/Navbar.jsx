import React, { useContext, useState } from "react";
import logoLight from "../assets/logo.png";
import logoDark from "../assets/darkLogo.png";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Switch from "./Switch";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <Link to="/">
        <img src={darkTheme ? logoDark : logoLight} alt="logo" />
      </Link>

      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>

      <div className={`nav-button-container ${menuOpen ? "open" : ""}`}>
        <NavLink to="/Adopt">Adopt</NavLink>
        <NavLink to="/MyProfile">My Profile</NavLink>
        <NavLink to="/Events">Events</NavLink>
        <NavLink to="/AboutUs">About us</NavLink>
        <Switch />
      </div>

      <div>
        {isLoggedIn ? (
          <div className="log-button" onClick={logOutUser}>
            Logout
          </div>
        ) : (
          <Link to="/Signup">
            <div className="log-button">SignUp</div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
