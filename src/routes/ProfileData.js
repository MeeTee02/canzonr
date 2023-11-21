import React, { useEffect, useState } from "react";
import "../styles/profile-data.scss";
import { getProfileData } from "../helpers/SpotifyApiRequests";

function ProfileData() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve the access token from the session storage
    const accessToken = sessionStorage.getItem("spotifyAccessToken");

    // Make the API request to fetch user data
    getProfileData(accessToken, setUserData);
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-data">
      <div className="user-profile">
        <img
          src={
            userData.images[1].url
              ? userData.images[1].url
              : "/images/profile-image-placeholder.jpg"
          }
          alt=""
        />
      </div>
      <div className="user-data">
        {userData.display_name && <p>Display Name: {userData.display_name}</p>}
        {userData.email && <p>Email: {userData.email}</p>}
        {userData.country && <p>Country: {userData.country}</p>}
        {userData.product && (
          <p>
            Subscription:{" "}
            {userData.product.charAt(0).toUpperCase() +
              userData.product.slice(1).toLowerCase()}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfileData;
