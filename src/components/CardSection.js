import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardSection: {
    backgroundColor: "#cbf2db",
    textAlign: "center",
  },
}));

const CardSection = ({ sectionTitle, sectionContent }) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardSection}>
      <CardContent>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {sectionContent || "-"}
        </Typography>
        <Typography variant="subtitle1">{sectionTitle}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardSection;
