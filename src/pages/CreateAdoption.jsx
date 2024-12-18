import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/apiUrl.config";

const CreateAdoption = ({ adoptions, setAdoptions }) => {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [newAdoption, setNewAdoption] = useState({
    //set to default to current date, in international format, separated at the "T", and displaying only the date ([0])
    datePosted: new Date().toISOString().split("T")[0],
    location: "",
    description: "",
    pet: { name: "" },
    pictures: [],
    user: user ? user._id : "", // Use fallback if user is null
  });

  if (isLoading) {
    return <p>Loading...</p>; // Display a loading state until user is fetched
  }

  if (!user) {
    return <p>User not authenticated. Please log in.</p>;
  }

  //handleChange function dynamically updates the state of the newAdoption object based on changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "petName") {
      setNewAdoption((prevState) => ({
        ...prevState,
        pet: {
          ...prevState.pet,
          name: value,
        },
      }));
    } else {
      setNewAdoption((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //step 1, upload the images
      const myFormData = new FormData();

      //for each image, add it to the form data
      newAdoption.pictures.forEach((image) => {
        myFormData.append("imageUrl", image);
      });

      //API call to upload the multiple images
      const { data } = await axios.post(
        `${API_URL}/uploads/multiple-uploads`,
        myFormData
      );

      console.log("image uploaded successfully", data);

      //Step 2, Add the returned image URLs to the state
      const adoptionPayload = {
        ...newAdoption,
        pictures: data.imageUrls, // Use the uploaded image URLs
        user: user._id, // Ensure user ID is included
      };

      //Step 3: sending the POST request to create adoption

      const response = await axios.post(
        `${API_URL}/api/adoptions`,
        adoptionPayload
      );

      console.log("Adoption created successfully:", response.data);
      //This adds the newly created adoption to the adoptions array
      setAdoptions([...adoptions, response.data]);

      //Resetting the form after submission
      setNewAdoption({
        datePosted: new Date().toISOString().split("T")[0],
        location: "",
        description: "",
        pet: { name: "" },
        pictures: [],
        user: user ? user._id : "", // Use fallback if user is null
      });

      //Navigating to the adoption page
      navigate("/Adopt");
    } catch (error) {
      console.log(
        "This is why you cannot create the adoption",
        error.response.data
      );
      alert("An error occurred while creating the adoption.");
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
    <div>
      <h2>Create a new Adoption</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date Posted:</label>
          <input
            type="date"
            name="datePosted"
            value={newAdoption.datePosted}
            onChange={handleChange}
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
            value={newAdoption.location}
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
          <label>Description:</label>

          <textarea
            name="description"
            value={newAdoption.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </div>

        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            name="petName"
            value={newAdoption.pet.name}
            onChange={handleChange}
            placeholder="Enter pet name"
            required
          />
        </div>
        <div>
          <label>Upload Pictures</label>
          <input
            type="file"
            name="pictures"
            multiple
            placeholder="Upload your adoptions' pictures"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setNewAdoption((prevState) => ({
                ...prevState,
                pictures: files, // Store files directly in the state
              }));
            }}
          />
        </div>

        <div>
          {/*the uploaded pictures below*/}
          <ul>
            {newAdoption.pictures.map((url, index) => (
              <li key={index}>
                <img src={url} alt={`Uploaded ${index}`} width="100" />
              </li>
            ))}
          </ul>
        </div>

        <button type="submit">Create Adoption</button>
      </form>
      {/* <form onChange={handleImageUpload}></form> */}
    </div>
  );
};

export default CreateAdoption;
