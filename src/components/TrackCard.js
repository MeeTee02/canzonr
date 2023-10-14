import React, { useState } from "react";
import "../styles/track-card.scss";
import ReactCardFlip from "react-card-flip";

const TrackCard = ({ artists, imageUrl, name, index, trackId }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="track-front-card-container">
        <img
          className="track-image"
          src={imageUrl}
          alt={name}
          onClick={handleFlip}
        />
        <div className="track-name">
          {index}. {name}
        </div>
      </div>

      <div className="track-back-card-container" onClick={handleFlip}>
        {artists ? (artists.map((artist, index) => {
          return <div className="artist" key={index}>
            {artist.name}
          </div>;
        })) : (<p>Loading...</p>)}
      </div>
    </ReactCardFlip>
  );
};

export default TrackCard;
