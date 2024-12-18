import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import icon from "../assets/location-icon.png";
import clock from "../assets/clock-icon.png";
import { API_URL } from "../config/apiUrl.config";

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getEvent = () => {
      axios
        .get(`${API_URL}/api/events/${eventId}`)
        .then((response) => {
          console.log("Fetched Event Data:", response.data); // Debug log
          setEvent(response.data);
        })
        .catch((error) => console.error("Error fetching event:", error));
    };
    getEvent();
  }, [eventId]);

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
                <p> {new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div className="event-detail-price">
                <p>Price of the event: €{event.price}</p>
              </div>
            </div>
            <div className="event-detail-description">
              <p>{event.description}</p>
            </div>
            <div className="event-detail-description">
              {event.organizerId && (
                <p>
                  <strong>Posted by:</strong>{" "}
                  {event.organizerId ? event.organizerId.name : "Unknown user"}
                </p>
              )}
              {event.organizerId && (
                <p>
                  <strong>Contact:</strong>{" "}
                  {event.organizerId
                    ? event.organizerId.email
                    : "No contact information"}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EventDetailPage;
