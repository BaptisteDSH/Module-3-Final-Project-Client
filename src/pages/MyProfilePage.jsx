import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import AdoptionCard from "../components/AdoptionCard";
import EventCard from "../components/EventCard";

const MyProfilePage = ({ adoptions, setAdoptions, events, setEvents }) => {
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
      await axios.delete(`http://localhost:5005/api/user/${user._id}`);
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
          .get(`http://localhost:5005/api/user/${user._id}`, {
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

  // Handle adoption deletion
  const handleDeleteAdoption = async (adoptionId) => {
    try {
      await axios.delete(`http://localhost:5005/api/adoptions/${adoptionId}`);
      setAdoptions((prev) =>
        prev.filter((adoption) => adoption._id !== adoptionId)
      );
      toast.success("Adoption deleted successfully!");
    } catch (error) {
      console.error("Error deleting adoption:", error);
    }
  };

  if (errorMessage) return <div>{errorMessage}</div>;
  if (loading) return <div>Loading...</div>;

  const userAdoptions = adoptions.filter(
    (adoption) => adoption.user === user._id
  );
  const userEvents = events.filter((event) => event.user === user._id);

  return (
    <div className="my-profile-page-container">
      <div className="user-detail-container">
        <img
          src={userProfile?.picture || "defaultProfilePicture.jpg"}
          alt="Profile"
        />
        <div className="user-detail-box">
          <h1>{userProfile?.name}</h1>
          <h5>{userProfile?.lastName}</h5>
          <h5>{userProfile?.age}</h5>
          <h5>{userProfile?.phone}</h5>
          <p>{userProfile?.description}</p>
        </div>

        <div className="button-edit-add-container">
          <Link to="/EditProfile">
            <button>Edit Profile</button>
          </Link>
          <Link to="/AddPet">
            <button>Add a pet</button>
          </Link>
        </div>
      </div>

      <div className="user-pet-container">
        {userProfile?.pet?.length > 0 ? (
          userProfile.pet.map((pet, index) => (
            <div key={index} className="pet-detail-box">
              <img
                src={pet.petPicture || "defaultPetPicture.jpg"}
                alt={pet.petName}
              />
              <h3>{pet.petName}</h3>
              <h5>{pet.petType}</h5>
              <p>{pet.petDescription}</p>
            </div>
          ))
        ) : (
          <p>No pets added yet.</p>
        )}
      </div>

      <div className="user-event-container">
        {userEvents.length > 0 ? (
          userEvents.map((event) => <EventCard key={event._id} {...event} />)
        ) : (
          <p>No events available.</p>
        )}
      </div>

      <div className="user-adoption-container">
        {userAdoptions.map((adoption) => (
          <div key={adoption._id} className="adoption-box-container">
            <AdoptionCard oneAdoption={adoption} setAdoptions={setAdoptions} />
            <Link to={`/UpdateAdoptions/${adoption._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDeleteAdoption(adoption._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleDeleteProfile}>Delete Profile</button>
    </div>
  );
};

export default MyProfilePage;
