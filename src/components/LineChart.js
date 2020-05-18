import React, { useState } from "react";
import { makeStyles, FormControl, Select, MenuItem } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Line, defaults } from "react-chartjs-2";
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

const generalChartDotsProperties = {
  pointHitRadius: 15,
  borderJoinStyle: "miter",
  pointHoverBorderWidth: 2,
  pointRadius: 0,
  lineTension: 0,
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

const getLineColors = (currentTotalLabel) => {
  switch (currentTotalLabel) {
    case "totalCases":
      return {
        backgroundColor: "rgba(54, 127, 184,0.2)",
        borderColor: "rgb(54, 127, 184)",
        pointHoverBackgroundColor: "rgb(54, 127, 184)",
      };
    case "totalDeaths":
      return {
        backgroundColor: "rgba(200, 87, 87,0.2)",
        borderColor: "rgb(200, 87, 87)",
        pointHoverBackgroundColor: "rgb(200, 87, 87)",
      };
    case "totalDiscarded":
      return {
        backgroundColor: "rgba(218,167,83,0.2)",
        borderColor: "rgb(218,167,83)",
        pointHoverBackgroundColor: "rgb(218,167,83)",
      };
    case "totalRecovered":
      return {
        backgroundColor: "rgba(65,205,124,0.2)",
        borderColor: "rgb(65,205,124)",
        pointHoverBackgroundColor: "rgb(65,205,124)",
      };
    default:
      return {
        backgroundColor: "rgba(126, 126, 126,0.2)",
        borderColor: "rgb(126, 126, 126)",
        pointHoverBackgroundColor: "rgb(126, 126, 126)",
      };
  }
};

const LineChart = () => {
  const classes = useStyles();
  const { name, data } = useSelector((state) => state.regionSearched);
  const dates = listOfDates(getSubData(data, "createdAt"));
  const [currentTotalLabel, setCurrentTotalLabel] = useState("totalCases");

  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <Select
          value={currentTotalLabel}
          onChange={(e) => {
            setCurrentTotalLabel(e.target.value);
          }}
        >
          <MenuItem value="totalCases">Casos</MenuItem>
          <MenuItem value="totalDeaths">Muertes</MenuItem>
          {name.toLowerCase() === "perú" && (
            <MenuItem value="totalDiscarded">Descartados</MenuItem>
          )}
          {name.toLowerCase() === "perú" && (
            <MenuItem value="totalRecovered">Recuperados</MenuItem>
          )}
        </Select>
      </FormControl>
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              data: getSubData(data, currentTotalLabel),
              ...getLineColors(currentTotalLabel),
              ...generalChartDotsProperties,
            },
          ],
        }}
        options={options}
      />
    </React.Fragment>
  );
};

export default LineChart;
