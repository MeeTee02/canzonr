import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("spotifyAccessToken");

  useEffect(() => {
    // Check if token exists in sessionStorage
    if (!token) {
      // If token is missing, redirect to /auth page
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="home">
      {token ? (
        <h1>Welcome to Canzonr!</h1>
      ) : (
        <h1>Log in to start browsing</h1>
      )}  
    </div>
  );
}

export default Home;
