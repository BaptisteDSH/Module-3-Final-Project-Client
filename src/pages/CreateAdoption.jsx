import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const CreateAdoption = ({ adoptions, setAdoptions }) => {
  const { user } = useContext(AuthContext);
 

  const [newAdoption, setNewAdoption] = useState({
    //set to default to current date, in international format, separated at the "T", and displaying only the date ([0])
    datePosted: new Date().toISOString().split("T")[0],
    description: "",
    pet: { name: "" },
    pictures: [],
    user: user._id,
  });

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




  
  //handleImageUpload allows to upload multiple pictures directly in the form
  async function handleImageUpload(e) {
    //prevent the form from reloading
    e.preventDefault();
    //Retrieve the files from the event
    const images = e.target.files;
    console.log(images);
    //create formData (multer on the server expects form data)
    const myFormData = new FormData();

    // Change the images state to an array so we can call the .forEach( ) on it
    //for each image, add it to the form data
    Array.from(images).forEach((image) => {
      myFormData.append("imageUrl", image);
    });
    try {
      const { data } = await axios.post(
        "http://localhost:5005/uploads/multiple-uploads",
        myFormData
      );
      console.log("image uploaded successfully", data);
      //   nav("/home");
      // Add the returned image URLs to the state
      setNewAdoption((prevState) => ({
        ...prevState,
        pictures: [...prevState.pictures, ...data.imageUrls],
      }));
    } catch (error) {
      console.log(error);
    }
    console.log(...data.imageUrls);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5005/api/adoptions",
        newAdoption
      );
      //This adds the newly created adoption to the adoptions array
      setAdoptions([...adoptions, newAdoption]);

      //Resetting the form after submission
      setNewAdoption({
        datePosted: new Date().toISOString().split("T")[0],
        description: "",
        pet: { name: "" },
        pictures: [],
        user: user._id,
      });
    } catch (error) {
      console.log(
        "This is why you cannot create the adoption",
        error.response.data
      );
      alert("An error occurred while creating the adoption.");
    }
  };

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
      <form onSubmit={handleImageUpload}>
        <div>
          <label>Upload Pictures</label>
          <input
            type="file"
            name="pictures"
            multiple
            placeholder="Upload your adoptions' pictures"
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateAdoption;
