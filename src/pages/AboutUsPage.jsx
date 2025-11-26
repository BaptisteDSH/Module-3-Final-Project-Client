import Edvige from "../assets/edi.png";
import Baptiste from "../assets/bat.jpg";

const AboutUsPage = () => {
  return (
    <>
      <div className="aboutUs-page-container">
        <header className="header-about-page">
          <h1>About us</h1>
          <h3>
            Welcome to our pet adoption and events hub! <br></br>Our site is
            dedicated to helping animals find their forever homes while keeping
            you up-to-date on exciting events and activities for pets. Whether
            you&apos;re looking to adopt a furry friend or get involved in
            pet-related events, we provide a platform for connecting pet lovers
            with animals in need. Join us in making a difference for animals,
            and find your next companion today!
          </h3>
        </header>
        <div className="founders">
          <div className="founder">
            <img src={Baptiste} alt="Baptiste" />
            <br></br>
            <h3>Baptiste</h3>
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
            <br></br>
            <h3>Edvige</h3>
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
