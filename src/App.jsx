import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdoptPage from "./pages/AdoptPage";
import EventsPage from "./pages/EventsPage";
import { useState, useEffect } from "react";
import AboutUsPage from "./pages/AboutUsPage";
import MyProfilPage from "./pages/MyProfilPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import AdoptionDetails from "./pages/AdoptionDetails";

const App = () => {
  const [events, setEvents] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch events
        const eventsData = await axios.get("");
        setEvents(eventsData.data);

        //fetch adoptions
        const adoptionsData = await axios.get(
          "http://localhost:5005/api/adoptions"
        );
        setAdoptions(adoptionsData.data);
      } catch (error) {
        console.log("Something is wrong with fetching all the data");
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
        <Route path="/MyProfil" element={<MyProfilPage />} />
        <Route path="/Events" element={<EventsPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route
          path="/adoptions/:adoptionId"
          element={
            <AdoptionDetails
              adoptions={adoptions}
              setAdoptions={setAdoptions}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
