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
            {sortedEvents && sortedEvents.length > 0 ? (
              sortedEvents.map((event) => (
                <div key={event._id}>
                  <EventCard {...event} />
                </div>
              ))
            ) : (
              <p>No events available.</p>
            )}
          </div>
          <div className="event-element">
            {/* <img src="" alt="" /> */}
            <h4>title of the event</h4>
            <p>little description</p>
          </div>
          <div className="event-element">
            {/* <img src="" alt="" /> */}
            <h4>title of the event</h4>
            <p>little description</p>
          </div>
        </div>
        <h3>Adoptions</h3>
        <div className="adoption-block-home-page-container">
          <div className="adoption-list">
            {sortedAdoptions.slice(0, 3).map((oneAdoption) => {
              return (
                <div className="adoption-element">
                  <div key={oneAdoption._id}>
                    <AdoptionCard
                      oneAdoption={oneAdoption}
                      setAdoptions={setAdoptions}
                    />
                  </div>
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
