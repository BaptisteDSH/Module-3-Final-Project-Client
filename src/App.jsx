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
// import axios from "axios";

const App = () => {
  const [events, setEvents] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch events
        const eventsData = await axios.get("");
        setEvents(eventsData);

        //fetch adoptions
        const adoptionsData = await axios.get("");
        setAdoptions(adoptionsData);
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
          element={<HomePage events={events} setEvents={setEvents} />}
        />
        <Route path="/Adopt" element={<AdoptPage />} />
        <Route path="/AboutUs" element={<AboutUsPage />} />
        <Route path="/Profil" element={<MyProfilPage />} />
        <Route path="/Events" element={<EventsPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
