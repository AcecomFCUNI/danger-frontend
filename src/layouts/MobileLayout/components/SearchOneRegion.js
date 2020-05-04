import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AllRegions from "../../../components/AllRegions";

const useStyles = makeStyles(() => ({
  background: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    overflowY: "hidden",
    zIndex: 15,
  },
}));

const SearchOneRegion = ({ stringToSearch }) => {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <AllRegions stringToSearch={stringToSearch} />
    </div>
  );
};

export default SearchOneRegion;
