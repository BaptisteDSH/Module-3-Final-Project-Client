import { Link } from "react-router-dom";
import React from "react";

const AdoptionCard = ({ oneAdoption, setAdoptions }) => {
  const { pet, description, location, datePosted, pictures } = oneAdoption;
  return (
    <div>
      <Link to={`/adoptions/${oneAdoption._id}`} className="event-link">
        <section>
          <div className="event-image-card-container">
            <img
              src={pictures?.[0] || "https://shorturl.at/I39cR"}
              alt="event-img"
              className="event-image"
            />
          </div>
          <h3>{pet?.name || "No pet name available"} </h3>
          <div className="event-location">
            <h2>{location}</h2>
          </div>
          <div className="event-date">
            <p> {new Date(datePosted).toLocaleDateString()}</p>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default AdoptionCard;
