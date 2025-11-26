import { Link } from "react-router-dom";
import React from "react";

// `AdoptionCard` is a presentational component used to render a single
// adoption listing. It demonstrates usage of `props` and destructuring:
// - `oneAdoption` (object) is the adoption data passed from a parent page
// - `setAdoptions` (function) is a setter that could be used to update the
//   parent state (example of passing state setters as props)
const AdoptionCard = ({ oneAdoption, setAdoptions }) => {
  // Destructure the relevant fields from the adoption object for clarity
  const { pet, description, location, datePosted, pictures } = oneAdoption;
  return (
    <div>
      <Link to={`/adoptions/${oneAdoption._id}`}>
        <section className="card-container">
          <div>
            <img
              src={pictures?.[0] || "https://shorturl.at/I39cR"}
              alt={pet?.name || "pet image"}
            />
          </div>
          <div className="card-p-container">
            <div className="card-name">
              <h3>{pet?.name || "No pet name available"} </h3>
            </div>
            <p className="card-excerpt">
              {description
                ? description.slice(0, 100) +
                  (description.length > 100 ? "…" : "")
                : ""}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p className="muted">{location}</p>
              <p className="muted">
                {new Date(datePosted).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default AdoptionCard;
