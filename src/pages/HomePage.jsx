import React, { useState } from "react";
import EventCard from "../components/EventCard";
import AdoptionCard from "../components/AdoptionCard";
import SearchBar from "../components/SearchBar";
import SkeletonCard from "../components/SkeletonCard";
import { API_URL } from "../config/apiUrl.config";

const HomePage = ({
  events,
  setEvents,
  adoptions,
  setAdoptions,
  isLoading,
}) => {
  // Keep top-level lists sorted by date (newest first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const sortedAdoptions = [...adoptions].sort(
    (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
  );

  // Local search state for the homepage search bar (filters both lists)
  const [query, setQuery] = useState("");

  // Simple text-based filtering (case-insensitive) for quick UX search
  const filterText = (text) =>
    text?.toLowerCase().includes(query.toLowerCase());

  const filteredEvents = sortedEvents.filter((ev) => {
    return (
      filterText(ev.title) ||
      filterText(ev.location) ||
      filterText(ev.description)
    );
  });

  const filteredAdoptions = sortedAdoptions.filter((ad) => {
    return (
      filterText(ad.location) ||
      filterText(ad.pet?.name) ||
      filterText(ad.pet?.type)
    );
  });

  return (
    <>
      <div className="home-page-container">
        <div className="header-home-page">
          <h1>HEY BUDDY!</h1>
          <h3>
            At PAWTY TIME, we connect loving families with their perfect
            companions — adopt, attend local events, or create a listing to help
            a pet find a forever home.
          </h3>

          <div className="hero-cta">
            <a href="/Events" className="cta-button" aria-label="Browse events">
              Browse Events
            </a>
            <a
              href="/Adopt"
              className="cta-button cta-primary"
              aria-label="See pets for adoption"
            >
              Adopt Now
            </a>
          </div>
        </div>
        <h2>Highlighted Events</h2>
        <div className="homepage-cards-container events-container">
          {isLoading ? (
            // show 3 skeletons while loading
            [0, 1, 2].map((i) => (
              <div key={i} className="event-element">
                <SkeletonCard />
              </div>
            ))
          ) : filteredEvents.length > 0 ? (
            filteredEvents.slice(0, 3).map((event) => (
              <div key={event._id} className="event-element">
                <EventCard {...event} />
              </div>
            ))
          ) : (
            <p className="muted" style={{ textAlign: "center", width: "100%" }}>
              No events match your search.
            </p>
          )}
        </div>
        <h2>Latest Adoptions</h2>
        <div className="homepage-cards-container adoptions-container">
          {isLoading ? (
            [0, 1, 2].map((i) => (
              <div key={i} className="adoption-element">
                <SkeletonCard />
              </div>
            ))
          ) : filteredAdoptions.length > 0 ? (
            filteredAdoptions.slice(0, 3).map((oneAdoption) => (
              <div key={oneAdoption._id} className="adoption-element">
                <AdoptionCard
                  oneAdoption={oneAdoption}
                  setAdoptions={setAdoptions}
                />
              </div>
            ))
          ) : (
            <p className="muted" style={{ textAlign: "center", width: "100%" }}>
              No adoptions match your search.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
