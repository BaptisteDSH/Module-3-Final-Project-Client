import { Link } from "react-router-dom";
import React from "react";

const AdoptionCard = ({ oneAdoption, setAdoptions }) => {
  const { pet, description, location, pictures } = oneAdoption;
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
          <h4>{pet?.name || "No pet name available"} </h4>
          <p> {description}</p>
          <div className="event-location">
            <h2>{location}</h2>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default AdoptionCard;
