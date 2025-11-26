import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EventCard = ({
  _id,
  pictures = [],
  title = "",
  description = "",
  location = "",
  date,
}) => {
  return (
    <div>
      <Link to={`/Event/${_id}`} className="event-link">
        <section className="card-container">
          <div>
            <img
              src={pictures?.[0] || "https://shorturl.at/I39cR"}
              alt={title || "event image"}
              className="card-img"
            />
          </div>

          <div className="card-p-container">
            <div className="card-name">
              <h3>{title}</h3>
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
                {date ? new Date(date).toLocaleDateString() : ""}
              </p>
            </div>
          </div>
        </section>
      </Link>
    </div>
  );
};

EventCard.propTypes = {
  _id: PropTypes.string,
  pictures: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

export default EventCard;
