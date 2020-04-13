import React, { useState, useContext } from "react";
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
import PeruIcon from "../images/peruIcon.png";

import DisplayAllRegions from "./DisplayAllRegions";
import DropdownContext from "../context/DropdownContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    borderRadius: "8px",
    margin: "2% 2%",
    width: "96%",
    backgroundColor: "white",
    color: theme.colors.grey,
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
  const classes = useStyles();
  const [onEditInput, setOnEditInput] = useState(false);
  const { setRegionToShow } = useContext(DropdownContext);
  const [appBarInput, setAppBarInput] = useState("");

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {onEditInput ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setAppBarInput("");
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
              value={appBarInput}
              style={{ width: "100%" }}
              onClick={() => setOnEditInput(true)}
              onChange={(event) => setAppBarInput(event.target.value)}
              placeholder="Buscar región..."
              inputProps={{ "aria-label": "region-search" }}
            />
          </div>

          <IconButton
            edge="end"
            aria-label="mostrar datos totales"
            onClick={() =>
              setRegionToShow({ stringToSearch: "PERU", isOpen: true })
            }
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
      {onEditInput ? <DisplayAllRegions appBarInput={appBarInput} /> : null}
    </React.Fragment>
  );
};

export default CustomAppBar;
