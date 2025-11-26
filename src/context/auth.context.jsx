import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { API_URL } from "../config/apiUrl.config";

// AuthContext provides authentication state and helpers across the app.
// - `isLoggedIn`: boolean (true when a valid token/user exists)
// - `user`: the current user's info returned by the backend
// - `storeToken`, `authenticateUser`, `logOutUser`: helpers to manage auth
// This context avoids prop-drilling and lets any component read auth state.
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [pets, setPets] = useState([]); // Added state for pets

  // Function to store the token in localStorage
  // Function to store the token in localStorage
  // - Persists the JWT in localStorage so it survives page refreshes
  // - Immediately calls `authenticateUser` to update context state
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
    console.log("Token stored:", token);

    // Call authenticateUser to immediately update state after storing the token
    authenticateUser(token);
  };

  // Handle authentication errors
  // Handle authentication errors
  // - Normalizes different kinds of axios errors into a user-friendly message
  // - Sets `isLoggedIn` to false and clears `user` so the UI updates accordingly
  const handleAuthError = useCallback((error) => {
    console.error("Authentication error:", error);
    setIsLoggedIn(false);
    setIsLoading(false);
    setUser(null);

    if (error && error.response) {
      setAuthError(error.response.data.message || "Authentication failed");
    } else if (error && error.request) {
      setAuthError("Network error or no response from server");
    } else {
      setAuthError("Unexpected error occurred");
    }
  }, []);

  // Function to authenticate the user using the token
  // Function to authenticate the user using the token
  // - If a token exists (passed in or in localStorage) we call the backend
  //   to verify it and retrieve user data.
  // - On success, we populate `user`, set `isLoggedIn` and `isLoading=false`.
  // - On error, `handleAuthError` is used to centralize error handling.
  const authenticateUser = useCallback(
    (storedToken) => {
      if (!storedToken) {
        // If no token is passed, retrieve it from localStorage
        storedToken = localStorage.getItem("authToken");
      }

      console.log("Stored token:", storedToken);

      if (storedToken) {
        axios
          .get(`${API_URL}/api/user/verify`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            const userData = response.data; // User data from the response
            console.log("User verified:", userData);
            setUser(userData);
            setPets(userData.pet || []); // Set pets if available
            setIsLoggedIn(true);
            setIsLoading(false);
          })
          .catch((error) => {
            handleAuthError(error);
          });
      } else {
        // No token found: user is not logged in
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
    },
    [handleAuthError]
  );

  // Function to remove the token from localStorage
  // Function to remove the token from localStorage
  // - Called when logging out to clear credentials
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  // Function to log out the user
  // Function to log out the user
  // - Clears the token and resets auth-related state
  const logOutUser = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
    setPets([]); // Clear pets on logout
  };

  // useEffect hook that runs on initial render to verify the token
  // useEffect hook that runs on initial render to verify the token
  // - This makes the app remember the user across page refreshes.
  useEffect(() => {
    // If a token exists in localStorage, call authenticateUser
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      authenticateUser(storedToken);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, [authenticateUser]); // This useEffect runs only once on the first render

  // This effect runs when the user state is updated to set pets
  useEffect(() => {
    if (user && user.pet) {
      setPets(user.pet);
    }
  }, [user]); // Only run this when the user data changes

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        user,
        pets, // Pass pets state to context
        setUser,
        storeToken,
        authenticateUser,
        logOutUser,
        authError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

AuthProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
export { AuthProviderWrapper, AuthContext };
