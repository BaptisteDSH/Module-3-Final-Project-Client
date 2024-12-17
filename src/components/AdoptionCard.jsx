import { Link } from "react-router-dom";
import React from "react";

const AdoptionCard = ({ oneAdoption, setAdoptions }) => {
  const { picture, pet, description } = oneAdoption;
  return (
    <div>
      <Link to={`/adoptions/${oneAdoption._id}`} className="event-link">
        <section>
          <div className="card-container">
            <img src={picture} alt="pet-picture" className="event-image" />
          </div>
          <div className="event-title">
            <h4>{pet.name} </h4>
          </div>
          <div className="event-date">
            <h2>{pet.datePosted} </h2>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default AdoptionCard;
