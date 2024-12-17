import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";

// const API_URL = `http://localhost:5005`;

const EventEditPage = () => {
  const [eventToEdit, setEventToEdit] = useState({});
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      axios
        .get(`http://localhost:5005/api/events/${eventId}`)
        .then((response) => {
          const oneEvent = response.data;
          setEventToEdit(oneEvent);
        })
        .catch((error) => {
          console.error("Error fetching the event:", error);
        });
    }
  }, [eventId]);

  function handleChange(e) {
    const whatWasTyped = e.target.value;
    const inputThatIsUsed = e.target.name;

    setEventToEdit((prevState) => ({
      ...prevState,
      [inputThatIsUsed]: whatWasTyped,
    }));
  }

  function handleUpdateEvent(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:5005/api/events/${eventId}`, eventToEdit)
      .then((response) => {
        console.log(response.data);
        navigate(`/event/${eventId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const locations = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Girona",
    "Granada",
    "Guadalajara",
    "Gipuzkoa",
    "Huelva",
    "Huesca",
    "Jaén",
    "La Coruña",
    "León",
    "Lleida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Ourense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
  ];

  return (
    <>
      <h1>Edit the event!</h1>
      <form onSubmit={handleUpdateEvent}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={eventToEdit.title || ""}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter the title of the event"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <select
            name="location"
            id="location"
            value={eventToEdit.location || ""}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select a location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date</label>
          <input
            type="text"
            name="date"
            value={eventToEdit.date || ""}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter the date of the event"
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventPicture" className="form-label">
            Event Picture
          </label>
          <input
            type="url"
            name="picture"
            id="eventPicture"
            value={eventToEdit.picture || ""}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter URL for your event's picture"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={eventToEdit.price || ""}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter the price of the event or leave it blank if it is free"
          />
        </div>
        <div>
          <button type="submit" className="log-button">
            Upload your changes!
          </button>
        </div>
      </form>
    </>
  );
};

export default EventEditPage;
