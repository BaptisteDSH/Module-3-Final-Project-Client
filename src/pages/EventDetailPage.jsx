import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
            <div>
              <h1>{event.title}</h1>
            </div>
            <div>
              <img src={event.picture} alt="event-picture" />
            </div>
            <div>
              <p>{event.location}</p>
            </div>
            <div>
              <p>{event.date}</p>
            </div>
            <div>
              <p>{event.price}</p>
            </div>
          </>
        )}
      </div>
      
    </>
  );
};

export default EventDetailPage;
