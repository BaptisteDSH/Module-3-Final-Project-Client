import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import icon from "../assets/location-icon.png";
//for carousel effect
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

    // Fetch adoption from the backend
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

  // Carousel settings for react-slick
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop through images
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1, // Scroll one image at a time
    arrows: true, // Show arrows for navigation
    adaptiveHeight: true, // Adjust the height to the image size
  };

  return (
    <div>
      <div className="adoption-details-name">
        <h1>Hey there! I am {adoptionsDetail.pet?.name || "Unnamed Pet"}</h1>
      </div>

      <div className="adoption-details-picture-container">
        {adoptionsDetail.pictures && adoptionsDetail.pictures.length > 0 ? (
          // Displaying the images in a carousel
          <Slider {...settings}>
            {adoptionsDetail.pictures.map((picture, index) => (
              <div key={index}>
                <img
                  className="adoption-details-picture"
                  src={picture}
                  alt={`${adoptionsDetail.pet?.name || "Pet"} - Image ${
                    index + 1
                  }`}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p>No pictures available.</p> // Fallback message if no pictures are available
        )}
      </div>

      <div className="adoption-details-info-container">
        <div className="adoption-details-description">
          <p>{adoptionsDetail.description || "No description available."}</p>{" "}
          {/* Description of the adoption */}
        </div>

        <div className="adoption-details-information">
          <div className="adoption-details-location">
            <img src={icon} alt="location" style={{ height: "50px" }} />
            <p>{adoptionsDetail.location || "Not specified"}</p>{" "}
            {/* Location of the pet */}
          </div>

          <p className="adoption-details-date">
            <strong>Date Posted:</strong>{" "}
            {new Date(adoptionsDetail.datePosted).toLocaleDateString()}{" "}
            {/* Display the date the adoption was posted */}
          </p>

          <div className="adoption-details-owner-details">
            {/* Check if user details are available */}
            {adoptionsDetail.user && (
              <p>
                <strong>Owner:</strong>{" "}
                {adoptionsDetail.user.name || "Unknown user"}{" "}
                {/* Display the owner's name */}
              </p>
            )}

            {adoptionsDetail.user && (
              <img
                src={adoptionsDetail.user.picture || "Unknown user"}
                alt="owner-photo"
                className="adoption-details-owner-photo" // Owner's photo
              />
            )}

            {/* Additional debugging info */}
            {adoptionsDetail.user && (
              <p>
                <strong>Contact:</strong>{" "}
                {adoptionsDetail.user.email || "No contact information"}{" "}
                {/* Contact information of the owner */}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionDetails;
