import React, { memo, useMemo, useState } from "react";
import Papa from "papaparse";
import preval from "preval.macro";
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Image from "./Image";
import SpeedLimitDropdownMenu from "./SpeedLimitDropdownMenu";

const TrainImagesList = memo(() => {
  const classes = useStyles();

  // Read and parse CSV data with train label info
  const allCsvData = useMemo(() => {
    const csvStr = preval`
      const fs = require('fs');
      const csvFile = fs.readFileSync("src/data/train_labels.csv", "utf-8");
      module.exports = csvFile;
    `;
    // Remove header and last empty row
    const parsedCsvData = Papa.parse(csvStr)
      .data.slice(1, -1)
      .map((row) => {
        const speedLimit = parseInt(row[row.length - 1].slice(-2));
        return row.slice(0, -1).concat([speedLimit]);
      });
    return parsedCsvData;
  }, []);

  const [lowerBoundSpeedLimit, setLowerBoundSpeedLimit] = useState(0);
  const handleLowerBoundSpeedLimitChange = (event) => {
    setLowerBoundSpeedLimit(event.target.value);
  };

  const [upperBoundSpeedLimit, setUpperBoundSpeedLimit] = useState(80);
  const handleUpperBoundSpeedLimitChange = (event) => {
    setUpperBoundSpeedLimit(event.target.value);
  };

  const csvData = useMemo(() => {
    return allCsvData.filter((row) => {
      return (
        lowerBoundSpeedLimit <= row[row.length - 1] &&
        row[row.length - 1] <= upperBoundSpeedLimit
      );
    });
  }, [allCsvData, upperBoundSpeedLimit, lowerBoundSpeedLimit]);

  return (
    <>
      <Grid
        container
        justify="space-around"
        alignItems="center"
        className={classes.topbar}
      >
        <Typography variant="h6">Filter by speed limit:</Typography>
        <SpeedLimitDropdownMenu
          speedLimit={lowerBoundSpeedLimit}
          onChange={handleLowerBoundSpeedLimitChange}
          label={`Lower bound speed limit (inclusive)`}
        />
        <SpeedLimitDropdownMenu
          speedLimit={upperBoundSpeedLimit}
          onChange={handleUpperBoundSpeedLimitChange}
          label={`Upper bound speed limit (inclusive)`}
        />
      </Grid>

      <GridList cellHeight={"auto"} cols={3}>
        {csvData.map((row, idx) => {
          const imgName = row[0];
          const speedLimitShown = row[row.length - 1];
          const rect = row.slice(1, 5);
          const imgDir = require.context("../data/train_images/", false);
          const imgPath = imgDir("./" + imgName);
          return (
            <GridListTile key={idx} cols={1}>
              <Image
                imgPath={imgPath}
                speedLimit={speedLimitShown}
                rect={rect}
              />
              <GridListTileBar title={speedLimitShown} />
            </GridListTile>
          );
        })}
      </GridList>
    </>
  );
});

const useStyles = makeStyles({
  topbar: {
    padding: "10px",
  },
});

export default TrainImagesList;
