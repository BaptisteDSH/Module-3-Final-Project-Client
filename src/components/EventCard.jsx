import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ _id, picture, title, location, date, description }) => {
  return (
    <div>
      <Link to={`/Event/${_id}`} className="event-link">
        <section>
          <div className="card-container">
            <img src={picture} alt="event-img" className="event-image" />
          </div>
          <div className="event-title">
            <h1>{title}</h1>
          </div>
          <div className="event-location">
            <h2>{location}</h2>
          </div>
          <div className="event-date">
            <h3>{date}</h3>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default EventCard;
