import React from "react";
import { useSelector } from "react-redux";
import { Line, defaults } from "react-chartjs-2";
import { listOfDates } from "../functions/Utils";

defaults.global.animation = false;

const getSubData = (data, stringToReturn) => {
  return data.map((item) => item[stringToReturn]);
};

const Statistics = () => {
  const { data } = useSelector((state) => state.regionSearched);
  const dates = listOfDates(getSubData(data, "createdAt"));
  const casesPerDate = getSubData(data, "totalCases");

  let options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
    },
  };

  const dataFrame = {
    type: "line",
    labels: dates,
    datasets: [
      {
        lineTension: 0,
        label: "Casos confirmados",
        pointRadius: 0,
        pointHitRadius: 10,
        borderJoinStyle: "miter",
        backgroundColor: "rgba(49, 165, 169,0.2)",
        borderColor: "rgb(49, 165, 169)",
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: "#FFF",
        data: casesPerDate,
      },
    ],
  };

  return <Line data={dataFrame} options={options} />;
};

export default Statistics;
