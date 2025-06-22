import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { citiesData2 } from "../data";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const metrics = ["GDP", "HDI", "InternetPenetration", "InflationRate", "PublicDebt", "ForestArea"];

const computeCorrelation = (data, metric1, metric2) => {
  const x = data.map((city) => city[metric1]);
  const y = data.map((city) => city[metric2]);
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
  const sumX2 = x.map((xi) => xi ** 2).reduce((a, b) => a + b, 0);
  const sumY2 = y.map((yi) => yi ** 2).reduce((a, b) => a + b, 0);
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
  return denominator !== 0 ? (numerator / denominator).toFixed(2) : 0;
};

const CorrelationMatrix = () => {
  const [view, setView] = useState("matrix");
  const [sortBy, setSortBy] = useState("GDP");

  const correlationData = metrics.map((m1) =>
    metrics.map((m2) => computeCorrelation(citiesData2, m1, m2))
  );

  const sortedMetrics = [...metrics].sort((a, b) => {
    const idx = metrics.indexOf(sortBy);
    return correlationData[idx][metrics.indexOf(b)] - correlationData[idx][metrics.indexOf(a)];
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📊 Correlation Matrix & 📈 Trend Analysis</h2>
        <div className="space-x-2">
          <button onClick={() => setView("matrix")} className={`px-3 py-1 rounded ${view === "matrix" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Matrix</button>
          <button onClick={() => setView("trend")} className={`px-3 py-1 rounded ${view === "trend" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Trends</button>
        </div>
      </div>

      {view === "matrix" ? (
        <>
          <p className="text-gray-600 mb-2">Analyze relationships between development metrics.</p>
          <div className="mb-4">
            <label className="mr-2 font-semibold">Sort By:</label>
            <select className="border p-2" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {metrics.map((metric) => (
                <option key={metric} value={metric}>{metric}</option>
              ))}
            </select>
          </div>

          <table className="w-full border-collapse border mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Metric</th>
                {sortedMetrics.map((metric) => (
                  <th key={metric} className="border p-2">{metric}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedMetrics.map((m1) => (
                <tr key={m1}>
                  <td className="border p-2 font-semibold">{m1}</td>
                  {sortedMetrics.map((m2) => {
                    const val = correlationData[metrics.indexOf(m1)][metrics.indexOf(m2)];
                    const colorClass = val > 0.7 ? "bg-green-300" : val < -0.7 ? "bg-red-300" : "";
                    return <td key={m2} className={`border p-2 ${colorClass}`}>{val}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <p className="text-gray-600 mb-4">📈 Historical trends of all key metrics by city.</p>
          {metrics.map((metric) => {
            const chartData = {
              labels: citiesData2[0]?.historicalData.map((d) => d.year),
              datasets: citiesData2.map((city) => ({
                label: city.name,
                data: city.historicalData.map((d) => d[metric]),
                borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                backgroundColor: "transparent",
                tension: 0.3,
              })),
            };

            return (
              <div key={metric} className="mb-10">
                <h3 className="text-lg font-bold mb-2">📉 {metric} Trend</h3>
                <Line data={chartData} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CorrelationMatrix;
