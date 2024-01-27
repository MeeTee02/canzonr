import React, { useEffect, useState } from "react";
import "../styles/artists.scss"; // Import your own CSS file for styling
import ArtistCard from "../components/ArtistCard";
import Button from "@mui/material/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  getProfileData,
  getUserTopArtists,
} from "../helpers/SpotifyApiRequests";
import { getUserListeningData } from "../helpers/FirestoreData";
import ExportButton from "../components/ExportButton";
import { getCurrentDateFormatted } from "../helpers/GeneralHelpers";

function Artists() {
  const [artistsData, setArtistsData] = useState(null);
  const [userListeningData, setUserListeningData] = useState(null);
  const [requestLimit, setRequestLimit] = useState(10);
  const accessToken = sessionStorage.getItem("spotifyAccessToken");

  const handleRequestLimit = (limit) => {
    setRequestLimit(limit);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfileData(accessToken);

        const data = await getUserListeningData(profileData.email);
        setUserListeningData(data);

        getUserTopArtists(
          accessToken,
          requestLimit,
          setArtistsData,
          "long_term",
          false,
          data
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken, requestLimit]);

  return (
    <div className="content">
      <div className="time-range">
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            getUserTopArtists(
              accessToken,
              requestLimit,
              setArtistsData,
              "short_term",
              false,
              userListeningData
            )
          }
        >
          Last 4 weeks
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            getUserTopArtists(
              accessToken,
              requestLimit,
              setArtistsData,
              "medium_term",
              false,
              userListeningData
            )
          }
        >
          Last 6 months
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            getUserTopArtists(
              accessToken,
              requestLimit,
              setArtistsData,
              "long_term",
              false,
              userListeningData
            )
          }
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

        {artistsData && (
          <ExportButton data={artistsData} filename={`my_top_artists_${getCurrentDateFormatted()}`} />
        )}
      </div>
      <div className="artists-container">
        {artistsData ? (
          artistsData.map((artist, index) => (
            <ArtistCard
              imageUrl={artist.images[1].url}
              name={artist.name}
              index={++index}
              artistId={artist.id}
              positionImageRoute={artist.positionImageRoute}
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
