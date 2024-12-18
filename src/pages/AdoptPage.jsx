import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdoptionCard from "../components/AdoptionCard";

const AdoptPage = ({ adoptions, setAdoptions }) => {
  const [query, setQuery] = useState(""); // State for search query
  const [filteredAdoptions, setFilteredAdoptions] = useState([]); // State for filtered adoptions

  // Update filtered adoptions whenever the adoptions or search query changes
  useEffect(() => {
    if (query === "") {
      setFilteredAdoptions(adoptions); // Show all adoptions if query is empty
    } else {
      const filtered = adoptions.filter((adoption) =>
        adoption.location?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAdoptions(filtered);
    }
  }, [query, adoptions]);

  // Sort adoptions by date (newest first)
  const sortedAdoptions = [...filteredAdoptions].sort(
    (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
  );

  return (
    <>
      {/* Image Header */}
      <div className="events-page-container">
        <div className="event-image-container">
          <img
            src="https://media.newyorker.com/photos/606b51c2313f23423168acbe/master/w_2240,c_limit/Brewer-CompanionDogApplication.jpg"
            alt="adoption-img"
          />
          <div className="event-text-overlay">
            <h1>Find Your Furever Friend!</h1>
          </div>
        </div>

        {/* Search Bar and Add Adoption Button */}
        <div className="button-add-event-container">
          <div className="search-bar-wrapper">
            <div className="search-bar-title">Looking for a pet near you?</div>
            <div className="search-bar-container">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search adoptions by location"
                className="search-bar"
              />
            </div>
          </div>
          <div>
            <Link to="/CreateAdoption">
              <button className="log-button">Add an adoption</button>
            </Link>
          </div>
        </div>

        {/* Adoption Cards */}
        <div className="adoption-container">
          {sortedAdoptions.length > 0 ? (
            sortedAdoptions.map((oneAdoption) => (
              <div key={oneAdoption._id} className="adoption-box-container">
                <AdoptionCard
                  oneAdoption={oneAdoption}
                  setAdoptions={setAdoptions}
                />
              </div>
            ))
          ) : (
            <p>No adoptions found matching your search.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdoptPage;
