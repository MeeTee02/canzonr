import React from "react";
import "../styles/track-badge.scss";

const TrackBadge = ({ imageUrl, name, trackId, isSelected, onClick }) => {
  const badgeClass = isSelected ? "track-badge active" : "track-badge";

  return (
    <div className={badgeClass} onClick={onClick ? () => onClick(trackId) : null}>
      <img className="track-image" src={imageUrl} alt={name} />
      <div className="track-name">{name}</div>
    </div>
  );
};

export default TrackBadge;
