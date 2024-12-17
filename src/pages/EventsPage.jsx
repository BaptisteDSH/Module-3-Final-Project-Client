import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EventCard from "../components/EventCard";

// Import the string from the .env with URL of the server - http://localhost:5005
const API_URL = `http://localhost:5005`;

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); //added by Emi
  const [query, setQuery] = useState(""); //added by Emi

  const getAllEvents = () => {
    axios
      .get(`${API_URL}/api/events`)
      .then((response) => {
        console.log(response.data);
        setEvents(Array.isArray(response.data) ? response.data : []);
        setFilteredEvents(response.data); //added by Emi
      })
      .catch((error) => {
        console.log("Error fetching events:", error);
        setEvents([]);
        setFilteredEvents([]); //added by Emi
      });
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  // Function to filter events added by Emi
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery === "") {
      // If the query is empty, show all events
      setFilteredEvents(events);
    } else {
      // Otherwise, filter events by location
      const filtered = events.filter((event) =>
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <>
      <div className="events-page-container">
        <div className="event-image-container">
          <img src="https://www.educateurcaninfrance.com/wp-content/uploads/2024/05/GettyImages-1317531965-1.jpg" />
          <div className="event-text-overlay">
            <h1>It's Pawty time !</h1>
          </div>
        </div>
        <div className="button-add-event-container">
          <h2>Are you the organiser?</h2>
          <h4>Click below to add a new event!</h4>
          <div>
            <Link to="/events/create">
              <div className="log-button">Add an event</div>
            </Link>
          </div>
        </div>
        <div className="search-bar-title">
          Curious if there's something happening near you?
        </div>
        {/* Search Bar added by Emi*/}
        <div className="search-bar-container">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search events by location"
            className="search-bar"
          />
        </div>
        {/* <div className="search-bar">SEARCH BAR TO CREATE</div> */}
        <div className="event-container">
          <div>
            <div className="event-box-container-wrapper">
              {filteredEvents && filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div className="event-box-container" key={event._id}>
                    <EventCard {...event} />
                  </div>
                ))
              ) : (
                <p>No events found matching your search.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
