import axios from "axios";

export const getUserTopArtists = (
  accessToken,
  requestLimit,
  setUserTopArtists,
  timeRange,
  setGenresData = null
) => {
  axios
    .get(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`, {
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
      if (setGenresData) {
        calculateTopGenres(response.data.items, setGenresData);
      }
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching user artists data:", error);
    });
};

export const getUserTopTracks = (
  accessToken,
  requestLimit,
  setUserTopTracks,
  timeRange
) => {
  axios
    .get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, {
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

export const getSearchedArtists = (
  accessToken,
  searchTerm,
  requestLimit,
  setSearchedArtists
) => {
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

export const getSearchedTracks = (
  accessToken,
  searchTerm,
  requestLimit,
  setSearchedTracks
) => {
  if (searchTerm) {
    axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: searchTerm,
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

export const getAllGenres = (accessToken, setAllGenres) => {
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
      console.error("Error fetching all genres data:", error);
    });
};

export const getRecommendedTracks = (
  accessToken,
  setRecommendedTracks,
  recommendationsRef,
  artists,
  tracks,
  genres
) => {
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

export const getRecommendedArtists = (accessToken, selectedArtistId, setRecommendedArtists) => {
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

export const getProfileData = (accessToken, setUserData) => {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Handle successful response
        setUserData(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user profile data:", error);
      });
};

const calculateTopGenres = (artists, setGenresData) => {
  const genreCountMap = new Map();

  artists.forEach((artist) => {
    artist.genres.forEach((genre) => {
      if (genreCountMap.has(genre)) {
        // If the genre exists in the Map, increment its count
        genreCountMap.set(genre, genreCountMap.get(genre) + 1);
      } else {
        // If the genre doesn't exist in the Map, initialize it with a count of 1
        genreCountMap.set(genre, 1);
      }
    });
  });

  const genreCountArray = Array.from(genreCountMap, ([genre, count]) => ({
    genre,
    count,
  }));

  genreCountArray.sort((a, b) => b.count - a.count);

  setGenresData(genreCountArray.slice(0, 10));
};
