import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { citiesData2 } from "../data";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const TrendAnalysis = () => {
  const [selectedMetric, setSelectedMetric] = useState("GDP");

  const chartData = {
    labels: [2021, 2022, 2023], // Years
    datasets: citiesData2.map((city) => ({
      label: city.name,
      data: city.historicalData.map((data) => data[selectedMetric]),
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      backgroundColor: "transparent",
      tension: 0.3,
    })),
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">📈 Trend Analysis</h2>
      <p className="text-gray-600">Track how city metrics evolve over time.</p>

      <select className="border p-2 mb-4" onChange={(e) => setSelectedMetric(e.target.value)}>
        <option value="GDP">GDP (Billion USD)</option>
        <option value="HDI">HDI</option>
        <option value="InternetPenetration">Internet Penetration (%)</option>
        <option value="InflationRate">Inflation Rate (%)</option>
        <option value="PublicDebt">Public Debt (% of GDP)</option>
        <option value="ForestArea">Forest Area (%)</option>
      </select>

      <Line data={chartData} />
    </div>
  );
};

export default TrendAnalysis;
