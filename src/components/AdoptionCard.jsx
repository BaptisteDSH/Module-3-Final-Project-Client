import { Link } from "react-router-dom";

import React, { useEffect } from "react";

const AdoptionCard = ({ oneAdoption, setAdoptions }) => {
  

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
