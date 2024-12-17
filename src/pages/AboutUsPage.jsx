import React from "react";
import Edvige from "../assets/edi.png";
import Baptiste from "../assets/bat.jpg";

const AboutUsPage = () => {
  return (
    <>
      <div className="aboutUs-page-container">
        <header>
          <h1 style={{ margin: "20px" }}>About</h1>
          <p style={{ margin: "20px" }}>
            Welcome to our pet adoption and events hub! Our site is dedicated to
            helping animals find their forever homes while keeping you
            up-to-date on exciting events and activities for pets. Whether
            you're looking to adopt a furry friend or get involved in
            pet-related events, we provide a platform for connecting pet lovers
            with animals in need. Join us in making a difference for animals,
            and find your next companion today!
          </p>
        </header>
        <div className="founders">
          <div className="founder">
            <img src={Baptiste} alt="Baptiste" />
            <a
              href="https://www.linkedin.com/in/baptiste-desharbes-bourdin-5637921a1/"
              target="_blank"
            >
              LinkedIn
            </a>
            <a href="https://github.com/BaptisteDSH?tab=repositories">
              GithHub
            </a>
          </div>
          <div className="founder">
            <img src={Edvige} alt="Edvige" />
            <a
              href="https://www.linkedin.com/in/edvige-disalvo/"
              target="_blank"
            >
              LinkedIn
            </a>
            <a href="https://github.com/edvigedev">GithHub</a>
          </div>
          <div className="founder">
            <img
              src="https://media.licdn.com/dms/image/v2/C4D03AQGkaHatIEyt8w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1627353365583?e=1739404800&v=beta&t=bgpZMKZTpeVmukl-Z1lRgGgZyaWh01CMTp4ZDcuwrfs"
              alt="Emilia"
            />
            <a href="https://www.linkedin.com/in/mejunghanns/" target="_blank">
              LinkedIn
            </a>
            <a href="https://github.com/emijunghanns">GithHub</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
