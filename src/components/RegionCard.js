import React, { useEffect, useState, useContext } from "react";

import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DropdownContext from "../context/DropdownContext";

const useStyles = makeStyles((theme) => ({
  regionCard: {
    backgroundColor: "#F3F3F3",
    overflowY: "scroll",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    "&:hover": {
      backgroundColor: "#CBF2DB",
      cursor: "pointer",
    },
  },
  lastRegionCard: {
    backgroundColor: "#F3F3F3",
    overflowY: "scroll",
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
  const classes = useStyles();
  const [showRegion, setShowRegion] = useState(false);
  const { setRegionToShow } = useContext(DropdownContext);

  useEffect(() => {
    setShowRegion(false);
  }, [showRegion]);

  return (
    <React.Fragment>
      <div
        onClick={() => setRegionToShow({ stringToSearch: name, isOpen: true })}
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
