import React from "react";

import { Grid, Typography } from "@material-ui/core";

import Loader from "./Loader";
import CardSection from "../layouts/MobileLayout/components/CardSection";

import { useSelector } from "react-redux";
import Statistics from "./Statistics";

const Info = ({ chartHeight = "300px" }) => {
  const {
    regionSearched: { name, loading },
  } = useSelector((state) => state);
  const peru = useSelector((state) => state.allRegions.total);
  const region = useSelector((state) => state.allRegions.regions).find(
    (region) => region.name.toLowerCase() === name.toLowerCase()
  );
  let lastData = {};
  if (name.toLowerCase() === "peru") lastData = peru;
  else lastData = region;

  return (
    <React.Fragment>
      <Typography
        variant="h2"
        style={{
          padding: "30px",
          marginTop: "20px",
          fontSize: "35px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {name.toUpperCase()}
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Grid container style={{ margin: 0, width: "100%" }}>
            <Grid container item>
              <CardSection
                color="#FFF"
                backgroundColor="#367FB8"
                sectionTitle="CASOS TOTALES"
                sectionContent={lastData.totalCases}
              />
              <CardSection
                color="#FFF"
                backgroundColor="#C85757"
                sectionTitle="MUERTOS"
                sectionContent={lastData.totalDeaths}
              />
            </Grid>
            {name.toLowerCase() === "peru" ? (
              <Grid container item>
                <CardSection
                  backgroundColor="#DAA753"
                  sectionTitle="DESCARTADOS"
                  sectionContent={lastData.totalDiscarded}
                />
                <CardSection
                  sectionTitle="RECUPERADOS"
                  sectionContent={lastData.totalRecovered}
                />
              </Grid>
            ) : null}
          </Grid>
          <div
            style={{
              height: chartHeight,
              paddingBottom: "200px",
              margin: "10px 30px",
            }}
          >
            <Typography
              variant="h3"
              style={{ fontSize: "25px", marginTop: "30px" }}
            >
              Evolución:
            </Typography>
            <Statistics />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Info;
