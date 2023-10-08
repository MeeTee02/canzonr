import React from "react";
import "../styles/option-card.scss";
import { Link } from "react-router-dom";

const OptionCard = ({ imageUrl, imageText, route }) => {

  return (
    <Link to={route} className="option-card-link">
      <div className="option-card">
        <img src={imageUrl} alt={imageText} />
        <div className="option-card-text">{imageText}</div>
      </div>
    </Link>
  );
};

export default OptionCard;
