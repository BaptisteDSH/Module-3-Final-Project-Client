import React from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" style={{ height: "100px" }} />
      </Link>
      <div className="nav-button-container">
        <NavLink to="/Adopt">Adopt</NavLink>
        <NavLink to="/MyProfile">My Profile</NavLink>
        <NavLink to="/Events">Events</NavLink>
        <NavLink to="/AboutUs">About us</NavLink>
      </div>
      <button className="log-button">Logout</button>
    </nav>
  );
};

export default Navbar;
