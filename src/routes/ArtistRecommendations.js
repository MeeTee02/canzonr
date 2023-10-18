import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/artist-recommendations.scss"; // Import your own CSS file for styling
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ArtistBadge from "../components/ArtistBadge";
import { debounce } from "../helpers/GeneralHelpers";

function ArtistRecommendations() {
  const [searchedArtists, setSearchedArtists] = useState([]);
  const [userTopArtists, setUserTopArtists] = useState(null);
  const [recommendedArtists, setRecommendedArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const requestLimit = 10;
  const accessToken = sessionStorage.getItem("spotifyAccessToken");
  const recommendationsRef = useRef();

  const getUserTopArtists = () => {
    axios
      .get("https://api.spotify.com/v1/me/top/artists?time_range=long_term", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: requestLimit, // Number of top artists to retrieve
        },
      })
      .then((response) => {
        // Handle successful response
        setUserTopArtists(response.data.items);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user artists data:", error);
      });
  };

  const getSearchedArtists = () => {
    if (searchTerm) {
      axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: searchTerm,
            limit: requestLimit, // Number of top artists to retrieve
            type: "artist",
          },
        })
        .then((response) => {
          // Handle successful response
          setSearchedArtists(response.data.artists.items);
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching user artists data:", error);
        });
    }
  };

  const getRecommendedArtists = () => {
    axios
      .get(
        `https://api.spotify.com/v1/artists/${selectedArtistId}/related-artists`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        setRecommendedArtists(response.data.artists);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user artists data:", error);
      });
  };

  const handleSearchQuery = (e) => {
    const searchTerm = e.target.value.trim();
    console.log(searchTerm);

    if (searchTerm) {
      setSearchTerm(searchTerm);
      debounce(getSearchedArtists, 2000);
    } else {
      setSearchedArtists([]);
    }
  };

  const handleArtistBadgeClick = (artistId, isSelected) => {

    if(!isSelected) {
      setSelectedArtistId(artistId);
      recommendationsRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      setSelectedArtistId(null);
    }
  };

  useEffect(() => {
    if (!userTopArtists) {
      getUserTopArtists();
    }

    getSearchedArtists();
  }, [searchTerm]);

  useEffect(() => {
    if (selectedArtistId) {
      getRecommendedArtists();
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
                  onClick={() => handleArtistBadgeClick(artist.id, artist.id === selectedArtistId)}
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
                  onClick={() => handleArtistBadgeClick(artist.id, artist.id === selectedArtistId)}
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
