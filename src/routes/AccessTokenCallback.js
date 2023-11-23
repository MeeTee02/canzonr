import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AccessTokenCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSpotifyCallback = () => {
      // Extract the access_token from the URL hash
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = hashParams.get('access_token');

      if (accessToken) {
        // Save the access_token in sessionStorage or any other state management solution
        sessionStorage.setItem('spotifyAccessToken', accessToken);

        // Redirect back to the homepage after successful login
        navigate('/');
      } else {
        console.error('Error: No access token found.');
        // Handle error scenarios if needed
      }
    };

    handleSpotifyCallback();
  }, [navigate]);

  return (
    <div className="home">
      <h1>Saving access token...</h1>
    </div>
  );
}

export default AccessTokenCallback;
