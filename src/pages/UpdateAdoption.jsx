import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config/apiUrl.config";

const UpdateAdoption = ({ adoptions, setAdoptions }) => {
  const { user } = useContext(AuthContext);
  const { adoptionId } = useParams();

  // Holds the fetched adoption data
  const [adoption, setAdoption] = useState(null);
  const navigate = useNavigate();

  const [updatedAdoption, setUpdatedAdoption] = useState({
    datePosted: "",
    location: "",
    description: "",
    pet: { name: "" },
    pictures: [],
    user: user ? user._id : "", // Use fallback if user is null
  });

  // Fetch the specific adoption data when the component loads
  useEffect(() => {
    const fetchAdoption = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/adoptions/${adoptionId}`
        );
        setAdoption(response.data);
      } catch (error) {
        console.error("Error fetching adoption:", error);
      }
    };
    fetchAdoption();
  }, [adoptionId]);

  // Update the `updatedAdoption` state when adoption data is fetched
  useEffect(() => {
    if (adoption) {
      setUpdatedAdoption({
        datePosted: adoption.datePosted,
        location: adoption.location,
        description: adoption.description,
        pet: { name: adoption.pet.name },
        pictures: adoption.pictures,
        user: adoption.user,
      });
    }
  }, [adoption]);

  // handleChange function to update state based on input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "petName") {
      setUpdatedAdoption((prevState) => ({
        ...prevState,
        pet: {
          ...prevState.pet,
          name: value,
        },
      }));
    } else {
      setUpdatedAdoption((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // PUT request for the individual adoption
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting updated adoption:", updatedAdoption);
    try {
      //Step 1, upload the images
      const myFormData = new FormData();
      //for each image, add it to the form data
      updatedAdoption.pictures.forEach((image) => {
        myFormData.append("imageUrl", image);
      });

      //API call to upload the multiple images
      const { data } = await axios.post(
        `${API_URL}/uploads/multiple-uploads`,
        myFormData
      );
      console.log("image uploaded successfully", data.imageUrls);

      //Step 2, Add the returned image URLs to the state
      const adoptionPayload = {
        ...updatedAdoption,
        pictures: data.imageUrls, // Use the uploaded image URLs
        user: user._id, // Ensure user ID is included
      };

      //Step 3, updating the adoptions
      const response = await axios.put(
        `${API_URL}/api/adoptions/${adoptionId}`,
        adoptionPayload
      );
      const updatedAdoptions = adoptions.map((item) =>
        item._id === adoptionId ? response.data.updatedAdoption : item
      );
      setAdoptions(updatedAdoptions);
      navigate("/MyProfile"); // Correct usage of navigate
      window.location.reload();
      alert("Adoption updated successfully!");
    } catch (error) {
      console.error("Failed to update adoption:", error);
      alert("An error occurred while updating the adoption.");
    }
  };

  return (
    <div>
      <h1 className="sign-up-title-h1">Update this Adoption</h1>
      <form onSubmit={handleSubmit} className="form-signup">
        <div>
          <label className="form-label">Date Posted:</label>
          <input
            type="date"
            name="datePosted"
            value={updatedAdoption.datePosted}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            value={updatedAdoption.description}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <label className="form-label">Pet Name:</label>
          <input
            type="text"
            name="petName"
            value={updatedAdoption.pet.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter pet name"
            required
          />
        </div>
        <div>
          <label className="form-label">Upload Pictures</label>
          <input
            type="file"
            name="pictures"
            multiple
            placeholder="Upload your adoptions' pictures"
            className="form-input-cloudify"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setUpdatedAdoption((prevState) => ({
                ...prevState,
                pictures: files, // Store files directly in the state
              }));
            }}
          />
        </div>

        <div>
          {/*the uploaded pictures below*/}
          <ul>
            {updatedAdoption.pictures.map((url, index) => (
              <li key={index}>
                <img src={url} alt={`Uploaded ${index}`} width="100" />
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="form-button">
          Update Adoption
        </button>
      </form>
    </div>
  );
};

export default UpdateAdoption;
