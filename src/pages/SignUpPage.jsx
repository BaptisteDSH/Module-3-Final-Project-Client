import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../config/apiUrl.config";

const SignUpPage = () => {
  // Local component state managed with `useState`.
  // Each call returns [value, setter]. Calling the setter triggers a re-render
  // of this component with the new state value.
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  // `description` currently unused but kept for demonstration of state
  const [description] = useState("");
  const [picture, setPicture] = useState("");
  const [phone, setPhone] = useState("");
  // `pet` is an object stored in state; note how updates use the functional
  // form `setPet(prev => ({ ...prev, field: value }))` to preserve other fields.
  const [pet, setPet] = useState({
    petType: "",
    petName: "",
    petDescription: "",
    petPicture: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // List of locations
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

  // List of pet types
  const petTypes = [
    "dog",
    "cat",
    "bird",
    "snake",
    "spider",
    "hamster",
    "ferret",
    "fish",
    "guinea pigs",
  ];

  // Handle changes in pet details
  const handlePetChange = (e) => {
    const { name, value } = e.target;
    // Update a nested object in state by copying the previous object and
    // overwriting the changed field. This prevents losing other `pet` fields.
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  // Validate the form before submitting
  const validateForm = () => {
    if (!name || !lastName || !email || !password || !location) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    // Age is optional; if provided, ensure it's a positive number
    if (age !== "" && (isNaN(age) || Number(age) < 1)) {
      setErrorMessage("Please enter a valid age.");
      return false;
    }
    return true;
  };

  // Handle file selection
  const handleFileChange = (e, setFile) => {
    // Files from <input type="file" /> are File objects. We store the File in
    // React state so it can be uploaded later when the form is submitted.
    const file = e.target.files[0];
    setFile(file);
  };

  // Handle form submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      toast.error(errorMessage);
      return;
    }

    try {
      //Step 1: upload images to Cloudinary

      const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("imageUrl", file);

        //API call to upload the images

        const response = await axios.post(
          `${API_URL}/uploads/multiple-uploads`,
          formData
        );
        return response.data.imageUrls[0];
      };

      // If the user selected files, upload them and get back URLs.
      // Note: uploadImage expects a File; if `picture` or `pet.petPicture`
      // are empty/undefined you may want to skip the upload.
      const uploadedProfilePicture = picture ? await uploadImage(picture) : "";
      const uploadedPetPicture = pet.petPicture
        ? await uploadImage(pet.petPicture)
        : "";

      //Step 2, prepare the payload

      const requestBody = {
        name,
        lastName,
        email,
        password,
        location,
        age,
        description,
        // Use the uploaded URL if available, else an empty string
        picture: uploadedProfilePicture || "",
        phone,
        pet: { ...pet, petPicture: uploadedPetPicture || "" },
      };

      // Send POST request to the server
      await axios.post(`${API_URL}/api/user/signup`, requestBody);

      // Show success message
      toast.success("Account created successfully! Redirecting to login...");

      // Wait for the toast to be visible before navigating
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      // Basic frontend error handling: transform and display server errors
      const errorDescription =
        error.response?.data?.message || "Signup failed. Please try again.";
      setErrorMessage(errorDescription);
      toast.error(errorDescription);
    }
  };

  // Handle form submission
  // const handleSignUpSubmit = (e) => {
  //   e.preventDefault();
  //   setErrorMessage("");

  //   if (!validateForm()) return;

  //   const requestBody = {
  //     name,
  //     lastName,
  //     email,
  //     password,
  //     location,
  //     age,
  //     description,
  //     picture,
  //     phone,
  //     pet,
  //   };

  //   console.log("Request body:", requestBody); // Debugging

  //   axios
  //     .post(`${API_URL}/api/user/signup`, requestBody)
  //     .then(() => {
  //       toast.success("Your profile has been created!");
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       console.error("Error during signup:", error); // Debugging
  //       const errorDescription =
  //         error.response?.data?.message ||
  //         "An unexpected error occurred. Please try again.";
  //       setErrorMessage(errorDescription);
  //     });
  // };

  return (
    <>
      <div className="sign-up-page-container">
        <div className="signup-wrapper">
          <div className="signup-visual" aria-hidden>
            {/* decorative image or illustration */}
            <img
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1400&auto=format&fit=crop&crop=faces"
              alt="pets"
            />
          </div>

          <div className="signup-card">
            <h1 className="sign-up-title-h1">Welcome!</h1>

            <form onSubmit={handleSignUpSubmit} className="form-signup">
              <div className="signup-names">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-input"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group age-group">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="form-input"
                    placeholder="Enter your age (optional)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 1 23 45 67 89"
                    className="form-input-cloudify"
                    required
                  />
                </div>

                <div className="form-input-cloudify">
                  <label htmlFor="picture" className="form-label">
                    Picture
                  </label>
                  <input
                    type="file"
                    name="picture"
                    id="picture"
                    // value={picture}
                    onChange={(e) => handleFileChange(e, setPicture)}
                    className="form-input-cloudify"
                    placeholder="Enter URL "
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Choose a secure password"
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
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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

              <h2 className="sign-up-title-h2">Tell us about your pet!</h2>

              <div className="pet-infos">
                <div className="form-group">
                  <label htmlFor="petType" className="form-label">
                    Pet Type
                  </label>
                  <select
                    name="petType"
                    id="petType"
                    value={pet.petType}
                    onChange={handlePetChange}
                    className="form-input"
                  >
                    <option value=""></option>
                    {petTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="petName" className="form-label">
                    Pet Name
                  </label>
                  <input
                    type="text"
                    name="petName"
                    id="petName"
                    value={pet.petName}
                    onChange={handlePetChange}
                    className="form-input"
                    placeholder="Enter your pet's name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="petDescription" className="form-label">
                    Pet Description
                  </label>
                  <input
                    type="text"
                    name="petDescription"
                    id="petDescription"
                    value={pet.petDescription}
                    onChange={handlePetChange}
                    className="form-input"
                    placeholder="Describe your pet"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="petPicture" className="form-label">
                    Pet Picture
                  </label>
                  <input
                    className="form-input-cloudify"
                    type="file"
                    name="petPicture"
                    id="petPicture"
                    // value={pet.petPicture}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setPet((prev) => ({ ...prev, petPicture: file }));
                    }}
                    placeholder="Enter URL for your pet's picture"
                  />
                </div>
              </div>

              <div className="form-group">
                <button type="submit" className="form-button">
                  Sign Up
                </button>
              </div>
            </form>

            <div className="redirection-container">
              <p>Already have an account?</p>
              <Link to="/login">
                <div className="login-redirect">Login</div>
              </Link>
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
