import { Link } from "react-router-dom";

import React, { useEffect } from "react";

const AdoptionCard = ({ oneAdoption, setAdoptions }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        "http://localhost:5005/api/adoptions/${oneAdoption._id}"
      );
      setAdoptions((prevAdoption) =>
        prevAdoption.filter((adoption) => adoption._id !== oneAdoption._id)
      );
      alert("Adoption deleted successfully!");
    } catch (error) {
      console.error("Error deleting adoption:", error);
    }
  };

  const { pet, description } = oneAdoption;
  return (
    <Link to={`/adoptions/${oneAdoption._id}`}>
      <div>
        <section>
          {/* <img src={picture} alt={pet.name}>
          {" "}
        </img> */}
          <h4>{pet.name} </h4>
          <p> {description}</p>
        </section>
      </div>
    </Link>
  );
};

export default AdoptionCard;
