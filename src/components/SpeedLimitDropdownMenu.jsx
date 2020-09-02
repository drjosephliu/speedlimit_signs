import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const SpeedLimitDropdownMenu = ({ speedLimit, onChange, label }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formStyle}>
      <InputLabel id="speed-limit-label">{label}</InputLabel>
      <Select
        value={speedLimit}
        onChange={onChange}
        labelId="speed-limit-label"
      >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={40}>40</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={60}>60</MenuItem>
        <MenuItem value={70}>70</MenuItem>
        <MenuItem value={80}>80</MenuItem>
      </Select>
    </FormControl>
  );
};

const useStyles = makeStyles({
  formStyle: {
    width: "30%",
  },
});

export default SpeedLimitDropdownMenu;
