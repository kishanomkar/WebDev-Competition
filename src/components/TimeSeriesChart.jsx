import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { citiesData2 } from "../data";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const TimeSeriesChart = () => {
  const [selectedCity, setSelectedCity] = useState("Mumbai");

  const getCityDatasets = (city) => {
    return [
      {
        label: `${city.name} - GDP (B USD)`,
        data: city.historicalData.map((d) => d.GDP),
        borderColor: `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 1)`,
        backgroundColor: "transparent",
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: `${city.name} - HDI`,
        data: city.historicalData.map((d) => d.HDI),
        borderColor: `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, 1)`,
        backgroundColor: "transparent",
        borderDash: [5, 5],
        tension: 0.3,
        yAxisID: 'y1',
      },
    ];
  };

  let labels = [];
  let datasets = [];

  if (selectedCity === "All Cities") {
    labels = citiesData2[0]?.historicalData.map((d) => d.year); // Assuming all cities have same years
    citiesData2.forEach((city) => {
      datasets.push(...getCityDatasets(city));
    });
  } else {
    const city = citiesData2.find((c) => c.name === selectedCity);
    if (city) {
      labels = city.historicalData.map((d) => d.year);
      datasets = getCityDatasets(city);
    }
  }

  const data = { labels, datasets };

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    stacked: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: selectedCity === "All Cities" ? "All Cities Comparison" : `GDP & HDI for ${selectedCity}` },
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        title: { display: true, text: "GDP (Billion USD)" },
      },
      y1: {
        type: "linear",
        position: "right",
        title: { display: true, text: "HDI" },
        grid: { drawOnChartArea: false },
        min: 0.7,
        max: 0.85,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">📈 Time-Series Analysis</h2>
      <select
        className="border p-2 mb-4"
        onChange={(e) => setSelectedCity(e.target.value)}
        value={selectedCity}
      >
        <option value="All Cities">All Cities</option>
        {citiesData2.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <Line data={data} options={options} />
    </div>
  );
};

export default TimeSeriesChart;
