import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ _id, pictures, title, location, date, description }) => {
  return (
    <div>
      <Link to={`/Event/${_id}`} className="event-link">
        <section className="card-container">
          <div>
            <img
              src={pictures?.[0] || "https://shorturl.at/I39cR"}
              alt="event-img"
              className="card-img"
            />
          </div>
          <div className="card-p-container">
            <div className="card-name">
              <h3>{title}</h3>
            </div>

            <p>{location}</p>

            <p> {new Date(date).toLocaleDateString()}</p>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default EventCard;
