import React, { useState, useEffect, useContext } from "react";

import { IconButton, Grid, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import Loader from "./Loader";
import CardSection from "./CardSection";

import getTotalDataOf from "../functions/getTotalDataOf";
import DropdownContext from "../context/DropdownContext";

const useStyles = makeStyles((theme) => ({
  showDiv: {
    backgroundColor: "#F3F3F3",
    position: "fixed",
    height: "100vh",
    width: "100vw",
    top: 0,
    zIndex: 30,

    transitionDuration: "0.25s",
    transitionProperty: "height",
  },

  hideDiv: {
    zIndex: 30,
    backgroundColor: "#F3F3F3",
    position: "fixed",
    height: "0px",
    width: "100vw",
    top: 0,
    transitionDuration: "0.25s",
    transitionProperty: "height",
  },

  closeBtnGrid: {
    textAlign: "end",
  },

  contentDataGrid: {
    textAlign: "center",
    wordWrap: "break-word",
    overflowY: "scroll",
  },
}));

const SectionDropdown = ({ stringToSearch, defaultOpen }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [dataToShow, setDataToShow] = useState({ success: null, error: null });
  const [loading, setLoading] = useState(true);
  const { setRegionToShow } = useContext(DropdownContext);

  useEffect(() => {
    if (defaultOpen) {
      setIsOpen(defaultOpen);
      if (!dataToShow.success) {
        getTotalDataOf(stringToSearch).then((data) => {
          setDataToShow(data);
          setLoading(false);
        });
      }
    }
  }, [defaultOpen]);

  return (
    <div className={isOpen ? classes.showDiv : classes.hideDiv}>
      {isOpen ? (
        <Grid container>
          <Grid item xs={12} className={classes.closeBtnGrid}>
            <IconButton
              onClick={() => {
                setRegionToShow({ stringToSearch: null, isOpen: false });
                setIsOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} className={classes.contentDataGrid}>
            {loading ? (
              <Loader />
            ) : (
              <React.Fragment>
                <Typography
                  variant="h5"
                  style={{ marginBottom: "20px", fontWeight: "bold" }}
                >
                  {stringToSearch.toUpperCase()}
                </Typography>
                <CardSection
                  sectionTitle="CASOS TOTALES"
                  sectionContent={
                    dataToShow.message.data[dataToShow.message.data.length - 1]
                      .totalCases ||
                    dataToShow.message.data[dataToShow.message.data.length - 1]
                      .data.cases
                  }
                />
                {stringToSearch.toUpperCase() === "PERU" ? (
                  <React.Fragment>
                    <CardSection
                      sectionTitle="DESCARTADOS"
                      sectionContent={
                        dataToShow.message.data[
                          dataToShow.message.data.length - 1
                        ].totalDiscarded
                      }
                    />
                    <CardSection
                      sectionTitle="RECUPERADOS"
                      sectionContent={
                        dataToShow.message.data[
                          dataToShow.message.data.length - 1
                        ].totalRecovered
                      }
                    />
                  </React.Fragment>
                ) : null}
                <CardSection
                  sectionTitle="MUERTOS"
                  sectionContent={
                    dataToShow.message.data[dataToShow.message.data.length - 1]
                      .totalDeaths ||
                    dataToShow.message.data[dataToShow.message.data.length - 1]
                      .data.deaths
                  }
                />
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

export default SectionDropdown;
