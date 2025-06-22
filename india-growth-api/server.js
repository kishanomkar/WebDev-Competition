const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON data

// Sample data
const citiesData = [
  { name: "Mumbai", GDP: 368, HDI: 0.8, population: 20000000, internetPenetration: 79 },
  { name: "Delhi", GDP: 272, HDI: 0.79, population: 19000000, internetPenetration: 76 },
  { name: "Bangalore", GDP: 250, HDI: 0.81, population: 12000000, internetPenetration: 83 },
];

// API endpoint for cities
app.get("/api/cities", (req, res) => {
  res.json(citiesData);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
