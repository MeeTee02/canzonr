import React from "react";
import "../styles/genre-card.scss";

const GenreCard = ({ name, index, positionImageRoute }) => {
  console.log(positionImageRoute);
  return (
    <div className="genre-front-card-container">
      <img className="genre-image" src="/images/default-genre.jpg" alt={name} />
      <div className="genre-name">
        {index}. {name}
        <img src={positionImageRoute} alt="position" />
      </div>
    </div>
  );
};

export default GenreCard;
