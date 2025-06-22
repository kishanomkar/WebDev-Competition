import React, { useState } from "react";
import { Bar, Line, Radar } from "react-chartjs-2";
import { citiesData2 } from "../data";
import { Chart, registerables } from "chart.js";
import { generatePdfReport } from "../utils/generatePdfReport";


Chart.register(...registerables);

const MultiCityComparison = () => {
  const [selectedCities, setSelectedCities] = useState(["Mumbai", "Delhi NCR"]);

  const handleCitySelection = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCities([...selectedCities, value]);
    } else {
      setSelectedCities(selectedCities.filter((city) => city !== value));
    }
  };

  const filteredData = citiesData2.filter((city) =>
    selectedCities.includes(city.name)
  );

  const labels = filteredData.map((city) => city.name);
  const GDPValues = filteredData.map((city) => city.GDP);
  const HDIValues = filteredData.map((city) => city.HDI);
  const InternetPenetration = filteredData.map((city) => city.InternetPenetration);
  const InflationRate = filteredData.map((city) => city.InflationRate);
  const PublicDebt = filteredData.map((city) => city.PublicDebt);
  const ForestArea = filteredData.map((city) => city.ForestArea);

  const generateChartData = (label, data, bgColor) => ({
    labels,
    datasets: [{ label, data, backgroundColor: bgColor }],
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">🏙️ Multi-City Comparison</h2>
      <p className="text-gray-600">Select cities to compare their development metrics.</p>
      <button
  onClick={() =>
    generatePdfReport({
      narrativeId: "narrative-block",
      chartId: "trend-chart",
      mapId: "leaflet-map",
      filename: "smart-report"
    })
  }
  className="px-4 py-2 bg-red-600 text-white rounded shadow"
>
  📄 Export PDF Report
</button>

      <div className="flex flex-wrap gap-2 mb-4">
        {citiesData2.map((city) => (
          <label key={city.name} className="flex items-center space-x-2">
            <input type="checkbox" value={city.name} onChange={handleCitySelection} checked={selectedCities.includes(city.name)} />
            <span>{city.name}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md"><h3 className="text-lg font-bold">📊 GDP Comparison</h3><Bar data={generateChartData("GDP (Billion USD)", GDPValues, "rgba(255, 99, 132, 0.6)")} /></div>
        <div className="bg-white p-4 rounded-lg shadow-md"><h3 className="text-lg font-bold">📈 HDI Comparison</h3><Line data={generateChartData("HDI", HDIValues, "rgba(54, 162, 235, 0.6)")} /></div>
        <div className="bg-white p-4 rounded-lg shadow-md"><h3 className="text-lg font-bold">🌐 Internet Penetration</h3><Bar data={generateChartData("Internet Penetration (%)", InternetPenetration, "rgba(75, 192, 192, 0.6)")} /></div>
        <div className="bg-white p-4 rounded-lg shadow-md"><h3 className="text-lg font-bold">📉 Inflation Rate</h3><Radar data={generateChartData("Inflation Rate (%)", InflationRate, "rgba(153, 102, 255, 0.6)")} /></div>
        <div className="bg-white p-4 rounded-lg shadow-md"><h3 className="text-lg font-bold">💰 Public Debt (% of GDP)</h3><Bar data={generateChartData("Public Debt (% of GDP)", PublicDebt, "rgba(255, 159, 64, 0.6)")} /></div>
        <div className="bg-white p-4 rounded-lg shadow-md"><h3 className="text-lg font-bold">🌳 Forest Area Comparison</h3><Bar data={generateChartData("Forest Area (%)", ForestArea, "rgba(102, 204, 51, 0.6)")} /></div>
      </div>

      
    </div>
  );
};

export default MultiCityComparison;
