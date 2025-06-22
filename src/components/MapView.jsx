import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from "react-leaflet";
import { citiesData } from "../data";
import "leaflet/dist/leaflet.css";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip as ChartTooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import html2canvas from "html2canvas";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, ChartTooltip, Legend);

const metrics = ["GDP", "HDI", "internetPenetration", "economicDisparity"];
const years = [2021, 2022, 2023];

const getColor = (value, metric) => {
  if (metric === "HDI") return value > 0.8 ? "#28a745" : value > 0.75 ? "#ffc107" : "#dc3545";
  if (metric === "internetPenetration") return value > 75 ? "#007bff" : value > 70 ? "#17a2b8" : "#6c757d";
  if (metric === "economicDisparity") return value > 30 ? "#e3342f" : value > 28 ? "#f6993f" : "#38c172";
  return value > 100 ? "#6610f2" : value > 50 ? "#6f42c1" : "#b8daff";
};

const Sparkline = ({ city, metric }) => {
  const values = city.historicalData?.map((d) => d[metric]);
  const data = {
    labels: years,
    datasets: [
      {
        label: `${metric}`,
        data: values,
        borderColor: "#007bff",
        tension: 0.4,
        pointRadius: 2,
        fill: false
      }
    ]
  };
  return (
    <div style={{ width: 250, height: 150 }}>
      <Line
        data={data}
        options={{
          plugins: { legend: { display: false } },
          scales: { y: { ticks: { precision: 2 } } }
        }}
      />
    </div>
  );
};

const LegendBox = ({ metric }) => {
  const legends = {
    GDP: ["< 50", "50–100", "> 100"],
    HDI: ["< 0.75", "0.75–0.8", "> 0.8"],
    internetPenetration: ["< 70", "70–75", "> 75"],
    economicDisparity: ["< 28", "28–30", "> 30"]
  };
  const colors = {
    GDP: ["#b8daff", "#6f42c1", "#6610f2"],
    HDI: ["#dc3545", "#ffc107", "#28a745"],
    internetPenetration: ["#6c757d", "#17a2b8", "#007bff"],
    economicDisparity: ["#38c172", "#f6993f", "#e3342f"]
  };
  return (
    <div className="absolute top-28 right-6 bg-white border p-3 shadow-md rounded text-sm z-50">
      <h4 className="font-semibold mb-2">Legend: {metric}</h4>
      {legends[metric].map((label, i) => (
        <div key={i} className="flex items-center gap-2 mb-1">
          <div style={{ width: 16, height: 16, backgroundColor: colors[metric][i] }}></div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

const MapView = () => {
  const [selectedMetric, setSelectedMetric] = useState("GDP");
  const [year, setYear] = useState(2023);
  const [filter, setFilter] = useState("");
  const [radiusMode, setRadiusMode] = useState("metric");
  const [playing, setPlaying] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setYear((prev) => (prev >= 2023 ? 2021 : prev + 1));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [playing]);

  const handleScreenshot = () => {
    const mapNode = document.querySelector(".leaflet-container");
    html2canvas(mapNode).then((canvas) => {
      const link = document.createElement("a");
      link.download = "map-screenshot.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const filteredCities = citiesData.filter((city) => {
    const val = city[selectedMetric] ?? city.historicalData?.find((d) => d.year === year)?.[selectedMetric];
    if (!filter) return true;
    if (filter === "high") {
      if (selectedMetric === "HDI") return val > 0.8;
      if (selectedMetric === "GDP") return val > 100;
      return val > 75;
    }
    if (filter === "low") {
      if (selectedMetric === "HDI") return val < 0.75;
      if (selectedMetric === "GDP") return val < 50;
      return val < 70;
    }
    return true;
  });

  return (
    <div className="p-6 relative">
      <h2 className="text-xl font-bold mb-4">🗺️ Interactive Development Map</h2>

      <div className="flex flex-wrap gap-4 items-center mb-4">
        <label className="font-semibold">Metric:</label>
        <select className="border p-2" value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
          {metrics.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <label className="font-semibold">Year:</label>
        <select className="border p-2" value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <button onClick={() => setPlaying(!playing)} className="px-3 py-1 border bg-blue-500 text-white rounded">
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>

        <label className="font-semibold">Filter:</label>
        <select className="border p-2" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>

        <label className="font-semibold">Radius:</label>
        <select className="border p-2" value={radiusMode} onChange={(e) => setRadiusMode(e.target.value)}>
          <option value="metric">By Metric</option>
          <option value="population">By Population</option>
        </select>

        <button onClick={handleScreenshot} className="px-3 py-1 border border-blue-500 rounded text-blue-600">
          📷 Export PNG
        </button>
      </div>

      <MapContainer ref={mapRef} center={[22.9734, 78.6569]} zoom={5} style={{ height: "600px", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredCities.map((city) => {
          const metricValue = city[selectedMetric] ?? city.historicalData?.find((d) => d.year === year)?.[selectedMetric];
          const radius = radiusMode === "population" ? Math.sqrt(city.population) / 1000 : Math.sqrt(metricValue) * 2;

          return (
            <CircleMarker
              key={city.name}
              center={[city.lat, city.lng]}
              radius={radius}
              fillColor={getColor(metricValue, selectedMetric)}
              color="#222"
              fillOpacity={0.75}
              stroke
            >
              <Tooltip>{city.name}</Tooltip>
              <Popup>
                <strong>{city.name}</strong>
                <br />
                {selectedMetric}: {metricValue}
                <br />
                Population: {city.population.toLocaleString()}
                <hr />
                <Sparkline city={city} metric={selectedMetric} />
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <LegendBox metric={selectedMetric} />
    </div>
  );
};

export default MapView;
