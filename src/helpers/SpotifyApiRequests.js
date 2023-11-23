import axios from "axios";

export const getUserTopArtists = async (
  accessToken,
  requestLimit,
  setUserTopArtists,
  timeRange,
  setGenresData = null
) => {
  let userTopArtists = [];
  let userTopGenres = [];

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: requestLimit,
        },
      }
    );

    userTopArtists = response.data.items;
    setUserTopArtists(userTopArtists);

    if (setGenresData) {
      userTopGenres = calculateTopGenres(userTopArtists, setGenresData);
    }

    return { userTopArtists, userTopGenres };
  } catch (error) {
    console.error("Error fetching user artists data:", error);
    throw error; // Re-throw the error so that the caller can handle it if needed
  }
};

export const getUserTopTracks = async (
  accessToken,
  requestLimit,
  setUserTopTracks,
  timeRange
) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          limit: requestLimit,
        },
      }
    );

    const userTopTracks = response.data.items;
    setUserTopTracks(userTopTracks);

    return userTopTracks;
  } catch (error) {
    console.error("Error fetching user tracks data:", error);
    throw error;
  }
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

export const getRecommendedArtists = (
  accessToken,
  selectedArtistId,
  setRecommendedArtists
) => {
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

export const getProfileData = async (accessToken, setUserData) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Handle successful response
    setUserData(response.data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user profile data:", error);
    throw error; // Re-throw the error so that the caller can handle it if needed
  }
};

export const saveLastLoginUserData = async (
  accessToken,
  requestLimit,
  setUserTopArtists,
  setUserTopGenres,
  setUserTopTracks
) => {
  const artists = new Map();
  const tracks = new Map();
  const genres = new Map();

  try {
    const userTopArtistsShortTerm = await getUserTopArtists(
      accessToken,
      requestLimit,
      setUserTopArtists,
      "short_term",
      setUserTopGenres
    );
    artists.set("lastFourWeeks", userTopArtistsShortTerm.userTopArtists);
    genres.set("lastFourWeeks", userTopArtistsShortTerm.userTopGenres);

    const userTopArtistsMediumTerm = await getUserTopArtists(
      accessToken,
      requestLimit,
      setUserTopArtists,
      "medium_term",
      setUserTopGenres
    );
    artists.set("lastSixMonths", userTopArtistsMediumTerm.userTopArtists);
    genres.set("lastSixMonths", userTopArtistsMediumTerm.userTopGenres);

    const userTopArtistsLongTerm = await getUserTopArtists(
      accessToken,
      requestLimit,
      setUserTopArtists,
      "long_term",
      setUserTopGenres
    );
    artists.set("allTime", userTopArtistsLongTerm.userTopArtists);
    genres.set("allTime", userTopArtistsLongTerm.userTopGenres);

    const userTopTracksShortTerm = await getUserTopTracks(
      accessToken,
      requestLimit,
      setUserTopTracks,
      "short_term"
    );
    tracks.set("lastFourWeeks", userTopTracksShortTerm);

    const userTopTracksMediumTerm = await getUserTopTracks(
      accessToken,
      requestLimit,
      setUserTopTracks,
      "medium_term"
    );
    tracks.set("lastSixMonths", userTopTracksMediumTerm);

    const userTopTracksLongTerm = await getUserTopTracks(
      accessToken,
      requestLimit,
      setUserTopTracks,
      "long_term"
    );
    tracks.set("allTime", userTopTracksLongTerm);

    artists.forEach((value, key, map) => {
      map.set(key, value.map(artist => artist.id));
    });

    tracks.forEach((value, key, map) => {
      map.set(key, value.map(track => track.id));
    });

    return { artists, tracks, genres };
  } catch (error) {
    console.error("Error in saveLastLoginUserData:", error);
    // Handle the error or re-throw it if needed
    throw error;
  }
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

  const genres = genreCountArray.slice(0, 10);

  setGenresData(genres);

  return genres;
};
