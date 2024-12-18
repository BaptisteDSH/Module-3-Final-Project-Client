import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AdoptionDetails = ({ adoptions, setAdoptions }) => {
  const { adoptionId } = useParams();
  const [adoptionsDetail, setAdoptionsDetails] = useState(null);

  useEffect(() => {
    // Check if the adoption exists in the passed `adoptions` array (frontend state)
    const existingAdoption = adoptions.find(
      (adoption) => String(adoption._id) === adoptionId
    );
    if (existingAdoption) {
      // If the adoption exists, set it directly to `adoptionDetails` state
      setAdoptionsDetails(existingAdoption);
    } else {
      // If the adoption is not in the frontend state, fetch it from the backend
      const fetchAdoption = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/api/adoptions/${adoptionId}`
          ); // GET request to fetch adoption details
          setAdoptionsDetails(response.data); // Set the fetched adoption details to state
        } catch (error) {
          console.error("Error fetching adoption details:", error); // Log any errors during the fetch
        }
      };
      fetchAdoption(); // Call the fetch function
    }
  }, [adoptionId, adoptions]); // Dependency array to trigger effect when `adoptionId` or `adoptions` changes

  // Render a loading message while adoptionDetail is null
  if (!adoptionsDetail) {
    return <p>Loading adoption details...</p>;
  }

  return (
    <div className="adoption-details">
      <h1>{adoptionsDetail.pet?.name || "Unnamed Pet"}</h1>
      {/* <img
        src={adoptionsDetail.picture || "https://via.placeholder.com/150"}
        alt={adoptionsDetail.pet.name || "Adoption"}
      /> */}
      <p>{adoptionsDetail.description || "No description available."}</p>
      <p>
        Date Posted: {new Date(adoptionsDetail.datePosted).toLocaleDateString()}
      </p>
    </div>
  );
};

export default AdoptionDetails;
