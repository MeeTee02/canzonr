import React from "react";
import OptionCard from "../components/OptionCard";

function Recommendation() {
    return (
        <div className="top">
          <div className="top-options-container">
            <OptionCard
              imageUrl="/images/artists.svg"
              imageText="Recommend Artists"
              route="artists"
            />
            <OptionCard
              imageUrl="/images/tracks.svg"
              imageText="Recommend Tracks"
              route="tracks"
            />
          </div>
        </div>
      );
}

export default Recommendation;