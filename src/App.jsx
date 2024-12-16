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
import MyProfilePage from "./pages/MyProfilePage";
import CreateEventPage from "./pages/CreateEventPage";
import EventEditPage from "./pages/EventEditPage";
// import axios from "axios";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import AdoptionDetails from "./pages/AdoptionDetails";
import CreateAdoption from "./pages/CreateAdoption";

const App = () => {
  const [events, setEvents] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch events
        const eventsData = await axios.get("http://localhost:5005/api/events");
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
        <Route path="/MyProfil" element={<MyProfilePage />} />
        <Route path="/Events" element={<EventsPage />} />
        <Route
          path="/Events/Create"
          element={<CreateEventPage events={events} setEvents={setEvents} />}
        />
        <Route path="/Event/:eventId" element={<EventDetailPage />} />
        <Route path="/Event/Update/:eventId" element={<EventEditPage />} />
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
        <Route
          path="/CreateAdoption"
          element={
            <CreateAdoption adoptions={adoptions} setAdoptions={setAdoptions} />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
