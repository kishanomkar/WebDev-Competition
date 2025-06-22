import React from "react";
import { Bar } from "react-chartjs-2";
import { citiesData } from "../data";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Function to generate random colors
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 200) + 55;
  const g = Math.floor(Math.random() * 200) + 55;
  const b = Math.floor(Math.random() * 200) + 55;
  return `rgba(${r}, ${g}, ${b}, 0.6)`;
};

const HDIChart = () => {
  const data = {
    labels: citiesData.map((city) => city.name),
    datasets: [
      {
        label: "Human Development Index (HDI)",
        data: citiesData.map((city) => city.HDI),
        backgroundColor: citiesData.map(() => getRandomColor()),
        borderColor: citiesData.map(() => getRandomColor().replace("0.6", "1")),
        borderWidth: 1, // Ensures thin bar borders
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
    barPercentage: 0.6, // Makes bars thinner for spacing
    categoryPercentage: 0.4, // Increases gaps between columns
  };

  return (
    <div className="h-[1400px] w-full p-6 bg-white rounded-lg shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default HDIChart;
