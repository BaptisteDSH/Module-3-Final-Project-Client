import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EventCard from "../components/EventCard";

// Import the string from the .env with URL of the server - http://localhost:5005
const API_URL = `http://localhost:5005`;

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    axios
      .get(`${API_URL}/api/events`)
      .then((response) => {
        console.log(response.data);
        setEvents(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.log("Error fetching events:", error);
        setEvents([]);
      });
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <div className="events-page-container">
        <div className="image-container">
          <img src="https://www.educateurcaninfrance.com/wp-content/uploads/2024/05/GettyImages-1317531965-1.jpg" />
          <div className="text-overlay">
            <h1>It's Pawty time !</h1>
          </div>
        </div>
        <div className="button-add-event-container">
          <h2>Are you the organiser ?</h2>
          <h4>Click here to start !</h4>
          <div>
            <Link to="/events/create">
              <div className="log-button">Add an event</div>
            </Link>
          </div>
        </div>
        <div className="search-bar">SEARCH BAR TO CREATE</div>
        <div className="event-container">
          <div>
            <div className="event-box-container">
              {events && events.length > 0 ? (
                events.map((event) => (
                  <div key={event._id}>
                    <EventCard {...event} />
                  </div>
                ))
              ) : (
                <p>No events available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
