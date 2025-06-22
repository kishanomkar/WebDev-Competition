import React from "react";
import { Scatter } from "react-chartjs-2";
import { citiesData } from "../data";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Function to determine color dynamically based on GDP
const getColor = (GDP) => {
  if (GDP > 300) return "rgba(255, 99, 132, 0.6)";  // Red for high GDP
  if (GDP > 200) return "rgba(255, 159, 64, 0.6)";  // Orange for mid-range GDP
  return "rgba(75, 192, 192, 0.6)";  // Green for lower GDP
};

const ScatterPlot = () => {
  const data = {
    datasets: [
      {
        label: "HDI vs GDP",
        data: citiesData.map((city) => ({ x: city.GDP, y: city.HDI })),
        backgroundColor: citiesData.map((city) => getColor(city.GDP)),
      },
    ],
  };

  return <Scatter data={data} />;
};

export default ScatterPlot;
