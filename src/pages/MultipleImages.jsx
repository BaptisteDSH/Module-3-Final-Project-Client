import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../config/apiUrl.config";

const MultipleImages = () => {
  const [images, setImages] = useState();
  //multiple images function
  async function handleImages(e) {
    //prevent the form from reloading
    e.preventDefault();
    //create formData (multer on the server expects form data)
    const myFormData = new FormData();
    // Change the images state to an array so we can call the .forEach( ) on it
    //for each image, add it to the form data
    Array.from(images).forEach((image) => {
      myFormData.append("imageUrl", image);
    });
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/multiple-uploads`,
        myFormData
      );
      console.log("image uploaded successfully", data);
      //   nav("/home");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      {" "}
      <h1>MultipleImages</h1>
      <form onSubmit={handleImages}>
        <label>
          Change Pictures:
          <input
            type="file"
            name="image"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default MultipleImages;
