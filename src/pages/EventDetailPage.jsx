import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import icon from "../assets/location-icon.png";
import clock from "../assets/clock-icon.png";

const API_URL = `http://localhost:5005`;

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();

  const getEvent = useCallback(() => {
    axios
      .get(`${API_URL}/api/events/${eventId}`)
      .then((response) => {
        const oneEvent = response.data;
        setEvent(oneEvent);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  useEffect(() => {
    getEvent();
  }, [eventId, getEvent]);

  return (
    <>
      <div>
        {event && (
          <>
            <div className="event-detail-title">
              <h1>{event.title}</h1>
            </div>
            <div>
              <img
                src={event.pictures}
                alt="event-picture"
                className="event-detail-picture"
              />
            </div>
            <div className="event-detail">
              <div className="event-detail-location">
                <img src={icon} alt="location" style={{ height: "50px" }} />
                <p>{event.location}</p>
              </div>
              <div className="event-detail-date">
                <img src={clock} alt="time" style={{ height: "50px" }} />
                <p>{event.date}</p>
              </div>
              <div className="event-detail-price">
                <p>Price of the event: €{event.price}</p>
              </div>
            </div>
            <div className="event-detail-description">
              <p>{event.description}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EventDetailPage;
