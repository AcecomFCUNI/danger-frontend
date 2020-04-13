import React, { useContext } from "react";

import RegionsContext from "../context/RegionsContext";
import RegionCard from "./RegionCard";

import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dropDownBack: {
    position: "fixed",
    backgroundColor: "#F3F3F3",
    height: "100vh",
    width: "100vw",
    overflowY: "auto",
    zIndex: 15,
  },
  dropDownContent: {
    position: "fixed",
    overflowY: "scroll",
    height: "80vh",
    width: "100vw",
    backgroundColor: "#F3F3F3",
  },
  topSpace: {
    backgroundColor: "#F3F3F3",
    width: "100vw",
    height: "90px",
    [theme.breakpoints.down("xs")]: {
      height: "80px",
    },
  },
  marginBottomCard: {
    marginBottom: "30px",
  },
}));

const DisplayAllRegions = () => {
  const regions = useContext(RegionsContext);
  const classes = useStyles();
  const lastItem = regions[regions.length - 1].name;
  return (
    <div className={classes.dropDownBack}>
      <Card className={classes.topSpace} />
      {regions
        .sort((a, b) => b.cases - a.cases)
        .map(({ name, cases }) => (
          <RegionCard
            key={name}
            name={name}
            cases={cases}
            lastItem={lastItem}
          />
        ))}
    </div>
  );
};

export default DisplayAllRegions;
