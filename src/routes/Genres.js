import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/genres.scss"; // Import your own CSS file for styling
import Button from "@mui/material/Button";
import GenreCard from "../components/GenreCard";

function Genres() {
  const [artistsData, setArtistsData] = useState(null);
  const [genresData, setGenresData] = useState(null);
  const requestLimit = 50;
  const accessToken = sessionStorage.getItem("spotifyAccessToken");

  const calculateTopGenres = (artists) => {
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

    console.log(genreCountArray.slice(0, 10));
  };

  const capitalizeFirstLetters = (input) => {
    return input
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
  };

  const setTimeRange = (time_range) => {
    axios
      .get(
        `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}`,
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
        setArtistsData(response.data.items);
        calculateTopGenres(response.data.items);
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
      </div>
      <div className="genres-container">
        {genresData ? (
          genresData.map((genre, index) => (
            <GenreCard
              name={capitalizeFirstLetters(genre.genre)}
              index={++index}
              key={index}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Genres;
