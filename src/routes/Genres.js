import React, { useEffect, useState } from "react";
import "../styles/genres.scss"; // Import your own CSS file for styling
import Button from "@mui/material/Button";
import GenreCard from "../components/GenreCard";
import { getProfileData, getUserTopArtists } from "../helpers/SpotifyApiRequests";
import { capitalizeFirstLetters } from "../helpers/GeneralHelpers";
import { getUserListeningData } from "../helpers/FirestoreData";

function Genres() {
  const [artistsData, setArtistsData] = useState(null);
  const [userListeningData, setUserListeningData] = useState(null);
  const [genresData, setGenresData] = useState(null);
  const requestLimit = 50;
  const accessToken = sessionStorage.getItem("spotifyAccessToken");

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
          data,
          setGenresData
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
          onClick={() => getUserTopArtists(accessToken, requestLimit, setArtistsData, "short_term", false, userListeningData, setGenresData)}
        >
          Last 4 weeks
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => getUserTopArtists(accessToken, requestLimit, setArtistsData, "medium_term", false, userListeningData, setGenresData)}
        >
          Last 6 months
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => getUserTopArtists(accessToken, requestLimit, setArtistsData, "long_term", false, userListeningData, setGenresData)}
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
              positionImageRoute={genre.positionImageRoute}
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
