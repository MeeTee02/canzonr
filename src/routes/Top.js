import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/top.scss";
import OptionCard from "../components/OptionCard";
import { Outlet } from "react-router";

function Top() {
  return (
    <div className="top">
      <div className="top-options-container">
        <OptionCard
          imageUrl="/images/artists.svg"
          imageText="Artists"
          route="artists"
        />
        <OptionCard
          imageUrl="/images/tracks.svg"
          imageText="Tracks"
          route="tracks"
        />
        <OptionCard
          imageUrl="/images/genres.svg"
          imageText="Genres"
          route="genres"
        />
      </div>
    </div>
  );
}

export default Top;
