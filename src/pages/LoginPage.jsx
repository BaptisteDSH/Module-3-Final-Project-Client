import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import { API_URL } from "../config/apiUrl.config";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      password,
    };

    axios
      .post(`${API_URL}/api/user/Login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        toast.success("You are logged In!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        const errorDescription =
          error.response?.data?.message || "Login failed"; // Ajout de la sécurité
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <div className="login-page-container">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLoginSubmit} className="form-login">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Choose a secure password"
            />
          </div>

          {/* Submit Button */}
          <div className="form-group">
            <button type="submit" className="form-button">
              Login
            </button>
          </div>
        </form>
        <div className="redirection-container">
          <p>Already have an account?</p>
          <Link to="/Signup">
            <div>SignUp</div>
          </Link>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </>
  );
};

export default LoginPage;
