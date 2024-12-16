import React from "react";
import Edvige from "../assets/edi.png";
import Baptiste from "../assets/bat.jpg";

const AboutUsPage = () => {
  return (
    <>
      <div className="aboutUs-page-container">
        <header>
          <h1>About</h1>
          <h5>little description of the website</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            sapiente ipsam, deserunt velit mollitia natus autem odit nam harum
            soluta praesentium! Quasi, dignissimos dicta corporis dolore minima
            alias excepturi commodi!Lorem
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
