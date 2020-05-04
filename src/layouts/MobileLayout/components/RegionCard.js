import React, { useEffect, useState } from "react";

import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { searchRegionRequested, handleDrawer } from "../../../actions";

const useStyles = makeStyles((theme) => ({
  regionCard: {
    backgroundColor: "#F3F3F3",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    "&:hover": {
      backgroundColor: "#DAF0EE",
      cursor: "pointer",
    },
  },
  lastRegionCard: {
    backgroundColor: "#F3F3F3",
    padding: theme.spacing(2),
    marginBottom: "200px",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#CBF2DB",
      cursor: "pointer",
    },
  },
}));

const RegionCard = ({ name, cases, lastItem }) => {
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
          dispatch(handleDrawer());
        }}
      >
        <Grid
          container
          className={
            name === lastItem ? classes.lastRegionCard : classes.regionCard
          }
        >
          <Grid item xs={9} container justify="flex-start">
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            container
            justify="center"
            style={{ backgroundColor: "tomato", borderRadius: "4px" }}
          >
            <Typography
              variant="subtitle1"
              style={{ color: "white", fontWeight: "bold" }}
            >
              {cases}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default RegionCard;
