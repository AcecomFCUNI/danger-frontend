import React from "react";

import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import { handleDrawer } from "../../../actions";
import Info from "../../../components/Info";

const useStyles = makeStyles((theme) => ({
  showDiv: {
    backgroundColor: theme.colors.background,
    position: "fixed",
    height: "100vh",
    width: "100vw",
    top: 0,
    zIndex: 30,
    overflowY: "scroll",
    transitionDuration: "0.25s",
    transitionProperty: "height",
  },

  hideDiv: {
    zIndex: 30,
    backgroundColor: theme.colors.background,
    position: "fixed",
    height: "0px",
    width: "100vw",
    top: 0,
    transitionDuration: "0.25s",
    transitionProperty: "height",
  },
}));

const SectionDropdown = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleDrawer: open } = useSelector((state) => state);

  return (
    <div className={open ? classes.showDiv : classes.hideDiv}>
      {open ? (
        <React.Fragment>
          <div style={{ position: "fixed", right: 0 }}>
            <IconButton
              onClick={() => {
                // dispatch(searchRegionClean());
                dispatch(handleDrawer());
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Info chartHeight="400px" />
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default SectionDropdown;
