import React, { useEffect, useRef, useState } from "react";
import "../styles/artist-recommendations.scss"; // Import your own CSS file for styling
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ArtistBadge from "../components/ArtistBadge";
import { debounce } from "../helpers/GeneralHelpers";
import {
  getRecommendedArtists,
  getSearchedArtists,
  getUserTopArtists,
} from "../helpers/SpotifyApiRequests";

function ArtistRecommendations() {
  const [searchedArtists, setSearchedArtists] = useState([]);
  const [userTopArtists, setUserTopArtists] = useState(null);
  const [recommendedArtists, setRecommendedArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const requestLimit = 10;
  const accessToken = sessionStorage.getItem("spotifyAccessToken");
  const recommendationsRef = useRef();

  const handleSearchQuery = (e) => {
    const searchTerm = e.target.value.trim();

    if (searchTerm) {
      setSearchTerm(searchTerm);
      debounce(
        getSearchedArtists(
          accessToken,
          searchTerm,
          requestLimit,
          setSearchedArtists
        ),
        2000
      );
    } else {
      setSearchedArtists([]);
    }
  };

  const handleArtistBadgeClick = (artistId, isSelected) => {
    if (!isSelected) {
      setSelectedArtistId(artistId);
      recommendationsRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      setSelectedArtistId(null);
    }
  };

  useEffect(() => {
    if (!userTopArtists) {
      getUserTopArtists(
        accessToken,
        requestLimit,
        setUserTopArtists,
        "long_term",
        true,
        []
      );
    }

    getSearchedArtists();
  }, [searchTerm]);

  useEffect(() => {
    if (selectedArtistId) {
      getRecommendedArtists(accessToken, selectedArtistId, setRecommendedArtists);
    }
  }, [selectedArtistId]);

  return (
    <div className="content">
      <div className="search-bar">
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <PersonSearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-for-artist"
            label="Search for an artist"
            variant="standard"
            onChange={handleSearchQuery}
          />
        </Box>
      </div>
      <div className="artist-container">
        <div className="title">Search Results for Artists</div>
        <div className="artist-list">
          {searchedArtists ? (
            searchedArtists.map((artist) => {
              return artist.images[2] ? (
                <ArtistBadge
                  imageUrl={artist.images[2].url}
                  name={artist.name}
                  artistId={artist.id}
                  isSelected={artist.id === selectedArtistId}
                  onClick={() =>
                    handleArtistBadgeClick(
                      artist.id,
                      artist.id === selectedArtistId
                    )
                  }
                  key={artist.id}
                />
              ) : null;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="artist-container">
        <div className="title">Your Top Artists</div>
        <div className="artist-list">
          {userTopArtists ? (
            userTopArtists.map((artist) => {
              return artist.images[2] ? (
                <ArtistBadge
                  imageUrl={artist.images[2].url}
                  name={artist.name}
                  artistId={artist.id}
                  isSelected={artist.id === selectedArtistId}
                  onClick={() =>
                    handleArtistBadgeClick(
                      artist.id,
                      artist.id === selectedArtistId
                    )
                  }
                  key={artist.id}
                />
              ) : null;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="artist-container" ref={recommendationsRef}>
        <div className="title">Artist Recommendations</div>
        <div className="artist-list">
          {recommendedArtists ? (
            recommendedArtists.map((artist) => {
              return artist.images[2] ? (
                <ArtistBadge
                  imageUrl={artist.images[2].url}
                  name={artist.name}
                  artistId={artist.id}
                  key={artist.id}
                />
              ) : null;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistRecommendations;
