import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/apiUrl.config";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [pets, setPets] = useState([]); // Added state for pets

  // Function to store the token in localStorage
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
    console.log("Token stored:", token);

    // Call authenticateUser to immediately update state after storing the token
    authenticateUser(token);
  };

  // Function to authenticate the user using the token
  const authenticateUser = (storedToken) => {
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
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  // Handle authentication errors
  const handleAuthError = (error) => {
    console.error("Authentication error:", error);
    setIsLoggedIn(false);
    setIsLoading(false);
    setUser(null);

    if (error.response) {
      setAuthError(error.response.data.message || "Authentication failed");
    } else if (error.request) {
      setAuthError("Network error or no response from server");
    } else {
      setAuthError("Unexpected error occurred");
    }
  };

  // Function to remove the token from localStorage
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  // Function to log out the user
  const logOutUser = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
    setPets([]); // Clear pets on logout
  };

  // useEffect hook that runs on initial render to verify the token
  useEffect(() => {
    // If a token exists in localStorage, call authenticateUser
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      authenticateUser(storedToken);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []); // This useEffect runs only once on the first render

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

export { AuthProviderWrapper, AuthContext };
