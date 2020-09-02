import React, { memo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Box, Link, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Home = memo(() => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.buttonGroup}
      >
        Choose image set:
        <Box>
          <Link to="/train" component={RouterLink}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Train
            </Button>
          </Link>
          <Link to="/test" component={RouterLink}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Test
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
});

const useStyles = makeStyles({
  root: {
    height: "80vh",
  },
  buttonGroup: {
    width: "30%",
  },
  button: {
    margin: "10px",
  },
});

export default Home;
