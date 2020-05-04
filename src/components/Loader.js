import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bottom: {
    color: theme.palette.primary,
    animationDuration: "550ms",
  },
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "100%", width: "100%" }}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        size={50}
        thickness={4}
        className={classes.bottom}
      />
    </Grid>
  );
};

export default Loader;
