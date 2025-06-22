import React from "react";
import { Bubble } from "react-chartjs-2";
import { citiesData } from "../data";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Generate color dynamically based on economic disparity
const getColor = (disparity) => {
  if (disparity > 30) return "rgba(255, 99, 132, 0.6)";  // Red (high disparity)
  if (disparity > 27) return "rgba(255, 159, 64, 0.6)";  // Orange (moderate)
  return "rgba(75, 192, 192, 0.6)";  // Green (low disparity)
};

const Heatmap = () => {
  const data = {
    datasets: citiesData.map((city) => ({
      label: city.name,
      data: [{ x: city.GDP, y: city.population, r: city.economicDisparity }],
      backgroundColor: getColor(city.economicDisparity),
      borderColor: getColor(city.economicDisparity).replace("0.6", "1"), // Darker border
    })),
  };

  return <Bubble data={data} />;
};

export default Heatmap;
