import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../config/apiUrl.config";

const EditProfilePage = ({ userId }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [pets, setPets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Fetch user and pet data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/${userId}`);
        const user = response.data;

        setName(user.name);
        setLastName(user.lastName);
        setEmail(user.email);
        setAge(user.age || "");
        setLocation(user.location);
        setPhone(user.phone || "");
        setDescription(user.description || "");
        setPicture(user.picture);
        setPets(user.pet || []); // Pet details
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle updates to pet details
  const handlePetChange = (index, field, value) => {
    const updatedPets = [...pets];
    updatedPets[index][field] = value;
    setPets(updatedPets);
  };

  const handlePetPictureChange = (index, file) => {
    const updatedPets = [...pets];
    updatedPets[index].petPicture = file; // Store the new picture file
    setPets(updatedPets);
  };

  // Handle form submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedProfilePicture = picture;

      // Upload profile picture if a new one is selected
      if (picture instanceof File) {
        const formData = new FormData();
        formData.append("imageUrl", picture);
        const uploadResponse = await axios.post(
          `${API_URL}/uploads/multiple-uploads`,
          formData
        );
        uploadedProfilePicture = uploadResponse.data.imageUrls[0];
      }

      // Upload pet pictures
      const updatedPets = await Promise.all(
        pets.map(async (pet) => {
          if (pet.petPicture instanceof File) {
            const formData = new FormData();
            formData.append("imageUrl", pet.petPicture);
            const uploadResponse = await axios.post(
              `${API_URL}/uploads/multiple-uploads`,
              formData
            );
            return { ...pet, petPicture: uploadResponse.data.imageUrls[0] };
          }
          return pet;
        })
      );

      // Prepare the payload
      const requestBody = {
        name,
        lastName,
        email,
        age,
        location,
        phone,
        description,
        picture: uploadedProfilePicture,
        pet: updatedPets,
      };

      // Send update request
      await axios.put(`${API_URL}/api/user/${userId}`, requestBody);
      toast.success("Profile updated successfully!");
      navigate("/MyProfile");
    } catch (error) {
      const errorDescription =
        error.response?.data?.message || "An error occurred";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <>
      <h1 className="sign-up-title-h1">Update Profile</h1>
      <form onSubmit={handleUpdateSubmit} className="form-signup">
        <div className="signup-names">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="picture" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={(e) => setPicture(e.target.files[0])}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
          />
        </div>

        <h2>Your Pets</h2>
        {pets.map((pet, index) => (
          <div key={index} className="pet-update-container">
            <div className="form-group">
              <label>Pet Name</label>
              <input
                type="text"
                value={pet.petName}
                onChange={(e) =>
                  handlePetChange(index, "petName", e.target.value)
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Pet Type</label>
              <input
                type="text"
                value={pet.petType}
                onChange={(e) =>
                  handlePetChange(index, "petType", e.target.value)
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Pet Picture</label>
              <input
                type="file"
                onChange={(e) =>
                  handlePetPictureChange(index, e.target.files[0])
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Pet Description</label>
              <textarea
                value={pet.petDescription}
                onChange={(e) =>
                  handlePetChange(index, "petDescription", e.target.value)
                }
                className="form-input"
              />
            </div>
          </div>
        ))}

        <button type="submit" className="form-button">
          Update
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ToastContainer />
    </>
  );
};

export default EditProfilePage;
