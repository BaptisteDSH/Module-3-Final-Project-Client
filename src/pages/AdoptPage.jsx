import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdoptionCard from "../components/AdoptionCard";
import { API_URL } from "../config/apiUrl.config";

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
      <div className="adoption-page-container">
        <div className="adoption-cover-image">
          <img
            src="https://media.newyorker.com/photos/606b51c2313f23423168acbe/master/w_2240,c_limit/Brewer-CompanionDogApplication.jpg"
            alt="adoption-img"
          />
          <div className="adoption-text-overlay">
            <h1>Find Your Furever Friend!</h1>
          </div>
        </div>

        <div>
          <div className="add-adoption-title">
            <h3>Find the perfect home for your pet!</h3>
          </div>

          <Link to="/CreateAdoption">
            <button className="add-adoption-button">Add an adoption</button>
          </Link>
        </div>

        {/* Search Bar and Add Adoption Button */}

        <div className="adoption-search-bar-wrapper">
          <div className="adoption-search-bar-title">
            <h3>Looking for your next pet?</h3>
          </div>
          <div className="adoption-search-bar-container">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search adoptions by location"
              className="search-bar"
            />
          </div>
        </div>

        {/* Adoption Cards */}
        <div className="adoption-details-container">
          {sortedAdoptions.length > 0 ? (
            sortedAdoptions.map((oneAdoption, index) => (
              <AdoptionCard
                key={oneAdoption._id || index}
                oneAdoption={oneAdoption}
                setAdoptions={setAdoptions}
              />
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
