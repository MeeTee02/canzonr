import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import "../styles/data-slider.scss"; // Import your own CSS file for styling

import { Typography } from "@mui/material";

const DataSlider = ({
  label,
  defaultValue,
  step,
  min,
  max,
  onSliderChange,
  onSwitchChange,
}) => {
  return (
    <div className="container">
      <Box sx={{ width: 200 }}>
        <Typography id="input-slider" gutterBottom>
          {label}
        </Typography>
        <Slider
          aria-label={label}
          defaultValue={defaultValue}
          step={step}
          marks
          min={min}
          max={max}
          valueLabelDisplay="auto"
          onChange={(event, value) => onSliderChange(value)}
        />
      </Box>
      <Switch
        onChange={(event) => onSwitchChange(event.target.checked)}
        inputProps={{ "aria-label": "controlled" }}
      />
    </div>
  );
};

export default DataSlider;
