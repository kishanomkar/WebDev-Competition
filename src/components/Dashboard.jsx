import React, { useState } from "react";
import GDPChart from "./GDPChart";
import ScatterPlot from "./ScatterPlot";
import Heatmap from "./Heatmap";
import { motion } from "framer-motion";
import { citiesData as staticData } from "../data"; // ✅ Importing static data

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const tableRow = {
  hidden: { opacity: 0, y: 10 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1 },
  }),
};

const Dashboard = () => {
  const [citiesData] = useState(staticData);
  const [searchQuery, setSearchQuery] = useState("");
  const [gdpFilter, setGdpFilter] = useState("");

  const filteredCities = citiesData.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (gdpFilter ? city.GDP >= parseFloat(gdpFilter) : true)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4 sm:p-8 font-sans">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-blue-800 mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          India Growth Dashboard
        </motion.h1>

        <motion.p
          className="text-gray-600 text-sm md:text-base mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Visualizing national metrics across cities
        </motion.p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <input
            type="text"
            placeholder="🔍 Search city..."
            className="p-3 rounded-xl w-full sm:w-72 bg-white shadow-md border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="p-3 rounded-xl w-full sm:w-72 bg-white shadow-md border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e) => setGdpFilter(e.target.value)}
          >
            <option value="">🌐 Filter by GDP</option>
            <option value="10">Above 10 Billion USD</option>
            <option value="50">Above 50 Billion USD</option>
            <option value="100">Above 100 Billion USD</option>
            <option value="200">Above 200 Billion USD</option>
            <option value="300">Above 300 Billion USD</option>
          </select>
        </div>

        {/* Table */}
        <motion.div
          className="overflow-x-auto bg-white bg-opacity-90 rounded-xl shadow-xl backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-y-auto h-99 border border-gray-300 rounded-lg shadow-md">
  <table className="w-full min-w-[600px] table-auto text-sm md:text-base">
    <thead>
      <tr className="bg-gradient-to-r from-blue-700 to-purple-600 text-white">
        <th className="p-4">City</th>
        <th className="p-4">GDP (Billion USD)</th>
        <th className="p-4">HDI</th>
        <th className="p-4">Population</th>
        <th className="p-4">Internet Penetration (%)</th>
      </tr>
    </thead>
    <tbody>
      {filteredCities.map((city, index) => (
        <motion.tr
          key={index}
          className="hover:bg-blue-50 transition-all border-b"
          variants={tableRow}
          initial="hidden"
          animate="visible"
          custom={index}
          whileHover={{ scale: 1.01 }}
        >
          <td className="p-3 font-semibold">{city.name}</td>
          <td className="p-3">{city.GDP}</td>
          <td className="p-3">{city.HDI}</td>
          <td className="p-3">{city.population.toLocaleString()}</td>
          <td className="p-3">{city.internetPenetration}%</td>
        </motion.tr>
      ))}
    </tbody>
  </table>
</div>

        </motion.div>

        {/* GDP Chart */}
        <motion.div
          className="mt-12 bg-white rounded-xl shadow-lg p-6 md:p-10 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
            📊 GDP Comparison
          </h2>
          <GDPChart citiesData={filteredCities} />
        </motion.div>

        {/* Scatter Plot */}
        <motion.div
          className="mt-12 bg-white rounded-xl shadow-lg p-6 md:p-10 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
            📈 HDI vs GDP
          </h2>
          <ScatterPlot citiesData={filteredCities} />
        </motion.div>

        {/* Heatmap */}
        <motion.div
          className="mt-12 bg-white rounded-xl shadow-lg p-6 md:p-10 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
            🌍 Economic Disparity
          </h2>
          <Heatmap citiesData={filteredCities} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
