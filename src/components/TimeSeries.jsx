import React from "react";
import TimeSeriesChart from "../components/TimeSeriesChart"; // Assuming you have a TimeSeriesChart component

const TimeSeries = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">📊 Time-Series Analysis</h1>
      <p className="text-gray-600">Explore how cities evolve over time.</p>

      <div className="mt-6">
        <TimeSeriesChart />
      </div>
    </div>
  );
};

export default TimeSeries;
