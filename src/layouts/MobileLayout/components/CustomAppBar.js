import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PeruIcon from "../../../images/peruIcon.png";

import SearchOneRegion from "./SearchOneRegion";
import { useDispatch } from "react-redux";
import { searchRegionRequested, handleDrawer } from "../../../actions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#E5E5E5",
    position: "fixed",
    borderRadius: "8px",
    margin: "1.5% 2%",
    width: "96%",
    color: "gray",
    zIndex: 20,
    overflow: "hidden",
  },

  menuButton: {
    marginRight: theme.spacing(1),
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
  },

  peruButton: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const CustomAppBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [onEditInput, setOnEditInput] = useState(false);
  const [stringToSearch, setStringToSearch] = useState("");

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ minHeight: "56px" }}>
          {onEditInput ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setStringToSearch("");
                setOnEditInput(false);
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          )}

          <div className={classes.search}>
            <InputBase
              value={stringToSearch}
              style={{ width: "100%" }}
              onClick={() => setOnEditInput(true)}
              onChange={(event) => setStringToSearch(event.target.value)}
              placeholder="Buscar región..."
              inputProps={{ "aria-label": "region-search" }}
            />
          </div>

          <IconButton
            edge="end"
            aria-label="mostrar datos totales"
            onClick={() => {
              dispatch(searchRegionRequested("perú"));
              dispatch(handleDrawer());
            }}
            color="inherit"
          >
            <Avatar
              alt="Datos totales"
              src={PeruIcon}
              className={classes.peruButton}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      {onEditInput ? <SearchOneRegion stringToSearch={stringToSearch} /> : null}
    </React.Fragment>
  );
};

export default CustomAppBar;
