import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const TrackPlayer = ({ accessToken, trackUri }) => {
  const customStyles = {
    bgColor: '#282828', // Background color
    color: '#1DB954', // Text color
    trackNameColor: '#FFFFFF', // Track name color
    sliderColor: '#1DB954', // Slider color
    sliderHandleColor: '#FFFFFF', // Slider handle color
    sliderTrackColor: '#535353', // Slider track color
  };

  return (
    <div>
      {(
        <SpotifyPlayer
          token={accessToken}
          uris={[trackUri]}
          hideAttribution
          magnifySliderOnHover
          layout="compact"
          styles={customStyles}
          callback={(state) => console.log(state)}
        />
      )}
    </div>
  );
};

export default TrackPlayer;
