import React from "react";
import "../styles/artist-badge.scss";

const ArtistBadge = ({ imageUrl, name, artistId, isSelected, onClick }) => {
  const badgeClass = isSelected ? "badge active" : "badge";

  return (
    <div className={badgeClass} onClick={() => onClick(artistId)}>
      <img className="artist-image" src={imageUrl} alt={name} />
      <div className="artist-name">{name}</div>
    </div>
  );
};

export default ArtistBadge;
