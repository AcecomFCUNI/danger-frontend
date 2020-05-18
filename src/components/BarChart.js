import React, { useState } from "react";
import { makeStyles, FormControl, Select, MenuItem } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Bar, defaults } from "react-chartjs-2";
import { listOfDates } from "../functions/Utils";

defaults.global.animation = false;
defaults.global.legend = false;

const options = {
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    backgroundColor: "#000",
  },
};

const generalProperties = {
  borderWidth: 1,
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const getSubData = (data, stringToReturn) => {
  return data.map((item) => item[stringToReturn]);
};

const getBarColors = (currentTotalLabel) => {
  switch (currentTotalLabel) {
    case "cases":
      return {
        backgroundColor: "rgb(54, 127, 184)",
      };
    case "deaths":
      return {
        backgroundColor: "rgb(200, 87, 87)",
      };
    case "discarded":
      return {
        backgroundColor: "rgb(218,167,83)",
      };
    case "recovered":
      return {
        backgroundColor: "rgb(65,205,124)",
      };
    default:
      return {
        backgroundColor: "rgb(126, 126, 126)",
      };
  }
};

const BarChart = () => {
  const classes = useStyles();
  const { name, data } = useSelector((state) => state.dataPerRegionInEachDay);
  const dates = listOfDates(getSubData(data, "createdAt"));
  const [currentTotalLabel, setCurrentTotalLabel] = useState("cases");

  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <Select
          value={currentTotalLabel}
          onChange={(e) => {
            setCurrentTotalLabel(e.target.value);
          }}
        >
          <MenuItem value="cases">Casos</MenuItem>
          <MenuItem value="deaths">Muertes</MenuItem>
          {name.toLowerCase() === "perú" && (
            <MenuItem value="discarded">Descartados</MenuItem>
          )}
          {name.toLowerCase() === "perú" && (
            <MenuItem value="recovered">Recuperados</MenuItem>
          )}
        </Select>
      </FormControl>
      <Bar
        data={{
          labels: dates.reverse(),
          datasets: [
            {
              data: getSubData(data, currentTotalLabel).reverse(),
              ...getBarColors(currentTotalLabel),
              ...generalProperties,
            },
          ],
        }}
        options={options}
      />
    </React.Fragment>
  );
};

export default BarChart;
