import React from "react";
import "../styles/genre-badge.scss";

const GenreBadge = ({ name, isSelected, onClick }) => {
  const badgeClass = isSelected ? "genre-badge active" : "genre-badge";

  return (
    <div
      className={badgeClass}
      onClick={onClick ? () => onClick(name) : null}
    >
      {name}
    </div>
  );
};

export default GenreBadge;
