import React, { useState } from "react";
import { citiesData2 } from "../data";

const RankingSystem = () => {
  const [selectedMetric, setSelectedMetric] = useState("GDP");
  const [sortOrder, setSortOrder] = useState("desc"); // Default to descending order

  const sortedCities = [...citiesData2].sort((a, b) =>
    sortOrder === "desc" ? b[selectedMetric] - a[selectedMetric] : a[selectedMetric] - b[selectedMetric]
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">🏆 City Ranking System</h2>
      <p className="text-gray-600">Sort cities based on different metrics.</p>

      {/* Metric Selection */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Sort By:</label>
        <select className="border p-2" onChange={(e) => setSelectedMetric(e.target.value)}>
          <option value="GDP">GDP (Billion USD)</option>
          <option value="HDI">HDI</option>
          <option value="InternetPenetration">Internet Penetration (%)</option>
          <option value="InflationRate">Inflation Rate (%)</option>
          <option value="PublicDebt">Public Debt (% of GDP)</option>
          <option value="ForestArea">Forest Area (%)</option>
        </select>
      </div>

      {/* Sort Order */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Order:</label>
        <select className="border p-2" onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Ranked Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Rank</th>
            <th className="border p-2">City</th>
            <th className="border p-2">{selectedMetric}</th>
          </tr>
        </thead>
        <tbody>
          {sortedCities.map((city, index) => (
            <tr key={city.name} className="hover:bg-gray-100">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{city.name}</td>
              <td className="border p-2">{city[selectedMetric]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingSystem;
