import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

const CreateEventPage = () => {
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  //Handle event submission
  const handleEventSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      title,
      picture,
      location,
      date,
    };

    // Sent post event request to server
    axios
      .post("http://localhost:5005/api/events", requestBody)
      .then(() => {
        navigate("/Events");
      })
      .catch((error) => console.log(error));
  };

  // List of locations to populate the dropdown
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
      <h1>Create a new event!</h1>
      <form onSubmit={handleEventSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
            name="eventPicture"
            id="eventPicture"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            className="form-input"
            placeholder="Enter URL for your events's picture"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
            placeholder="Enter the price of the even or leave it blank if it is free"
          />
        </div>
        <div>
          <Link to="/Events">
            <div className="log-button">Add Event</div>
          </Link>
        </div>
      </form>
    </>
  );
};

export default CreateEventPage;
