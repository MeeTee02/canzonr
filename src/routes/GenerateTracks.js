import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/generate-tracks.scss"; // Import your own CSS file for styling
import GenreBadge from "../components/GenreBadge";
import DataSlider from "../components/DataSlider";
import TrackBadge from "../components/TrackBadge";
import { Button } from "@mui/material";

function GenerateTracks() {
  const [allGenres, setAllGenres] = useState(null);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [danceabilityValue, setDanceabilityValue] = useState(0);
  const [energyValue, setEnergyValue] = useState(0);
  const [instrumentalnessValue, setInstrumentalnessValue] = useState(0);
  const [tempoValue, setTempoValue] = useState(0);

  const [danceabilitySwitchChecked, setDanceabilitySwitchChecked] =
    useState(false);
  const [energySwitchChecked, setEnergySwitchChecked] = useState(false);
  const [instrumentalnessSwitchChecked, setInstrumentalnessSwitchChecked] =
    useState(false);
  const [tempoSwitchChecked, setTempoSwitchChecked] = useState(false);

  const requestLimit = 10;
  const accessToken = sessionStorage.getItem("spotifyAccessToken");
  const recommendationsRef = useRef();

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
        console.error("Error fetching all genres data:", error);
      });
  };

  const getRecommendedTracks = () => {
    console.log(danceabilitySwitchChecked);
    console.log(danceabilityValue);

    const params = {
      seed_genres: selectedGenres.length ? selectedGenres.join(",") : "pop",
    };

    if(!selectedGenres.length) {
      setSelectedGenres(["pop"]);
    }

    if (danceabilitySwitchChecked) {
      params.target_danceability = danceabilityValue;
    }

    if (energySwitchChecked) {
      params.target_energy = energyValue;
    }

    if (instrumentalnessSwitchChecked) {
      params.target_instrumentalness = instrumentalnessValue;
    }

    if (tempoSwitchChecked) {
      params.target_tempo = tempoValue;
    }

    console.log();

    axios
      .get("https://api.spotify.com/v1/recommendations", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: params,
      })
      .then((response) => {
        // Handle successful response
        setRecommendedTracks(response.data.tracks);
        recommendationsRef.current.scrollIntoView({ behavior: "smooth" });
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching all genres data:", error);
      });
  };

  const handleBadgeClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((id) => genre !== id));
    } else if (selectedGenres.length < 5) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  useEffect(() => {
    if (!allGenres) {
      getAllGenres();
    }
  }, []);

  return (
    <div className="content">
      <div className="seed-container">
        <div className="data-sliders-container">
          <DataSlider
            label="Danceability"
            defaultValue={0}
            step={0.1}
            min={0}
            max={1}
            onSliderChange={(value) => setDanceabilityValue(value)}
            onSwitchChange={(checked) => setDanceabilitySwitchChecked(checked)}
          />
          <DataSlider
            label="Energy"
            defaultValue={0}
            step={0.1}
            min={0}
            max={1}
            onSliderChange={(value) => setEnergyValue(value)}
            onSwitchChange={(checked) => setEnergySwitchChecked(checked)}
          />
          <DataSlider
            label="Instrumentalness"
            defaultValue={0}
            step={0.1}
            min={0}
            max={1}
            onSliderChange={(value) => setInstrumentalnessValue(value)}
            onSwitchChange={(checked) =>
              setInstrumentalnessSwitchChecked(checked)
            }
          />
          <DataSlider
            label="Tempo"
            defaultValue={0}
            step={0.1}
            min={0}
            max={1}
            onSliderChange={(value) => setTempoValue(value)}
            onSwitchChange={(checked) => setTempoSwitchChecked(checked)}
          />
        </div>
        <Button
          variant="contained"
          color="success"
          onClick={getRecommendedTracks}
        >
          Recommendation
        </Button>
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
                  onClick={() => handleBadgeClick(genre)}
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

export default GenerateTracks;
