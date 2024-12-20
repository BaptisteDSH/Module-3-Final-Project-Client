import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../config/apiUrl.config";

const EditProfilPage = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [pets, setPets] = useState([
    { petName: "", petType: "", petDescription: "", petPicture: "" },
  ]);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Include updatedPets in the API request body

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

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      //Step 1: upload images to Cloudinary

      const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("imageUrl", file);

        //API call to upload the images

        const response = await axios.post(
          `${API_URL}/uploads/multiple-uploads`,
          formData
        );
        return response.data.imageUrls[0];
      };

      const uploadedProfilePicture = await uploadImage(picture);

      //Upload pet pictures and prepare updatedPets

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

      const requestBody = {
        name,
        lastName,
        email,
        age,
        location,
        phone,
        description,
        picture: uploadedProfilePicture || "",
        pet: updatedPets,
      };

      // Send PUT request to the server
      await axios.put(`${API_URL}/api/user/${user._id}`, requestBody);

      toast.success("Profil updated !");
      navigate("/MyProfile");
      window.location.reload();
    } catch (error) {
      console.error("Error during profile update:", error);
      const errorDescription =
        error.response?.data?.message || "An error occurred";
      setErrorMessage(errorDescription);
    }
  };

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
              type="file"
              name="picture"
              id="picture"
              onChange={(e) => setPicture(e.target.files[0])}
              className="form-input-cloudify"
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
                className="form-input-cloudify"
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

export default EditProfilPage;
