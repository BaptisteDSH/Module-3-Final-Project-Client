import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IsPrivate from "./components/IsPrivate";
import { ThemeContext } from "./context/ThemeContext";
import { API_URL } from "./config/apiUrl.config";

// Pages
import HomePage from "./pages/HomePage";
import AdoptPage from "./pages/AdoptPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import AboutUsPage from "./pages/AboutUsPage";
import MyProfilePage from "./pages/MyProfilePage";
import CreateEventPage from "./pages/CreateEventPage";
import EventEditPage from "./pages/EventEditPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdoptionDetails from "./pages/AdoptionDetails";
import EditProfilPage from "./pages/EditProfilPage";
import AddPet from "./pages/AddPet";
import CreateAdoption from "./pages/CreateAdoption";
import UpdateAdoption from "./pages/UpdateAdoption";
import MultipleImages from "./pages/MultipleImages";

const App = () => {
  const [events, setEvents] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const { darkTheme } = useContext(ThemeContext);
  console.log(API_URL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await axios.get(`${API_URL}/api/events`, {
          withCredentials: true,
        });
        setEvents(eventsData.data);

        const adoptionsData = await axios.get(`${API_URL}/api/adoptions`, {
          withCredentials: true,
        });
        setAdoptions(adoptionsData.data);
      } catch (error) {
        console.error("Something is wrong with fetching all the data");
        toast.error("Failed to fetch data!");
      }
    };
    fetchData();
  }, []);

  return (
    <div className={darkTheme ? "dark-theme" : "light-theme"}>
      <Navbar />

      {/* Routes */}
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
          path="/MyProfile"
          element={
            <IsPrivate>
              <MyProfilePage
                events={events}
                setEvents={setEvents}
                adoptions={adoptions}
                setAdoptions={setAdoptions}
              />
            </IsPrivate>
          }
        />
        <Route path="/EditProfile" element={<EditProfilPage />} />
        <Route path="/AddPet" element={<AddPet />} />
        <Route path="/Events" element={<EventsPage />} />
        <Route
          path="/Events/Create"
          element={<CreateEventPage events={events} setEvents={setEvents} />}
        />
        <Route path="/Event/:eventId" element={<EventDetailPage />} />
        <Route
          path="/Event/Update/:eventId"
          element={<EventEditPage events={events} setEvents={setEvents} />}
        />
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
        <Route
          path="/UpdateAdoptions/:adoptionId"
          element={
            <UpdateAdoption adoptions={adoptions} setAdoptions={setAdoptions} />
          }
        />
        <Route path="/multiple-uploads" element={<MultipleImages />} />
      </Routes>

      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default App;
