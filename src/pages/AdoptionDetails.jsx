import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import icon from "../assets/location-icon.png";

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
    <div>
      <div className="adoption-details-name">
        <h1>Hey there! I am {adoptionsDetail.pet?.name || "Unnamed Pet"}</h1>
      </div>

      {/* Render pictures if available */}
      {adoptionsDetail.pictures && adoptionsDetail.pictures.length > 0 ? (
        <div>
          {adoptionsDetail.pictures.map((picture, index) => (
            <img
              className="adoption-details-picture"
              key={index}
              src={picture}
              alt={`${adoptionsDetail.pet?.name || "Pet"} - Image ${index + 1}`}
            />
          ))}
        </div>
      ) : (
        <p>No pictures available.</p>
      )}
      <div className="adoption-details-info-container">
        <div className="adoption-details-description">
          <p>{adoptionsDetail.description || "No description available."}</p>
        </div>

        <div className="adoption-details-information">
          <div className="adoption-details-location">
            <img src={icon} alt="location" style={{ height: "50px" }} />
            <p>{adoptionsDetail.location || "Not specified"}</p>
          </div>

          <p className="adoption-details-date">
            <strong>Date Posted:</strong>{" "}
            {new Date(adoptionsDetail.datePosted).toLocaleDateString()}
          </p>
          <div className="adoption-details-owner-details">
            {/* Check if user details are available */}
            {adoptionsDetail.user && (
              <p>
                <strong>Owner:</strong>{" "}
                {adoptionsDetail.user.name || "Unknown user"}
              </p>
            )}
            {adoptionsDetail.user && (
              <img
                src={adoptionsDetail.user.picture || "Unknown user"}
                alt="owner-photo"
                className="adoption-details-owner-photo"
              />
            )}
            {/* Additional debugging info */}
            {adoptionsDetail.user && (
              <p>
                <strong>Contact:</strong>{" "}
                {adoptionsDetail.user.email || "No contact information"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionDetails;
