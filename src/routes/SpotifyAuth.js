import React, { useEffect } from 'react';   

const SpotifyAuth = () => {

  useEffect(() => {
    const performSpotifyOAuth = () => {
      try {
        // Replace with your Spotify Client ID and Redirect URI
        const clientId = '774904b9142d43b2872781c7c387eb6b';
        const redirectUri = 'https://canzonr-81dff.web.app/callback'; // Should match the URL set in the Spotify Dashboard
        const scopes = ['user-read-private', 'user-read-email']; // Add required scopes

        // Redirect the user to the Spotify authorization URL
        const authEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;

        window.location.href = authEndpoint;
      } catch (error) {
        console.error('Error initiating Spotify OAuth:', error);
        // Handle error scenarios if needed
      }
    };

    // Call the function to initiate the Spotify OAuth flow
    performSpotifyOAuth();
  }, []);

  return (
    <div>
      <h1>Spotify OAuth Login Page</h1>
      {/* Your authentication page content */}
    </div>
  );
};

export default SpotifyAuth;
