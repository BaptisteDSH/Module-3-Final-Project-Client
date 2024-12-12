import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" style={{ height: "100px" }} />
      </Link>
      <div className="nav-button-container">
        <NavLink to="/Adopt">Adopt</NavLink>
        <NavLink to="/MyProfil">My Profile</NavLink>
        <NavLink to="/Events">Events</NavLink>
        <NavLink to="/AboutUs">About us</NavLink>
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
