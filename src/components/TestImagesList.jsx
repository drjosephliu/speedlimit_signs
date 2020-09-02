import React, { memo } from "react";
import { GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Image from "./Image";

const TestImagesList = memo(() => {
  const classes = useStyles();

  const importAll = (r) => {
    return r.keys().map(r);
  };

  const allImgPaths = importAll(
    require.context("../data/test_images", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <GridList cellHeight={200} cols={3}>
      {allImgPaths.map((imgPath, idx) => {
        return (
          <GridListTile key={idx} cols={1} className={classes.tile}>
            <Image key={idx} imgPath={imgPath} />;
          </GridListTile>
        );
      })}
    </GridList>
  );
});

const useStyles = makeStyles({
  tile: {
    backgroundSize: "contain",
  },
});

export default TestImagesList;
