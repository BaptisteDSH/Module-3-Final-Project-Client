import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AdoptionDetails = ({ adoptions, setAdoptions }) => {
  const { adoptionId } = useParams();
  const [adoptionsDetail, setAdoptionsDetails] = useState(null);

  useEffect(() => {
    // Check if the adoption exists in the passed `adoptions` array (frontend state)
    // const existingAdoption = adoptions.find(
    //   (adoption) => String(adoption._id) === adoptionId
    // );
    // if (existingAdoption) {
    //   // If the adoption exists, set it directly to `adoptionDetails` state
    //   setAdoptionsDetails(existingAdoption);
    // }

    // Always fetch adoption from the backend
    const fetchAdoption = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/adoptions/${adoptionId}`
        ); // GET request to fetch adoption details
        setAdoptionsDetails(response.data); // Set the fetched adoption details to state
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching adoption details:", error); // Log any errors during the fetch
      }
    };
    fetchAdoption(); // Call the fetch function
  }, [adoptionId, adoptions]); // Dependency array to trigger effect when `adoptionId` or `adoptions` changes

  // Render a loading message while adoptionDetail is null
  if (!adoptionsDetail) {
    return <p>Loading adoption details...</p>;
  }

  return (
    <div className="adoption-details">
      <h1>{adoptionsDetail.pet?.name || "Unnamed Pet"}</h1>

      {/* Render pictures if available */}
      {adoptionsDetail.pictures && adoptionsDetail.pictures.length > 0 ? (
        <div className="adoption-pictures">
          {adoptionsDetail.pictures.map((picture, index) => (
            <img
              key={index}
              src={picture}
              alt={`${adoptionsDetail.pet?.name || "Pet"} - Image ${index + 1}`}
              style={{ maxWidth: "200px", margin: "10px" }}
            />
          ))}
        </div>
      ) : (
        <p>No pictures available.</p>
      )}

      <p>{adoptionsDetail.description || "No description available."}</p>

      <p>
        <strong>Location:</strong> {adoptionsDetail.location || "Not specified"}
      </p>

      <p>
        <strong>Date Posted:</strong>{" "}
        {new Date(adoptionsDetail.datePosted).toLocaleDateString()}
      </p>

      {/* Check if user details are available */}
      {adoptionsDetail.user && (
        <p>
          <strong>Posted by:</strong>{" "}
          {adoptionsDetail.user.name || "Unknown user"}
        </p>
      )}

      {/* Additional debugging info */}
      {adoptionsDetail.user && (
        <p>
          <strong>Contact:</strong>{" "}
          {adoptionsDetail.user.email || "No contact information"}
        </p>
      )}
    </div>
  );
};

export default AdoptionDetails;
