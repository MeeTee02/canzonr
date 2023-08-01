import React from "react";
import "../styles/option-card.scss";
import { Link, useNavigate } from "react-router-dom";

const OptionCard = ({ imageUrl, imageText, route }) => {
    const navigate = useNavigate();

    const navigateToChild = () => {
      navigate(route);
    };

  return (
    <Link to={route} className="option-card-link">
      <div className="option-card" onClick={navigateToChild}>
        <img src={imageUrl} alt={imageText} />
        <div className="option-card-text">{imageText}</div>
      </div>
    </Link>
  );
};

export default OptionCard;
