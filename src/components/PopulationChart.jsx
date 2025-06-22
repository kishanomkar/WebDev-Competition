import React from "react";
import { Pie } from "react-chartjs-2";
import { citiesData } from "../data";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Function to generate random bright colors
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 200) + 55;  // Ensures brightness
  const g = Math.floor(Math.random() * 200) + 55;
  const b = Math.floor(Math.random() * 200) + 55;
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
};

const PopulationChart = () => {
  const data = {
    labels: citiesData.map((city) => city.name),
    datasets: [
      {
        label: "Population",
        data: citiesData.map((city) => city.population),
        backgroundColor: citiesData.map(() => getRandomColor()),
        borderColor: citiesData.map(() => getRandomColor().replace("0.6", "1")),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
  };

  return <Pie data={data} options={options} />;
};

export default PopulationChart;
