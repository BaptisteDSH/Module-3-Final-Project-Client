import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import AdoptionCard from "../components/AdoptionCard";
import EventCard from "../components/EventCard";
import { API_URL } from "../config/apiUrl.config";

const MyProfilePage = ({
  adoptions = [],
  setAdoptions,
  events = [],
  setEvents,
}) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { user, isLoggedIn, setIsLoggedIn, logOutUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // Handle profile deletion
  const handleDeleteProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}/api/user/${user._id}`);
      setUserProfile(null);
      setIsLoggedIn(false);
      logOutUser();
      toast.success("Your profile has been deleted successfully!");
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      toast.error("An error occurred while deleting your profile.");
    }
  };

  // Fetch user profile data
  useEffect(() => {
    if (user && user._id) {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        axios
          .get(`${API_URL}/api/user/${user._id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            setUserProfile(response.data);
          })
          .catch((error) => {
            setErrorMessage(
              error.response?.data?.message || "An error occurred"
            );
          })
          .finally(() => setLoading(false));
      } else {
        setErrorMessage("User not logged in");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  // Handle adoption and event deletion
  const handleDeleteAdoption = async (adoptionId) => {
    try {
      await axios.delete(`${API_URL}/api/adoptions/${adoptionId}`);
      setAdoptions((prev) =>
        prev.filter((adoption) => adoption._id !== adoptionId)
      );
      toast.success("Adoption deleted successfully!");
    } catch (error) {
      console.error("Error deleting adoption:", error);
      toast.error("Failed to delete the adoption.");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`${API_URL}/api/events/${eventId}`);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete the event.");
    }
  };

  if (errorMessage) return <div>{errorMessage}</div>;
  if (loading) return <div>Loading...</div>;

  // Filtering for only user created adoptions and events
  const userAdoptions = adoptions.filter(
    (adoption) => adoption.user === user._id
  );
  const userEvents = events.filter((event) => event.organizerId === user._id);

  return (
    <div className="my-profile-page-container">
      <div className="user-detail-container">
        <img
          src={
            userProfile?.picture ||
            "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW4lMjBiZWluZ3xlbnwwfHwwfHx8MA%3D%3D"
          }
          alt="Profile"
        />
        <div className="myprofile-infos">
          <h1>{userProfile?.name}</h1>
          <h5>{userProfile?.lastName}</h5>
          <h5>{userProfile?.age} years</h5>
          <h5>{userProfile?.phone}</h5>
          <br></br>
          <p>{userProfile?.description}</p>

          <div className="myprofile-buttons-edit-add-container">
            <Link to="/EditProfile">
              <button className="myprofile-button">Edit Profile</button>
            </Link>
            <Link to="/AddPet">
              <button className="myprofile-button">Add pet</button>
            </Link>
          </div>
        </div>
      </div>
      <h2 className="myprofile-h2">Your Pets</h2>
      <br></br>
      <div className="user-cards-container">
        {/* <div className="pet-detail-box"> */}
          {userProfile?.pet?.length > 0 ? (
            userProfile.pet.map((pet, index) => (
              <div key={index}>
                <img
                  src={pet.petPicture || "defaultPetPicture.jpg"}
                  alt={pet.petName}
                  
                />
                <div className="pet-detail-description">
                  <h3>{pet.petName}</h3>
                  <h5>{pet.petType}</h5>
                  <p>{pet.petDescription}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No pets added yet.</p>
          )}
        {/* </div> */}
      </div>
      <h2 className="myprofile-h2">Your Events</h2>
      <div className="user-cards-container">
        {userEvents.length > 0 ? (
          userEvents.map((event) => (
            <div key={event._id}>
              <EventCard {...event} setEvents={setEvents} />
              <div className="myprofile-card-button-container">
                <Link to={`/Event/Update/${event._id}`}>
                  <button className="myprofile-button">Edit </button>
                </Link>

                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="myprofile-button-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
      <h2 className="myprofile-h2">Your Adoptions</h2>
      <div className="user-cards-container">
        {userAdoptions.length > 0 ? (
          userAdoptions.map((adoption) => (
            <div key={adoption._id}>
              <AdoptionCard
                oneAdoption={adoption}
                setAdoptions={setAdoptions}
              />
              <div className="myprofile-card-button-container">
                <Link to={`/UpdateAdoptions/${adoption._id}`}>
                  <button className="myprofile-button">Edit </button>
                </Link>

                <button
                  onClick={() => handleDeleteAdoption(adoption._id)}
                  className="myprofile-button-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No adoptions available.</p>
        )}
      </div>
      <div>
        <button
          className="myprofile-button-delete"
          onClick={handleDeleteProfile}
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfilePage;
