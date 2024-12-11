import React from "react";

const HomePage = ({ events, setEvents, adoptions, setAdoptions }) => {
  const sortedEvents = [...events].sort((a, b) => b.date - a.date);
  // const sortedAdoptions = [...adoptions].sort((a, b) => b.date - a.date);
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
            {sortedEvents.map((oneEvent) => {
              return (
                <div key={oneEvent.id}>
                  <EventCard oneEvent={oneEvent} setEvent={setEvent} />
                </div>
              );
            })}
          </div>
          <div className="event-element">
            <img src="" alt="" />
            <h4>title of the event</h4>
            <p>little description</p>
          </div>
          <div className="event-element">
            <img src="" alt="" />
            <h4>title of the event</h4>
            <p>little description</p>
          </div>
        </div>
        <h3>Adoptions</h3>
        <div className="adoption-block-home-page-container">
          <div className="adoption-list">
            {sortedEvents.map((oneAdoption) => {
              return (
                <div key={oneAdoption.id}>
                  <AdoptionCard
                    oneAdoption={oneAdoption}
                    setAdoption={setAdoption}
                  />
                </div>
              );
            })}
          </div>
          <div className="adoption-element">
            <h4>title of the adoption post</h4>
            <p>little description</p>
            <img src="" alt="" />
          </div>
          <div className="adoption-element">
            <h4>title of the adoption post</h4>
            <p>little description</p>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
