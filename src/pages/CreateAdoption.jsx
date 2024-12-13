import React, { useState } from "react";
import axios from "axios";

const CreateAdoption = ({ adoptions, setAdoptions }) => {
  const [newAdoption, setNewAdoption] = useState({
    //set to default to current date, in international format, separated at the "T", and displaying only the date ([0])
    datePosted: new Date().toISOString().split("T")[0],
    description: "",
    pet: { name: "" },
    picture: "",
    userName: "",
    userPhone: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newAdoption.description ||
      !newAdoption.pet.name ||
      !newAdoption.picture ||
      !newAdoption.userName ||
      !newAdoption.userPhone
    ) {
      alert("Please fill in all required fields");
      return;
    }
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
        picture: "",
        userName: "",
        userPhone: "",
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
      <h2>CreateAdoption</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date Posted:</label>
          <input
            type="date"
            name="datePosted"
            value={newAdoption.datePosted}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Description:</label>

          <textarea
            name="datePosted"
            value={newAdoption.datePosted}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            name="datePosted"
            value={newAdoption.datePosted}
            onChange={handleChange}
            placeholder="Enter description"
          ></input>
        </div>
        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            name="petName"
            value={newAdoption.pet.name}
            onChange={handleChange}
            placeholder="Enter pet name"
          ></input>
        </div>
        <div>
          <label>Picture URL:</label>
          <input
            type="text"
            name="picture"
            value={newAdoption.picture}
            onChange={handleChange}
            placeholder="Enter picture URL"
          ></input>
        </div>
        <div>
          <label>Your Name:</label>
          <input
            type="text"
            name="userName"
            value={newAdoption.userName}
            onChange={handleChange}
            placeholder="Enter user name"
          />
        </div>
        <div>
          <label>Your Number:</label>
          <input
            type="text"
            name="userPhone"
            value={newAdoption.userPhone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>
        <button type="submit">Create Adoption</button>
      </form>
    </div>
  );
};

export default CreateAdoption;
