import React, { useState } from "react";
import {
  Paper,
  IconButton,
  InputBase,
  Button,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core/styles";

import AllRegions from "../../../components/AllRegions";
import { useDispatch, useSelector } from "react-redux";

import {
  handleDrawer,
  searchRegionRequested,
  dataInEachDayRequested,
} from "../../../actions";
import { formatNumber } from "../../../functions/Utils";

const headerSidebarSize = 200;

const generalStyles = {
  zIndex: 20,
  position: "fixed",
  right: 0,
  overflowY: "hidden",
};

const useStyles = makeStyles((theme) => ({
  headerSidebar: {
    ...generalStyles,
    backgroundColor: theme.colors.background,
    top: 0,
    height: 210,
    padding: "0 20px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    width: "350px",
  },
  totalCasesNumber: {
    textAlign: "center",
    color: theme.colors.fontTitle,
  },
  showTotalCasesButton: {
    marginBottom: "15px",
    color: "#FFF",
    fontWeight: "bold",
    backgroundColor: theme.colors.totalCasesButton,
    "&:hover": {
      backgroundColor: theme.colors.totalCasesButtonHover,
    },
  },
  bodySidebar: {
    ...generalStyles,
    backgroundColor: theme.colors.background,
    bottom: 0,
    height: `calc(100vh - ${headerSidebarSize}px)`,
    width: "390px",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [stringToSearch, setStringToSearch] = useState("");
  const { totalCases } = useSelector((state) => state.allRegions.total);

  return (
    <React.Fragment>
      <div className={classes.headerSidebar}>
        <Typography className={classes.totalCasesNumber} variant="h2">
          {formatNumber(parseInt(totalCases))}
        </Typography>
        <Button
          onClick={() => {
            dispatch(searchRegionRequested("perú"));
            dispatch(dataInEachDayRequested("perú"));
            dispatch(handleDrawer());
          }}
          variant="contained"
          className={classes.showTotalCasesButton}
        >
          Mostrar casos totales
        </Button>
        <Paper elevation={0} style={{ backgroundColor: "#E5E5E5" }}>
          <IconButton disabled>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Buscar región..."
            onChange={(e) => setStringToSearch(e.target.value)}
          />
        </Paper>
      </div>
      <div className={classes.bodySidebar}>
        <AllRegions stringToSearch={stringToSearch} />
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
