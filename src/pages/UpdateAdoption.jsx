import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";

const UpdateAdoption = ({ adoptions, setAdoptions }) => {
  const { user } = useContext(AuthContext);
  const { adoptionId } = useParams();


  // Holds the fetched adoption data
  const [adoption, setAdoption] = useState(null);
  const navigate = useNavigate();

  const [updatedAdoption, setUpdatedAdoption] = useState({
    datePosted: "",
    description: "",
    pet: { name: "" },
    picture: "",
    user: user._id,
  });
  console.log(user._id);

  // Fetch the specific adoption data when the component loads
  useEffect(() => {
    const fetchAdoption = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/adoptions/${adoptionId}`
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
        description: adoption.description,
        pet: { name: adoption.pet.name },
        picture: adoption.picture,
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
      const response = await axios.put(
        `http://localhost:5005/api/adoptions/${adoptionId}`,
        updatedAdoption
      );
      const updatedAdoptions = adoptions.map((item) =>
        item._id === adoptionId ? response.data : item
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
      <h2>Update this Adoption</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date Posted:</label>
          <input
            type="date"
            name="datePosted"
            value={updatedAdoption.datePosted}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={updatedAdoption.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            name="petName"
            value={updatedAdoption.pet.name}
            onChange={handleChange}
            placeholder="Enter pet name"
            required
          />
        </div>
        <div>
          <label>Picture URL:</label>
          <input
            type="text"
            name="picture"
            value={updatedAdoption.picture}
            onChange={handleChange}
            placeholder="Enter picture URL"
          />
        </div>
        <button type="submit">Update Adoption</button>
      </form>
    </div>
  );
};

export default UpdateAdoption;
