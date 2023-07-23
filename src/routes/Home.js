import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in sessionStorage
    const token = sessionStorage.getItem("spotifyAccessToken");
    if (!token) {
      // If token is missing, redirect to /auth page
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div className="home">
      <h1>Welcome to Canzonr!</h1>
    </div>
  );
}

export default Home;
