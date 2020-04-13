import React, { useContext, useState } from "react";

import { Card, CardContent, Typography, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RegionsContext from "../context/RegionsContext";
import DrawerTest from "./DrawerTest";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    overflowY: "scroll",
    position: "fixed",
    right: 0,
    zIndex: 20,
    height: "100vh",
    [theme.breakpoints.up("md")]: {
      width: "30vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: "25vw",
    },
  },
  item: {
    padding: theme.spacing(2),
    backgroundColor: "#F3F3F3",
    "&:hover": {
      backgroundColor: "#CBF2DB",
      cursor: "pointer",
    },
  },
}));

const Region = ({ name, population, cases, deaths }) => {
  return (
    <React.Fragment>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="subtitle1">Población: {population}</Typography>
      <Typography variant="subtitle1">Casos confirmados: {cases}</Typography>
      <Typography variant="subtitle1">Fallecidos: {deaths}</Typography>
    </React.Fragment>
  );
};

const Sidebar = () => {
  const [stateRegion, setStateRegion] = useState({
    state: false,
    region: null,
  });
  const regions = useContext(RegionsContext);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.sidebar}>
        <CardContent style={{ margin: 0, padding: 0 }}>
          {regions
            .sort((a, b) => b.totalCases - a.totalCases)
            .map(({ name, totalPopulation, totalCases, totalDeaths }) => (
              <div
                key={name}
                className={classes.item}
                onClick={() =>
                  setStateRegion({
                    state: true,
                    region: {
                      name,
                      totalPopulation,
                      totalCases,
                      totalDeaths,
                    },
                  })
                }
              >
                <Region
                  name={name}
                  population={totalPopulation}
                  cases={totalCases}
                  deaths={totalDeaths}
                />
              </div>
            ))}
          {stateRegion.state ? (
            <Drawer
              variant="temporary"
              anchor="bottom"
              open={stateRegion.state}
              onClose={() =>
                setStateRegion({
                  state: false,
                  region: null,
                })
              }
            >
              <Card>
                <CardContent>
                  <Typography variant="h3">
                    {stateRegion.region.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    Población: {stateRegion.region.totalPopulation}
                  </Typography>
                  <Typography variant="subtitle1">
                    Casos confirmados: {stateRegion.region.totalCases}
                  </Typography>
                  <Typography variant="subtitle1">
                    Fallecidos: {stateRegion.region.totalDeaths}
                  </Typography>
                </CardContent>
              </Card>
              <DrawerTest />
            </Drawer>
          ) : null}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Sidebar;
