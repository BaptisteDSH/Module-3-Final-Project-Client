import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS

const MyProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Get user data from context
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoggedIn, setIsLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle profile deletion
  const handleDeletProfile = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5005/api/user/${user._id}`)
      .then((response) => {
        setUserProfile(null); // Clear user profile
        setIsLoggedIn(false); // Log out the user
        logOutUser(); // Ensure the user is logged out
        setLoading(false); // Stop loading after the action
        toast.success("Your profile has been deleted successfully!"); // Show success toast
        navigate("/"); // Redirect to the homepage or another page after deletion
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || "An error occurred");
        setLoading(false);
        toast.error("An error occurred while deleting your profile."); // Show error toast
      });
  };

  // Fetch user profile data when the `user` object changes
  useEffect(() => {
    if (user && user._id) {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        axios
          .get(`http://localhost:5005/api/user/${user._id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            setUserProfile(response.data); // Set user profile data
            setLoading(false); // Stop loading after data is fetched
          })
          .catch((error) => {
            const errorDescription =
              error.response?.data?.message || "An error occurred";
            setErrorMessage(errorDescription); // Handle errors from API call
            setLoading(false);
          });
      } else {
        setErrorMessage("User not logged in"); // If no token is found
        setLoading(false);
      }
    } else {
      setLoading(false); // Stop loading if `user` is null
    }
  }, [user]); // Dependency on `user` to fetch data when it changes

  // Display error message if there is one
  if (errorMessage) return <div>{errorMessage}</div>;

  // Show loading state while data is being fetched
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="my-profil-page-container">
        <div className="user-detail-container">
          <img
            src={userProfile?.picture || "defaultProfilePicture.jpg"}
            alt="profilePicture"
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
              <div>Edit Profile</div>
            </Link>
            <Link to="/AddPet">
              <div>Add a pet</div>
            </Link>
          </div>

          {/* Display existing pets */}
          <div className="user-pet-container">
            {userProfile?.pet && userProfile.pet.length > 0 ? (
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
        <button onClick={handleDeletProfile}>Delete Profile</button>
      </div>
    </>
  );
};

export default MyProfilePage;
