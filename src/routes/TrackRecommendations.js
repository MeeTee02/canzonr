import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/track-recommendations.scss"; // Import your own CSS file for styling
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ArtistBadge from "../components/ArtistBadge";
import { debounce } from "../helpers/GeneralHelpers";
import TrackBadge from "../components/TrackBadge";
import Button from "@mui/material/Button";
import GenreBadge from "../components/GenreBadge";

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
    if (artistSearchTerm) {
      axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: artistSearchTerm,
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

  const getUserTopTracks = () => {
    axios
      .get("https://api.spotify.com/v1/me/top/tracks?time_range=long_term", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: requestLimit, // Number of top artists to retrieve
        },
      })
      .then((response) => {
        // Handle successful response
        setUserTopTracks(response.data.items);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user tracks data:", error);
      });
  };

  const getSearchedTracks = () => {
    if (trackSearchTerm) {
      axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: trackSearchTerm,
            limit: requestLimit, // Number of top tracks to retrieve
            type: "track",
          },
        })
        .then((response) => {
          // Handle successful response
          setSearchedTracks(response.data.tracks.items);
        })
        .catch((error) => {
          // Handle error
          console.error("Error fetching user tracks data:", error);
        });
    }
  };

  const getAllGenres = () => {
    axios
      .get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Handle successful response
        setAllGenres(response.data.genres);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user tracks data:", error);
      });
  };

  const getRecommendedTracks = (artists, tracks, genres) => {
    axios
      .get("https://api.spotify.com/v1/recommendations", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          seed_artists: artists,
          seed_tracks: tracks,
          seed_genres: genres,
        },
      })
      .then((response) => {
        // Handle successful response
        setRecommendedTracks(response.data.tracks);
        recommendationsRef.current.scrollIntoView({ behavior: "smooth" });
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching recommendation data:", error);
      });
  };

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
        console.log(selectedArtists);
        break;
      case "track":
        if (selectedTracks.includes(typeId)) {
          setSelectedTracks(selectedTracks.filter((id) => id !== typeId));
          console.log(selectedTracks.filter((id) => id !== typeId));
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
    getSearchedArtists();
  }, [artistSearchTerm]);

  useEffect(() => {
    getSearchedTracks();
  }, [trackSearchTerm]);

  useEffect(() => {
    if (!userTopArtists) {
      getUserTopArtists();
    }

    if (!userTopTracks) {
      getUserTopTracks();
    }

    if (!allGenres) {
      getAllGenres();
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
