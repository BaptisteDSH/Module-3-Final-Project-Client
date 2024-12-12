import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ _id, picture, title, location, dates }) => {
  return (
    <div>
      <section>
        <Link to={`/Event/${_id}`}>
          <div>
            <span>{picture}</span>
          </div>
          <div>
            <h1>{title}</h1>
          </div>
          {/* <div>
            <h2>{location}</h2>
          </div>
          <div>
            <h3>{date}</h3>
          </div> */}
        </Link>
      </section>
    </div>
  );
};

export default EventCard;
