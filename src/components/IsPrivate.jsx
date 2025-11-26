import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

// `IsPrivate` is a small wrapper component used to protect routes.
// Usage: wrap a route's element with <IsPrivate> ... </IsPrivate> in `App.jsx`.
// Behavior:
// - While auth state is loading, it shows a short loading message.
// - If the user is not authenticated, it returns <Navigate to="/Login" />
//   which triggers a client-side redirect handled by react-router.
// - If the user is authenticated, it renders the wrapped `children`.
function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication state is still being determined, show a spinner/message
  if (isLoading) return <p>Loading ...</p>;

  // If not logged in, redirect to the login page.
  // `Navigate` replaces the current location in the history stack by default
  // (so pressing back won't return to the protected page).
  if (!isLoggedIn) {
    return <Navigate to="/Login" />;
  }

  // Logged in -> render children (the protected page)
  return children;
}

export default IsPrivate;
