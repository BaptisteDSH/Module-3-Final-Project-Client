import React from "react";
import EventCard from "../components/EventCard";
import AdoptionCard from "../components/AdoptionCard";
import { API_URL } from "../config/apiUrl.config";

const HomePage = ({ events, setEvents, adoptions, setAdoptions }) => {
  const sortedEvents = [...events].sort((a, b) => b.date - a.date);
  const sortedAdoptions = [...adoptions].sort((a, b) => b.date - a.date);

  return (
    <>
      <div className="home-page-container">
        <div className="header-home-page">
          <h1> HEY BUDDY !</h1>
          <h3>
            At PAWTY TIME, we’re dedicated to connecting loving families with
            their perfect furry companions. Whether you’re looking to adopt a
            pet or attend exciting pet-related events, our platform provides a
            seamless experience. Join us in giving animals a forever home and
            celebrating the joy they bring into our lives!
          </h3>
        </div>
        <h2>Highlighted Events</h2>
        <div className="homepage-cards-container">
          {sortedEvents.slice(0, 3).map((event) => {
            return (
              <div key={event._id} className="event-element">
                <EventCard {...event} />
              </div>
            );
          })}
        </div>
        <h2>Latest Adoptions</h2>
        <div className="homepage-cards-container">
          {sortedAdoptions.slice(0, 3).map((oneAdoption) => {
            return (
              <div key={oneAdoption._id} className="adoption-element">
                <AdoptionCard
                  oneAdoption={oneAdoption}
                  setAdoptions={setAdoptions}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
