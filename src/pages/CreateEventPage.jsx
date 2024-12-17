import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const CreateEventPage = ({ events, setEvents }) => {
  const { user } = useContext(AuthContext);
  const [newEvent, setNewEvent] = useState({
    title: "",
    picture: "",
    location: "",
    date: "",
    organizerId: user?._id,
  });

  //   console.log(user);

  //   const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //Handle dynamic change for each input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Handle event submission
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    console.log(newEvent);
    if (!newEvent.title || !newEvent.location || !newEvent.date) {
      alert("Please fill in all required fields.");
      return;
    }

    //Send POST to server
    try {
      const response = await axios.post(
        "http://localhost:5005/api/events/create",
        newEvent
      );
      console.log("Event created:", response.data);

      //If the res is ok, add the event to the list
      if (response.status === 201) {
        setEvents([...events, response.data]);

        setNewEvent({
          title: "",
          picture: "",
          location: "",
          date: "",
          price: "",
          organizerId: user?._id,
        });

        //redirect to the events page, afte we can change it to details page of created event
        navigate("/Events");
      } else {
        alert("Error when creating the event.");
      }
    } catch (error) {
      console.error("An error occurred while creating the event:", error);
    }
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
            value={newEvent.title}
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
            value={newEvent.location}
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
            value={newEvent.date}
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
            value={newEvent.picture}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter URL for your events's picture"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={newEvent.price}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter the price of the even or leave it blank if it is free"
          />
        </div>
        <div>
          <button className="log-button"> Add Event</button>
        </div>
      </form>
    </>
  );
};

export default CreateEventPage;
