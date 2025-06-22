import React from "react";
import { Bar } from "react-chartjs-2";
import { citiesData } from "../data";
import { Chart, registerables } from "chart.js";

// Register all necessary components
Chart.register(...registerables);

const GDPChart = () => {
  const data = {
    labels: citiesData.map((city) => city.name),
    datasets: [
      {
        label: "GDP (Billion USD)",
        data: citiesData.map((city) => city.GDP),
        backgroundColor: citiesData.map(
          (_, index) => `rgba(${54 + index * 20}, 162, 235, 0.6)`
        ),
        borderColor: citiesData.map(
          (_, index) => `rgba(${54 + index * 20}, 162, 235, 1)`
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ccc",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.3)",
        },
        ticks: {
          color: "#444",
          font: {
            size: 12,
          },
        },
      },
      x: {
        ticks: {
          color: "#444",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-xl shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
};

export default GDPChart;
