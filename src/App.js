import React from "react";
import { useTheme, useMediaQuery } from "@material-ui/core";

import Dashboard from "./layouts/Dashboard";
import MapViewDesktop from "./components/MapViewDesktop";
import MapViewTablet from "./components/MapViewTablet";
import MapViewMobile from "./components/MapViewMobile";

import "./components/main.css";

const App = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <React.Fragment>
      <Dashboard>
        {isTablet ? (
          isMobile ? (
            <MapViewMobile />
          ) : (
            <MapViewTablet />
          )
        ) : (
          <MapViewDesktop />
        )}
      </Dashboard>
    </React.Fragment>
  );
};

export default App;
