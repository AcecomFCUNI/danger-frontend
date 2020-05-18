import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, makeStyles, IconButton } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { handleDrawer } from "../../../actions";

import Loader from "../../../components/Loader";
import Info from "../../../components/Info";

const useStyles = makeStyles((theme) => ({
  drawerContent: {
    height: "100vh",
    width: "100vw",
    backgroundColor: theme.colors.background,
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center",
  },
}));

const DrawerBottom = () => {
  const classes = useStyles();
  const desktop = useSelector((state) => state.handleDrawer);
  const { loading } = useSelector((state) => state.regionSearched);
  const { loading: loadingInEach } = useSelector(
    (state) => state.dataPerRegionInEachDay
  );
  const dispatch = useDispatch();

  return (
    <Drawer
      variant="temporary"
      anchor="bottom"
      open={desktop}
      onClose={() => {
        dispatch(handleDrawer());
        // dispatch(searchRegionClean());
      }}
    >
      <div className={classes.drawerContent}>
        {loading || loadingInEach ? (
          <Loader />
        ) : (
          <div
            style={{
              width: "80%",
              height: "auto",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              <IconButton
                onClick={() => {
                  dispatch(handleDrawer());
                  // dispatch(searchRegionClean());
                }}
              >
                <CloseRoundedIcon />
              </IconButton>
            </div>
            <Info chartHeight="500px" />
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default DrawerBottom;
