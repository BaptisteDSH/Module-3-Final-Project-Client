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
        const adoptionsData = await axios.get("");
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
        <Route path="/Adopt" element={<AdoptPage />} />
        <Route path="/AboutUs" element={<AboutUsPage />} />
        <Route path="/MyProfil" element={<MyProfilPage />} />
        <Route path="/Events" element={<EventsPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
