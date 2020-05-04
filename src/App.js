import React, { useEffect } from "react";
import { useTheme, useMediaQuery } from "@material-ui/core";
import MapViewDesktop from "./components/MapViewDesktop";
import MapViewTablet from "./components/MapViewTablet";
import MapViewMobile from "./components/MapViewMobile";
import { fetchAllRegionsRequested } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { DesktopLayout, MobileLayout } from "./layouts";

import Loader from "./components/Loader";
import Error from "./components/Error";

const App = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { loading, error } = useSelector((state) => state.allRegions);

  useEffect(() => {
    dispatch(fetchAllRegionsRequested());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div style={{ width: "100vw", height: "100vh" }}>
        {loading ? (
          <Loader />
        ) : error !== "" ? (
          <Error />
        ) : isMobile ? (
          <MobileLayout>
            <MapViewDesktop />
          </MobileLayout>
        ) : (
          <DesktopLayout>
            <MapViewDesktop />
          </DesktopLayout>
        )}
        {/* {loading ? (
        <Loader />
      ) : error !== "" ? (
        <h1>Something went wrong :(</h1>
      ) : (
        <MainLayout>
          {isMobile ? <MobileView /> : <DesktopView />}
          {isTablet ? (
          isMobile ? (
            <MapViewMobile />
          ) : (
            <MapViewTablet />
          )
        ) : (
          <MapViewDesktop />
        )}
        </MainLayout>
      )} */}
      </div>
    </React.Fragment>
  );
};

export default App;
