import React, { useEffect, useRef, useState } from "react";
import "../styles/track-recommendations.scss"; // Import your own CSS file for styling
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ArtistBadge from "../components/ArtistBadge";
import { debounce } from "../helpers/GeneralHelpers";
import TrackBadge from "../components/TrackBadge";
import Button from "@mui/material/Button";
import GenreBadge from "../components/GenreBadge";
import {
  getAllGenres,
  getRecommendedTracks,
  getSearchedArtists,
  getSearchedTracks,
  getUserTopArtists,
  getUserTopTracks,
} from "../helpers/SpotifyApiRequests";

function TrackRecommendations() {
  const [searchedArtists, setSearchedArtists] = useState([]);
  const [userTopArtists, setUserTopArtists] = useState(null);
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [userTopTracks, setUserTopTracks] = useState(null);
  const [allGenres, setAllGenres] = useState(null);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [artistSearchTerm, setArtistSearchTerm] = useState("");
  const [trackSearchTerm, setTrackSearchTerm] = useState("");
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const requestLimit = 10;
  const accessToken = sessionStorage.getItem("spotifyAccessToken");
  const recommendationsRef = useRef();
  const artistSearchInput = "input-for-artist";
  const trackSearchInput = "input-for-track";

  const handleSearchQuery = (e, method) => {
    const searchTerm = e.target.value.trim();
    const searchField = e.target.id;

    if (searchTerm && searchField === artistSearchInput) {
      setArtistSearchTerm(searchTerm);
      debounce(method, 2000);
    } else if (searchTerm && searchField === trackSearchInput) {
      setTrackSearchTerm(searchTerm);
      debounce(method, 2000);
    } else if (e.target.id === artistSearchInput) {
      setSelectedArtists(
        selectedArtists.filter((artistId) => {
          return !searchedArtists.some(
            (searchedArtist) => searchedArtist.id === artistId
          );
        })
      );
      setSearchedArtists([]);
    } else {
      setSearchedTracks(
        searchedTracks.filter((artistId) => {
          return !searchedTracks.some(
            (searchedTrack) => searchedTrack.id === artistId
          );
        })
      );
      setSearchedTracks([]);
    }
  };

  const handleBadgeClick = (typeId, type) => {
    const limitValid =
      selectedArtists.length + selectedTracks.length + selectedGenres.length <
      5;

    switch (type) {
      case "artist":
        if (selectedArtists.includes(typeId)) {
          setSelectedArtists(selectedArtists.filter((id) => id !== typeId));
        } else if (limitValid) {
          setSelectedArtists([...selectedArtists, typeId]);
        }
        break;
      case "track":
        if (selectedTracks.includes(typeId)) {
          setSelectedTracks(selectedTracks.filter((id) => id !== typeId));
        } else if (limitValid) {
          setSelectedTracks([...selectedTracks, typeId]);
        }
        break;
      case "genre":
        if (selectedGenres.includes(typeId)) {
          setSelectedGenres(selectedGenres.filter((id) => id !== typeId));
        } else if (limitValid) {
          setSelectedGenres([...selectedGenres, typeId]);
        }
        break;
      default:
      // Nothing
    }
  };

  useEffect(() => {
    getSearchedArtists(
      accessToken,
      artistSearchTerm,
      requestLimit,
      setSearchedArtists
    );
  }, [artistSearchTerm]);

  useEffect(() => {
    getSearchedTracks(
      accessToken,
      trackSearchTerm,
      requestLimit,
      setSearchedTracks
    );
  }, [trackSearchTerm]);

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

    if (!userTopTracks) {
      getUserTopTracks(accessToken, requestLimit, setUserTopTracks, "long_term", true);
    }

    if (!allGenres) {
      getAllGenres(accessToken, setAllGenres);
    }
  }, []);

  return (
    <div className="content">
      <div className="search-bars">
        <div className="search-bar">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PersonSearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-for-artist"
              label="Search for an artist"
              variant="standard"
              onChange={(event) => handleSearchQuery(event, getSearchedArtists)}
            />
          </Box>
        </div>
        <div className="search-bar">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PersonSearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-for-track"
              label="Search for a track"
              variant="standard"
              onChange={(event) => handleSearchQuery(event, getSearchedTracks)}
            />
          </Box>
        </div>
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            getRecommendedTracks(
              accessToken,
              setRecommendedTracks,
              recommendationsRef,
              selectedArtists.join(","),
              selectedTracks.join(","),
              selectedGenres.join(",")
            )
          }
        >
          Recommendation
        </Button>
      </div>

      <div className="type-container">
        <div className="title">Search Results for Artists</div>
        <div className="type-list">
          {searchedArtists ? (
            searchedArtists.map((artist) => {
              return artist.images[2] ? (
                <ArtistBadge
                  imageUrl={artist.images[2].url}
                  name={artist.name}
                  artistId={artist.id}
                  isSelected={selectedArtists.includes(artist.id)}
                  onClick={() => handleBadgeClick(artist.id, "artist")}
                  key={artist.id}
                />
              ) : null;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="type-container">
        <div className="title">Your Top Artists</div>
        <div className="type-list">
          {userTopArtists ? (
            userTopArtists.map((artist) => {
              return artist.images[2] ? (
                <ArtistBadge
                  imageUrl={artist.images[2].url}
                  name={artist.name}
                  artistId={artist.id}
                  isSelected={selectedArtists.includes(artist.id)}
                  onClick={() => handleBadgeClick(artist.id, "artist")}
                  key={artist.id}
                />
              ) : null;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="type-container">
        <div className="title">Search Results for Tracks</div>
        <div className="type-list">
          {searchedTracks ? (
            searchedTracks.map((track) => {
              return track.album.images[2] ? (
                <TrackBadge
                  imageUrl={track.album.images[2].url}
                  name={track.name}
                  trackId={track.id}
                  isSelected={selectedTracks.includes(track.id)}
                  onClick={() => handleBadgeClick(track.id, "track")}
                  key={track.id}
                />
              ) : null;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="type-container">
        <div className="title">Your Top Tracks</div>
        <div className="type-list">
          {userTopTracks ? (
            userTopTracks.map((track) => {
              return track.album.images[2] ? (
                <TrackBadge
                  imageUrl={track.album.images[2].url}
                  name={track.name}
                  trackId={track.id}
                  isSelected={selectedTracks.includes(track.id)}
                  onClick={() => handleBadgeClick(track.id, "track")}
                  key={track.id}
                />
              ) : null;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="type-container">
        <div className="title">All Genres</div>
        <div className="type-list">
          {allGenres ? (
            allGenres.map((genre) => {
              return (
                <GenreBadge
                  name={genre}
                  isSelected={selectedGenres.includes(genre)}
                  onClick={() => handleBadgeClick(genre, "genre")}
                  key={genre}
                />
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="type-container" ref={recommendationsRef}>
        <div className="title">Track Recommendations</div>
        <div className="type-list">
          {recommendedTracks ? (
            recommendedTracks.map((track) => {
              return track.album.images[2] ? (
                <TrackBadge
                  imageUrl={track.album.images[2].url}
                  name={track.name}
                  trackId={track.id}
                  key={track.id}
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

export default TrackRecommendations;
