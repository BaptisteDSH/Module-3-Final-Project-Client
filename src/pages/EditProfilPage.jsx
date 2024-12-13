import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const EditProfilPage = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      name,
      lastName,
      description,
      picture,
    };

    // Send PUT request to the server
    axios
      .put(`http://localhost:5005/api/user/${user._id}`, requestBody)
      .then(() => {
        navigate("/MyProfil");
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "An error occurred";
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

  return (
    <>
      <h1 className="sign-up-title-h1">Update Profile</h1>

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

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="form-button">
            Update
          </button>
        </div>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </>
  );
};

export default EditProfilPage;
