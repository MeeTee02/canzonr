import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/profile-data.scss';

function ProfileData() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve the access token from the session storage
    const accessToken = sessionStorage.getItem("spotifyAccessToken");

    // Make the API request to fetch user data
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Handle successful response
        setUserData(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user profile data:", error);
      });
  }, []);

  console.log(userData);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-data">
      <div className="user-profile">
        <img src={userData.images[1].url ? userData.images[1].url : '/images/profile-image-placeholder.jpg'} alt="Profile Photo"/>
      </div>
      <div className="user-data">
      {userData.display_name && <p>Display Name: {userData.display_name}</p>}
      {userData.email && <p>Email: {userData.email}</p>}
      {userData.country && <p>Country: {userData.country}</p>}
      {userData.product && <p>Subscription: {userData.product.charAt(0).toUpperCase() + userData.product.slice(1).toLowerCase()}</p>}
      </div>
    </div>
  );
}

export default ProfileData;
