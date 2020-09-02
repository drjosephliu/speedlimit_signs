import React, { useEffect, useState, memo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { HOME, TRAIN, TEST } from "../constants";

const Header = memo(() => {
  const classes = useStyles();

  const [route, setRoute] = useState(HOME);

  const handleRouteChange = (event) => {
    setRoute(event.target.value);
  };

  const location = useLocation();

  useEffect(() => {
    let route = "";
    switch (location.pathname) {
      case "/":
        route = HOME;
        break;
      case "/train":
        route = TRAIN;
        break;
      case "/test":
        route = TEST;
        break;
      default:
        route = "/";
        break;
    }
    setRoute(route);
  }, [location]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="flex-start">
          <Typography
            className={classes.title}
            variant="h5"
            to="/"
            component={RouterLink}
          >
            Speed Limit Signs
          </Typography>
        </Grid>
        <Grid container justify="flex-end">
          <Select
            labelId="route-label"
            value={route}
            onChange={handleRouteChange}
            className={classes.dropdown}
          >
            <MenuItem value={HOME} to="/" component={RouterLink}>
              Home
            </MenuItem>
            <MenuItem value={TRAIN} to="/train" component={RouterLink}>
              Train
            </MenuItem>
            <MenuItem value={TEST} to="/test" component={RouterLink}>
              Test
            </MenuItem>
          </Select>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});

const useStyles = makeStyles({
  dropdown: {
    color: "white",
  },
  title: {
    color: "white",
    textDecoration: "none",
  },
});

export default Header;
