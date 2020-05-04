import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatNumber } from "../../../functions/Utils";

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    textAlign: "center",
    padding: "10px",
    width: "80%",
    borderRadius: "4px",
    marginBottom: "10px",
  },
}));

const CardSection = ({
  backgroundColor = "#41CD7C",
  color = "#000",
  sectionTitle,
  sectionContent,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} container justify="center">
      <div className={classes.cardStyle} style={{ backgroundColor, color }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {formatNumber(sectionContent) || "-"}
        </Typography>
        <Typography variant="subtitle1">{sectionTitle}</Typography>
      </div>
    </Grid>
  );
};

export default CardSection;
