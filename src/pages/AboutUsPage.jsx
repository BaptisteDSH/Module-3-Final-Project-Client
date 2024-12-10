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
            <img src={Edvige} alt="Edvige" />
            <a
              href="https://www.linkedin.com/in/edvige-disalvo/"
              target="_blank"
            >
              LinkedIn
            </a>
            <a href="https://github.com/edvigedev">GithHub</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
