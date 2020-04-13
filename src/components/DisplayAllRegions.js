import React, { useContext } from "react";

import RegionsContext from "../context/RegionsContext";
import RegionCard from "./RegionCard";

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

const DisplayAllRegions = ({ appBarInput }) => {
  const regions = useContext(RegionsContext);
  const classes = useStyles();
  const lastItem = regions[regions.length - 1].name;

  return (
    <div className={classes.dropDownBack}>
      <div className={classes.topSpace} />
      {regions
        .filter(
          (item) =>
            item.name.toLowerCase().indexOf(appBarInput.toLowerCase()) > -1
        )
        .sort((a, b) => b.totalCases - a.totalCases)
        .map(({ name, totalCases }) => (
          <RegionCard
            key={name}
            name={name}
            cases={totalCases}
            lastItem={lastItem}
          />
        ))}
    </div>
  );
};

export default DisplayAllRegions;
