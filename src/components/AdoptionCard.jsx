import { Link } from "react-router-dom";
import React from "react";

const AdoptionCard = ({ oneAdoption, setAdoptions }) => {
  const { pet, description, location, datePosted, pictures } = oneAdoption;
  return (
    <div>
      <Link to={`/adoptions/${oneAdoption._id}`}>
        <section className="card-container">
          <div>
            <img
              src={pictures?.[0] || "https://shorturl.at/I39cR"}
              alt="card-img"
            />
          </div>
          <div className="card-p-container">
            <div className="card-name">
              <h3>{pet?.name || "No pet name available"} </h3>
            </div>
            <p>{location}</p>

            <p> {new Date(datePosted).toLocaleDateString()}</p>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default AdoptionCard;
