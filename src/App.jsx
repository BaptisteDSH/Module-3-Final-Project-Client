import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdoptPage from "./pages/AdoptPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import { useState, useEffect } from "react";
import AboutUsPage from "./pages/AboutUsPage";
import MyProfilPage from "./pages/MyProfilPage";
import CreateEventPage from "./pages/CreateEventPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import AdoptionDetails from "./pages/AdoptionDetails";
import CreateAdoption from "./components/CreateAdoption";
import IsPrivate from "./components/IsPrivate";
import EditProfilPage from "./pages/EditProfilPage";
import AddPet from "./pages/AddPet";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

const App = () => {
  const [events, setEvents] = useState([]);
  const [adoptions, setAdoptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch events
        const eventsData = await axios.get("http://localhost:5005/api/events");
        setEvents(eventsData.data);

        // Fetch adoptions
        const adoptionsData = await axios.get(
          "http://localhost:5005/api/adoptions"
        );
        setAdoptions(adoptionsData.data);
      } catch (error) {
        console.log("Something is wrong with fetching all the data");

        // Error toast notification
        toast.error("Failed to fetch data!");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              events={events}
              setEvents={setEvents}
              adoptions={adoptions}
              setAdoptions={setAdoptions}
            />
          }
        />
        <Route
          path="/Adopt"
          element={
            <AdoptPage adoptions={adoptions} setAdoptions={setAdoptions} />
          }
        />
        <Route path="/AboutUs" element={<AboutUsPage />} />
        <Route
          path="/MyProfil"
          element={
            <IsPrivate>
              <MyProfilPage />
            </IsPrivate>
          }
        />
        <Route path="/EditProfile" element={<EditProfilPage />} />
        <Route path="/AddPet" element={<AddPet />} />
        <Route path="/Events" element={<EventsPage />} />
        <Route path="/Events/Create" element={<CreateEventPage />} />
        <Route path="/Event/:eventId" element={<EventDetailPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route
          path="/Adoptions/:adoptionId"
          element={
            <AdoptionDetails
              adoptions={adoptions}
              setAdoptions={setAdoptions}
            />
          }
        />
        <Route path="/CreateAdoption" element={<CreateAdoption />} />
      </Routes>
      <Footer />

      {/* ToastContainer to display toasts */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default App;
