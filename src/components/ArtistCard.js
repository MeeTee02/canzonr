import React, { useState } from "react";
import "../styles/artist-card.scss";
import ReactCardFlip from "react-card-flip";
import axios from "axios";

const ArtistCard = ({ imageUrl, name, index, artistId, positionImageRoute }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [topTracks, setTopTracks] = useState(null);
  const trackLimit = 4;
  const country = 'US';

  const handleFlip = () => {
    setIsFlipped(!isFlipped);

    if (!topTracks) {
      const accessToken = sessionStorage.getItem("spotifyAccessToken");

      axios
        .get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            country: country,
          },
        })
        .then((response) => {
          // Handle successful response
          setTopTracks(response.data.tracks);
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching top tracks of artist:", error);
        });
    }
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="artist-front-card-container">
        <img
          className="artist-image"
          src={imageUrl}
          alt={name}
          onClick={handleFlip}
        />
        <div className="artist-name">
          {index}. {name}
          <img
        src={positionImageRoute}
        alt="position"
      />
        </div>
      </div>

      <div className="artist-back-card-container" onClick={handleFlip}>
        <div className="top-tracks">Top Tracks</div>
        {topTracks ? (topTracks.slice(0, trackLimit).map((track, index) => {
          return <div className="track" key={index}>
            {index + 1}. {track.name}
          </div>;
        })) : (<p>Loading...</p>)}
      </div>
    </ReactCardFlip>
  );
};

export default ArtistCard;
