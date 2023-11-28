import React, { useState } from "react";
import "../styles/track-card.scss";
import ReactCardFlip from "react-card-flip";

const TrackCard = ({ artists, imageUrl, name, index, positionImageRoute }) => {
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
          <img src={positionImageRoute} alt="position" />
        </div>
      </div>

      <div className="track-back-card-container">
        {artists ? (
          artists.map((artist, index) => {
            return (
              <div className="artist" onClick={handleFlip} key={index}>
                {artist.name}
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
        {isFlipped ? (
          <div className="play-track">Web player soon</div>
        ) : (
          <div></div>
        )}
      </div>
    </ReactCardFlip>
  );
};

export default TrackCard;
