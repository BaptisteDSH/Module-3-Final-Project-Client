import React from "react";

const MyProfilPage = () => {
  return (
    <>
      <div className="my-profil-page-container">
        <div className="user-detail-container">
          <img src="" alt="" />
          <div className="user-detail-box">
            <h1>User Name</h1>
            <h5>Location</h5>
            <h5>Age</h5>
            <h5>Contacts</h5>
            <p>
              description Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Itaque debitis repellendus iure, culpa facilis voluptates
              consectetur ullam, amet accusamus natus suscipit nemo eius fugiat
              aliquid tenetur doloremque illo optio similique.
            </p>
          </div>

          <div className="button-edit-add-container">
            <button>Edit</button>
            <button>Add a pet</button>
          </div>
          <div className="user-pet-container">
            <div className="pet-detail-box">
              <img src="" alt="" />
              <h3>name of the pet</h3>
              <h5>age of the pet</h5>
            </div>
          </div>
          <div className="user-event-container">
            <div className="event-detail-box">
              <img src="" alt="" />
              <h3>name of the event</h3>
            </div>
          </div>
          <div className="user-adoption-container">
            <div className="adoption-detail-box">
              <img src="" alt="" />
              <h3>title of the adoption post</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfilPage;
