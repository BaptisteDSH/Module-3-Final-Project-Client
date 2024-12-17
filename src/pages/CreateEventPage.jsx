import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const CreateEventPage = ({ events, setEvents }) => {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    title: "",
    pictures: [],
    location: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    organizerId: user ? user._id : "",
  });

  if (isLoading) {
    return <p>Loading...</p>; // Display a loading state until user is fetched
  }

  if (!user) {
    return <p>User not authenticated. Please log in.</p>;
  }

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

    try {
      //Step 1, upload the images
      const myFormData = new FormData();
      //for each image, add it to the form data
      newEvent.pictures.forEach((image) => {
        myFormData.append("imageUrl", image);
      });

      //API call to upload the multiple images
      const { data } = await axios.post(
        "http://localhost:5005/uploads/multiple-uploads",
        myFormData
      );
      console.log("image uploaded successfully", data.imageUrls);

      //Step 2, Add the returned image URLs to the state
      const eventPayload = {
        ...newEvent,
        pictures: data.imageUrls, // Use the uploaded image URLs
        user: user._id, // Ensure user ID is included
      };

      //Step 3: sending the POST request to create event

      const response = await axios.post(
        "http://localhost:5005/api/events/create",
        eventPayload
      );
      console.log("Event created successfully:", response.data);

      //If the res is ok, add the event to the list
      if (response.status === 201) {
        setEvents([...events, response.data]);

        setNewEvent({
          title: "",
          pictures: [],
          location: "",
          date: new Date().toISOString().split("T")[0],
          description: "",
          organizerId: user._id,
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
            required
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
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventPicture" className="form-label">
            Upload Pictures
          </label>
          <input
            type="file"
            name="pictures"
            id="eventPicture"
            placeholder="Upload your adoptions' pictures"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setNewEvent((prevState) => ({
                ...prevState,
                pictures: files, // Store files directly in the state
              }));
            }}
            className="form-input"
          />
        </div>
        <div>
          {/*the uploaded pictures below*/}
          <ul>
            {newEvent.pictures.map((url, index) => (
              <li key={index}>
                <img src={url} alt={`Uploaded ${index}`} width="100" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={newEvent.price}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter the price of the event or leave it blank if it is free"
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="string"
            name="description"
            value={newEvent.description}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter the description of the event"
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
