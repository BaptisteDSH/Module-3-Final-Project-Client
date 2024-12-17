import React, { useContext } from "react";
import logoLight from "../assets/logo.png";
import logoDark from "../assets/darkLogo.png";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Switch from "./Switch";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <nav>
      <Link to="/">
        <img
          src={darkTheme ? logoDark : logoLight}
          alt="logo"
          style={{ width: "100px", height: "130px" }} // Width set, height adjusts automatically
        />
      </Link>
      <div className="nav-button-container">
        <NavLink to="/Adopt">Adopt</NavLink>
        <NavLink to="/MyProfile">My Profile</NavLink>
        <NavLink to="/Events">Events</NavLink>
        <NavLink to="/AboutUs">About us</NavLink>
      </div>
      <Switch />
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
