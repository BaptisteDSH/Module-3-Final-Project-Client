import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS

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

  // Handle changes in pet details
  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSignUpSubmit = (e) => {
    e.preventDefault();

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

    // Send POST request to the server
    axios
      .post("http://localhost:5005/api/user/signup", requestBody)
      .then(() => {
        toast.success("Your profile has been created!");
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  // List of locations to populate the dropdown
  const locations = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Girona",
    "Granada",
    "Guadalajara",
    "Gipuzkoa",
    "Huelva",
    "Huesca",
    "Jaén",
    "La Coruña",
    "León",
    "Lleida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Ourense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
  ];

  // List of pet types to populate the dropdown
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
              placeholder="Enter URL "
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

        {/* Location dropdown */}
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
          >
            <option value="">Select a location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
            placeholder="Tell us a little about yourself"
          />
        </div>

        {/* Pet Info Section */}
        <h2 className="sign-up-title-h2">Pet Informations</h2>

        <div className="pet-infos">
          {/* Pet type dropdown */}
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

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="form-button">
            Sign Up
          </button>
        </div>
      </form>

      <div className="redirection-container">
        <p>Already have an account?</p>
        <Link to="/Login">
          <div>Login</div>
        </Link>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </>
  );
};

export default SignUpPage;
