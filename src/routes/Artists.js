import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/artists.scss"; // Import your own CSS file for styling
import ArtistCard from "../components/ArtistCard";

function Artists() {
  const [artistsData, setArtistsData] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("spotifyAccessToken");

    axios
      .get("https://api.spotify.com/v1/me/top/artists?time_range=long_term", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: 10, // Number of top artists to retrieve
        },
      })
      .then((response) => {
        // Handle successful response
        setArtistsData(response.data.items);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user artists data:", error);
      });

  }, []);

  console.log(artistsData);

  return (
    <div className="artists-container">
      {artistsData ? (
        artistsData.map((artist, index) => (
          <ArtistCard
            imageUrl={artist.images[1].url}
            name={artist.name}
            index={++index} 
            artistId={artist.id}
            key={artist.id}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Artists;
