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
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

      const requestBody = {
        name,
        lastName,
        description,
        picture: uploadedProfilePicture || "",
      };

      // Send PUT request to the server
      await axios.put(`${API_URL}/api/user/${user._id}`, requestBody);

      toast.success("Profil updated !");
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
      <ToastContainer />
    </>
  );
};

export default EditProfilPage;
