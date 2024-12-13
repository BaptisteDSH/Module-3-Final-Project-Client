import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdoptionCard from "../components/AdoptionCard";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";

const MyProfilePage = ({ adoptions, setAdoptions, events, setEvents }) => {
  const { user } = useContext(AuthContext);
  const { adoptionId } = useParams();

  //Filtering the adoptions by user ID and sorting them by descrescent date

  const userAdoptions = adoptions.filter(
    (adoption) => adoption.user === user._id
  );
  const sortedAdoptions = [...userAdoptions].sort((a, b) => b.date - a.date);

  //Filtering the events by user ID and sorting them by descrescent date

  const userEvents = events.filter((event) => event.user === user._id);
  const sortedEvents = [...userEvents].sort((a, b) => b.date - a.date);

  //Deleting the adoption card
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5005/api/adoptions/${adoptionId}`);
      setAdoptions((prevAdoption) =>
        prevAdoption.filter((adoption) => adoption._id !== adoptionId)
      );
      alert("Adoption deleted successfully!");
    } catch (error) {
      console.error("Error deleting adoption:", error);
    }
  };

  return (
    <>
      <div className="my-profil-page-container">
        <div className="user-detail-container">
          <img src="" alt="" />
          <div className="user-detail-box">
            <h1>User Name</h1>
            <h5>Location</h5>
            <h5>Age</h5>
            <h5>Contacts</h5>
            <p>
              description Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Itaque debitis repellendus iure, culpa facilis voluptates
              consectetur ullam, amet accusamus natus suscipit nemo eius fugiat
              aliquid tenetur doloremque illo optio similique.
            </p>
          </div>

          <div className="button-edit-add-container">
            <button>Edit</button>
            <button>Add a pet</button>
          </div>
          <div className="user-pet-container">
            <div className="pet-detail-box">
              <img src="" alt="" />
              <h3>name of the pet</h3>
              <h5>age of the pet</h5>
            </div>
          </div>
          <div className="user-event-container">
            <div className="event-detail-box">
              {events && events.length > 0 ? (
                events.map((event) => (
                  <div key={event._id}>
                    <EventCard {...event} />
                  </div>
                ))
              ) : (
                <p>No events available.</p>
              )}
            </div>
          </div>
          <div className="user-adoption-container">
            <div className="adoption-detail-box">
              {sortedAdoptions.map((oneAdoption) => {
                return (
                  <div className="adoption-box-container">
                    <div key={oneAdoption._id}>
                      <AdoptionCard
                        oneAdoption={oneAdoption}
                        setAdoptions={setAdoptions}
                      />
                      <Link to={`/UpdateAdoptions/${oneAdoption._id}`}>
                        <button> Edit</button>
                      </Link>
                      <button onClick={() => handleDelete(oneAdoption._id)}>
                        {" "}
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfilePage;
