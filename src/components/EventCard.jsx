import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ _id, pictures, title, location, date, description }) => {
  return (
    <div>
      <Link to={`/Event/${_id}`} className="event-link">
        <section>
          <div className="event-image-card-container">
            <img
              src={pictures?.[0] || "https://shorturl.at/I39cR"}
              alt="event-img"
              className="event-image"
            />
          </div>
          <div className="event-title">
            <h3>{title}</h3>
          </div>
          <div className="event-location">
            <h2>{location}</h2>
          </div>
          <div className="event-date">
            <p> {new Date(date).toLocaleDateString()}</p>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default EventCard;
