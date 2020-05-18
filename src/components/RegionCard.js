import React, { useEffect, useState } from "react";

import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import {
  searchRegionRequested,
  handleDrawer,
  dataInEachDayRequested,
} from "../actions";
import { formatNumber } from "../functions/Utils";

const useStyles = makeStyles((theme) => ({
  regionCard: {
    backgroundColor: theme.colors.background,
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    "&:hover": {
      backgroundColor: "#DAF0EE",
      cursor: "pointer",
    },
  },
  titleRegion: {
    color: theme.colors.fontSubtitle,
  },
  casesIndicator: {
    borderRadius: 4,
    backgroundColor: theme.colors.casesIndicator,
  },
}));

const RegionCard = ({ name, cases, isMobile }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showRegion, setShowRegion] = useState(false);

  useEffect(() => {
    setShowRegion(false);
  }, [showRegion]);

  return (
    <React.Fragment>
      <div
        onClick={() => {
          dispatch(searchRegionRequested(name));
          dispatch(dataInEachDayRequested(name));
          dispatch(handleDrawer());
        }}
      >
        <Grid container className={classes.regionCard}>
          <Grid item xs={9} container justify="flex-start">
            <Typography variant="subtitle1" className={classes.titleRegion}>
              {name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            container
            justify="center"
            className={classes.casesIndicator}
          >
            <Typography
              variant="subtitle1"
              style={{ color: "white", fontWeight: "bold" }}
            >
              {formatNumber(cases)}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default RegionCard;
