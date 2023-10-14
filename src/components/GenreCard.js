import React from "react";
import "../styles/genre-card.scss";
import ReactCardFlip from "react-card-flip";

const GenreCard = ({ name, index }) => {
  return (
    <div className="genre-front-card-container">
      <img className="genre-image" src="/images/default-genre.jpg" alt={name} />
      <div className="genre-name">
        {index}. {name}
      </div>
    </div>
  );
};

export default GenreCard;
