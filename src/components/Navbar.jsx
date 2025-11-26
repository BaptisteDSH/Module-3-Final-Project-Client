import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Switch from "./Switch";

const Navbar = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => setMenuOpen(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  return (
    <nav>
      <div
        className="nav-inner"
        style={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/">
          <img src="src/assets/darkLogo.png" alt="logo" />
        </Link>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          type="button"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-button-container ${menuOpen ? "open" : ""}`}>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/Adopt"
            onClick={closeMenu}
          >
            Adopt
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/MyProfile"
            onClick={closeMenu}
          >
            My Profile
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/Events"
            onClick={closeMenu}
          >
            Events
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/AboutUs"
            onClick={closeMenu}
          >
            About us
          </NavLink>
          <Switch />
          {/* Mobile-only auth buttons: duplicated here so mobile menu shows login/signup */}
          <div className="mobile-auth-buttons">
            {isLoggedIn ? (
              <button
                className="logout-button"
                onClick={() => {
                  logOutUser();
                  closeMenu();
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/Signup" onClick={closeMenu}>
                <button className="signup-button">Sign Up</button>
              </Link>
            )}
          </div>
        </div>

        <div className="desktop-auth">
          {isLoggedIn ? (
            <button
              className="logout-button"
              onClick={() => {
                logOutUser();
                closeMenu();
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/Signup" onClick={closeMenu}>
              <button className="signup-button">Sign Up</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
