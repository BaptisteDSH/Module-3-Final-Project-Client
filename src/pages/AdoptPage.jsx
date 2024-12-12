import React from "react";
import AdoptionCard from "../components/AdoptionCard";
import { Link } from "react-router-dom";

const AdoptPage = ({ adoptions, setAdoptions }) => {
  const sortedAdoptions = [...adoptions].sort((a, b) => b.date - a.date);
  return (
    <>
      <div className="adoption-block-home-page-container">
        <div className="button-add-adoption-container">
          <h2>Find the perfect home for your pet</h2>
          <h4>Click here to start !</h4>
          <Link to={"/CreateAdoption"}>
            <button>Add an adoption</button>
          </Link>
        </div>
        <div className="search-bar">SEARCH BAR TO CREATE</div>
        <div className="adoption-container">
          {sortedAdoptions.map((oneAdoption) => {
            return (
              <div className="adoption-box-container">
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
    </>
  );
};

export default AdoptPage;
