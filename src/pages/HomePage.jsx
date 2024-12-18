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
          <p>
            At PAWTY TIME, we’re dedicated to connecting loving families with
            their perfect furry companions. <span />
            Whether you’re looking to adopt a pet or attend exciting pet-related
            events, our platform provides a seamless experience. <span /> Join
            us in giving animals a forever home and celebrating the joy they
            bring into our lives!
          </p>
        </div>
        <h3>Highlighted Events</h3>
        <div className="event-block-home-page-container">
          <div className="event-list">
            {sortedEvents.slice(0, 3).map((event) => {
              return (
                <div key={event._id} className="event-element">
                  <EventCard {...event} />
                </div>
              );
            })}
          </div>
        </div>
        <h3>Latest Adoptions</h3>
        <div className="adoption-block-home-page-container">
          <div className="adoption-list">
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
      </div>
    </>
  );
};

export default HomePage;
