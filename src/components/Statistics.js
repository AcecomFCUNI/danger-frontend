import React from "react";
import { Card, CardContent, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    height: "100vh",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Statistics() {
  const classes = useStyles();
  return (
    <Card>
      <Paper className={classes.paper} elevation={3}>
        nothing...
      </Paper>
    </Card>
  );
}
