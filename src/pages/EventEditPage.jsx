import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/apiUrl.config";

const EventEditPage = () => {
  const { user } = useContext(AuthContext);
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Holds the fetched event data
  const [eventToEdit, setEventToEdit] = useState(null);

  // Holds the updated event data
  const [updatedEvent, setUpdatedEvent] = useState({
    title: "",
    location: "",
    date: "",
    price: 0,
    description: "",
    pictures: [],
    organizerId: user ? user._id : "", // Use fallback if user is null
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/events/${eventId}`);
        setEventToEdit(response.data);
      } catch (error) {
        console.error("Error fetching the event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (eventToEdit) {
      setUpdatedEvent({
        title: eventToEdit.title || "",
        location: eventToEdit.location || "",
        date: eventToEdit.date || "",
        price: eventToEdit.price || 0,
        description: eventToEdit.description || "",
        pictures: eventToEdit.pictures || [],
        organizerId: eventToEdit.organizerId,
      });
    }
  }, [eventToEdit]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setUpdatedEvent((prevState) => ({
      ...prevState,
      pictures: files,
    }));
  };

  // Handle form submission
  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    try {
      let uploadedImageUrls = updatedEvent.pictures;

      // Step 1: Upload the images to your backend
      if (updatedEvent.pictures[0] instanceof File) {
        const myFormData = new FormData();
        updatedEvent.pictures.forEach((image) => {
          myFormData.append("imageUrl", image); // Key: "imageUrl"
        });

        // POST the files to your backend
        const uploadResponse = await axios.post(
          `${API_URL}/uploads/multiple-uploads`,
          myFormData
        );

        uploadedImageUrls = uploadResponse.data.imageUrls; // Array of uploaded image URLs
      }

      // Step 2: Prepare the event payload
      const eventPayload = {
        ...updatedEvent,
        pictures: uploadedImageUrls,
        organizerId: user._id,
      };

      // Step 3: Send the PUT request to update the event
      const response = await axios.put(
        `${API_URL}/api/events/${eventId}`,
        eventPayload
      );

      console.log("Event updated successfully:", response.data);
      navigate(`/Event/${eventId}`);
    } catch (error) {
      console.error("Failed to update the event:", error.message);
      alert("An error occurred while updating the event.");
    }
  };

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
    <div>
      <h1>Edit the Event</h1>
      <form onSubmit={handleUpdateEvent}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={updatedEvent.title}
            onChange={handleChange}
            placeholder="Enter the event title"
          />
        </div>
        <div>
          <label>Location:</label>
          <select
            name="location"
            value={updatedEvent.location}
            onChange={handleChange}
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
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={updatedEvent.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={updatedEvent.price}
            onChange={handleChange}
            placeholder="Enter the event price"
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={updatedEvent.description}
            onChange={handleChange}
            placeholder="Enter a description"
          />
        </div>
        <div>
          <label>Upload Pictures:</label>
          <input
            type="file"
            name="pictures"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div>
          <ul>
            {updatedEvent.pictures.map((pic, index) => (
              <li key={index}>
                <img
                  src={pic instanceof File ? URL.createObjectURL(pic) : pic}
                  alt={`Uploaded ${index}`}
                  width="100"
                />
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EventEditPage;
