import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/tracks.scss"; // Import your own CSS file for styling
import Button from "@mui/material/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import TrackCard from "../components/TrackCard";

function Tracks() {
  const [tracksData, setTracksData] = useState(null);
  const [requestLimit, setRequestLimit] = useState(10);
  const accessToken = sessionStorage.getItem("spotifyAccessToken");

  const handleRequestLimit = (limit) => {
    setRequestLimit(limit);
  };

  const setTimeRange = (time_range) => {
    axios
      .get(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: requestLimit, // Number of top tracks to retrieve
          },
        }
      )
      .then((response) => {
        // Handle successful response
        setTracksData(response.data.items);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user tracks data:", error);
      });
  };

  useEffect(() => {
    setTimeRange("long_term");
  }, []);

  return (
    <div className="content">
      <div className="time-range">
        <Button
          variant="contained"
          color="success"
          onClick={() => setTimeRange("short_term")}
        >
          Last 4 weeks
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setTimeRange("medium_term")}
        >
          Last 6 months
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => setTimeRange("long_term")}
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
