import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; // Context to manage user data
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import { API_URL } from "../config/apiUrl.config";

const AddPet = () => {
  const { user, setUser } = useContext(AuthContext); // Use context to get and update user data
  const [pet, setPet] = useState({
    petType: "",
    petName: "",
    petDescription: "",
    petPicture: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [existingPets, setExistingPets] = useState([]); // State to hold existing pets
  const navigate = useNavigate();

  // Fetch existing pets when the component mounts
  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`${API_URL}/api/user/${user._id}`)
        .then((response) => {
          setExistingPets(response.data.pet || []); // Update with the user's existing pets
        })
        .catch((error) => {
          console.error("Error fetching pets:", error);
        });
    }
  }, [user]);

  // Handle changes in the form fields
  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  // Handle the form submission
  const handlePetSubmit = (e) => {
    e.preventDefault();

    // Add the new pet to the existing pets array
    const updatedPets = Array.isArray(existingPets)
      ? [...existingPets, pet]
      : [pet];

    // Request body to update the user with the new pet
    const requestBody = {
      ...user, // Keep all other user data
      pet: updatedPets, // Add the updated pet list
    };

    // Make PUT request to update the user with the new pet
    axios
      .put(`${API_URL}/api/user/${user._id}`, requestBody)
      .then((response) => {
        setUser(response.data); // Update the user context with the latest data
        setExistingPets(response.data.pet); // Update existing pets to include the new pet
        toast.success("Pet added !");
        navigate("/MyProfile"); // Redirect to profile page after adding the pet
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error:", error);
        const errorDescription =
          error.response?.data?.message || "An error occurred";
        setErrorMessage(errorDescription); // Display error message
      });
  };

  // List of pet types
  const petTypes = ["Dog", "Cat", "Bird", "Fish", "Other"];

  return (
    <>
      <h1 className="sign-up-title-h1">Add a Pet</h1>

      <form onSubmit={handlePetSubmit} className="form-signup">
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

          {/* Pet name input */}
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

          {/* Pet description input */}
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

          {/* Pet picture input */}
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

        {/* Submit button */}
        <div className="form-group">
          <button type="submit" className="form-button">
            Add the Pet
          </button>
        </div>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Display existing pets */}
      {existingPets.length > 0 && (
        <div className="existing-pets">
          <h2>Your Pets</h2>
          <ul>
            {existingPets.map((pet, index) => (
              <li key={index}>
                <strong>{pet.petName}</strong> ({pet.petType}):{" "}
                {pet.petDescription}
                <br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AddPet;
