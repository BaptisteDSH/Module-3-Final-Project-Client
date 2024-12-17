import React from "react";
import EventCard from "../components/EventCard";
import AdoptionCard from "../components/AdoptionCard";

const HomePage = ({ events, setEvents, adoptions, setAdoptions }) => {
  const sortedEvents = [...events].sort((a, b) => b.date - a.date);
  const sortedAdoptions = [...adoptions].sort((a, b) => b.date - a.date);
  return (
    <>
      <div className="home-page-container">
        <div className="header-home-page">
          <h1>HEY BUDDY !</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
            porro beatae nisi molestiae ipsam quia, <span />
            repudiandae consectetur necessitatibus laudantium quas dignissimos
            quis iure at odit aspernatur nostrum minus id reiciendis.
          </p>
        </div>
        <h3>Events</h3>
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
        <h3>Adoptions</h3>
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
