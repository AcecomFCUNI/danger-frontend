import React from "react";
import { useSelector } from "react-redux";
import { useTheme, useMediaQuery, makeStyles } from "@material-ui/core";

import RegionCard from "./RegionCard";

const useStyles = makeStyles((theme) => ({
  regionCard: {
    backgroundColor: theme.colors.background,
    padding: "1.5% 0",
    height: "56px",
  },
}));

const AllRegions = ({ stringToSearch }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { regions } = useSelector((state) => state.allRegions);

  return (
    <div
      style={{
        height: "100%",
        overflowY: "scroll",
        backgroundColor: "#DADADA",
      }}
    >
      {/* spacing for appbar */}
      {isMobile ? <div className={classes.regionCard} /> : null}
      {regions
        .filter(
          (item) =>
            item.name.toLowerCase().indexOf(stringToSearch.toLowerCase()) > -1
        )
        .sort((a, b) => b.totalCases - a.totalCases)
        .map(({ name, totalCases }) => (
          <RegionCard
            isMobile={isMobile}
            key={name}
            name={name}
            cases={totalCases}
          />
        ))}
    </div>
  );
};

export default AllRegions;
