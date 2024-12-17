import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdoptionCard from "../components/AdoptionCard";

const AdoptPage = ({ adoptions, setAdoptions }) => {
  const [query, setQuery] = useState(""); // Added state for search query
  const [filteredAdoptions, setFilteredAdoptions] = useState(adoptions); // State to store filtered adoptions

  // Function to filter adoptions by location
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery === "") {
      // If query is empty, show all adoptions
      setFilteredAdoptions(adoptions);
    } else {
      // Filter adoptions by location
      const filtered = adoptions.filter((adoption) =>
        adoption.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAdoptions(filtered);
    }
  };

  // Sort adoptions by date
  const sortedAdoptions = [...filteredAdoptions].sort(
    (a, b) => b.date - a.date
  );

  return (
    <>
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

        {/* Search bar for filtering adoptions */}
        <div className="button-add-event-container">
          <div>
            <div className="search-bar-title">Looking for a pet near you?</div>
            <div className="search-bar-container">
              <input
                type="text"
                value={query}
                onChange={handleSearch}
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

        <div className="event-container">
          <div>
            <div className="event-box-container-wrapper">
              {sortedAdoptions.length > 0 ? (
                sortedAdoptions.map((oneAdoption) => (
                  <div className="event-box-container" key={oneAdoption._id}>
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
        </div>
      </div>
    </>
  );
};

export default AdoptPage;
