import React, { useEffect, useState } from "react";
import "../styles/artists.scss"; // Import your own CSS file for styling
import ArtistCard from "../components/ArtistCard";
import Button from "@mui/material/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { getUserTopArtists } from "../helpers/SpotifyApiRequests";

function Artists() {
  const [artistsData, setArtistsData] = useState(null);
  const [requestLimit, setRequestLimit] = useState(10);
  const accessToken = sessionStorage.getItem("spotifyAccessToken");

  const handleRequestLimit = (limit) => {
    setRequestLimit(limit);
  };

  useEffect(() => {
    getUserTopArtists(accessToken, requestLimit, setArtistsData, "long_term");
  }, []);

  return (
    <div className="content">
      <div className="time-range">
        <Button
          variant="contained"
          color="success"
          onClick={() => getUserTopArtists(accessToken, requestLimit, setArtistsData, "short_term")}
        >
          Last 4 weeks
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => getUserTopArtists(accessToken, requestLimit, setArtistsData, "medium_term")}
        >
          Last 6 months
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => getUserTopArtists(accessToken, requestLimit, setArtistsData, "long_term")}
        >
          All time
        </Button>
        <DropdownButton
          id="limit-dropdown-button"
          title="Limit"
          onSelect={handleRequestLimit}
        >
          <Dropdown.Item eventKey={10}>10</Dropdown.Item>
          <Dropdown.Item eventKey={20}>20</Dropdown.Item>
          <Dropdown.Item eventKey={30}>30</Dropdown.Item>
          <Dropdown.Item eventKey={40}>40</Dropdown.Item>
          <Dropdown.Item eventKey={50}>50</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="artists-container">
        {artistsData ? (
          artistsData.map((artist, index) => (
            <ArtistCard
              imageUrl={artist.images[1].url}
              name={artist.name}
              index={++index}
              artistId={artist.id}
              key={artist.id}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Artists;
