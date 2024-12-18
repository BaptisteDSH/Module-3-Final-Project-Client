import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../config/apiUrl.config";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [phone, setPhone] = useState("");
  const [pet, setPet] = useState({
    petType: "",
    petName: "",
    petDescription: "",
    petPicture: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // List of locations
  const locations = [
    "Madrid",
    "Barcelona",
    "Valencia",
    "Sevilla",
    "Zaragoza",
    "Malaga",
    "Murcia",
    "Bilbao",
    "Alicante",
    "Cordoba",
  ];

  // List of pet types
  const petTypes = [
    "dog",
    "cat",
    "bird",
    "snake",
    "spider",
    "hamster",
    "ferret",
    "fish",
    "guinea pigs",
  ];

  // Handle changes in pet details
  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  // Validate the form before submitting
  const validateForm = () => {
    if (!name || !lastName || !email || !password || !location) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    if (isNaN(age) || age < 1) {
      setErrorMessage("Please enter a valid age.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    const requestBody = {
      name,
      lastName,
      email,
      password,
      location,
      age,
      description,
      picture,
      phone,
      pet,
    };

    console.log("Request body:", requestBody); // Debugging

    axios
      .post(`${API_URL}/api/user/signup`, requestBody)
      .then(() => {
        toast.success("Your profile has been created!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during signup:", error); // Debugging
        const errorDescription =
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <h1 className="sign-up-title-h1">Sign Up</h1>

      <form onSubmit={handleSignUpSubmit} className="form-signup">
        <div className="signup-names">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-input"
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-input"
              placeholder="Enter your age"
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              placeholder="+33 1 23 45 67 89"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="picture" className="form-label">
              Picture
            </label>
            <input
              type="url"
              name="picture"
              id="picture"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              className="form-input"
              placeholder="Enter URL"
            />
          </div>
        </div>

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
            required
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
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <select
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input"
            required
          >
            <option value="">Select a location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <h2 className="sign-up-title-h2">Pet Information</h2>

        <div className="pet-infos">
          <div className="form-group">
            <label htmlFor="petType" className="form-label">
              Pet Type
            </label>
            <select
              name="petType"
              id="petType"
              value={pet.petType}
              onChange={handlePetChange}
              className="form-input"
            >
              <option value="">Select a pet type</option>
              {petTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="petName" className="form-label">
              Pet Name
            </label>
            <input
              type="text"
              name="petName"
              id="petName"
              value={pet.petName}
              onChange={handlePetChange}
              className="form-input"
              placeholder="Enter your pet's name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="petDescription" className="form-label">
              Pet Description
            </label>
            <input
              type="text"
              name="petDescription"
              id="petDescription"
              value={pet.petDescription}
              onChange={handlePetChange}
              className="form-input"
              placeholder="Describe your pet"
            />
          </div>

          <div className="form-group">
            <label htmlFor="petPicture" className="form-label">
              Pet Picture
            </label>
            <input
              type="url"
              name="petPicture"
              id="petPicture"
              value={pet.petPicture}
              onChange={handlePetChange}
              className="form-input"
              placeholder="Enter URL for your pet's picture"
            />
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="form-button">
            Sign Up
          </button>
        </div>
      </form>

      <div className="redirection-container">
        <p>Already have an account?</p>
        <Link to="/login">
          <div>Login</div>
        </Link>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <ToastContainer />
    </>
  );
};

export default SignUpPage;
