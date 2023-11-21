import React, { useEffect, useState } from "react";
import "../styles/tracks.scss"; // Import your own CSS file for styling
import Button from "@mui/material/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import TrackCard from "../components/TrackCard";
import { getUserTopTracks } from "../helpers/SpotifyApiRequests";

function Tracks() {
  const [tracksData, setTracksData] = useState(null);
  const [requestLimit, setRequestLimit] = useState(10);
  const accessToken = sessionStorage.getItem("spotifyAccessToken");

  const handleRequestLimit = (limit) => {
    setRequestLimit(limit);
  };

  useEffect(() => {
    getUserTopTracks(accessToken, requestLimit, setTracksData, "long_term");
  }, []);

  return (
    <div className="content">
      <div className="time-range">
        <Button
          variant="contained"
          color="success"
          onClick={() => getUserTopTracks(accessToken, requestLimit, setTracksData, "short_term")}
        >
          Last 4 weeks
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => getUserTopTracks(accessToken, requestLimit, setTracksData, "medium_term")}
        >
          Last 6 months
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => getUserTopTracks(accessToken, requestLimit, setTracksData, "long_term")}
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
      <div className="tracks-container">
        {tracksData ? (
          tracksData.map((track, index) => (
            <TrackCard
              artists={track.artists}
              imageUrl={track.album.images[1].url}
              name={track.name}
              index={++index}
              accessToken={accessToken}
              trackUri={track.uri}
              key={track.id}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Tracks;
