import React from "react";
import { citiesData } from "../data";

const SmartNarrative = ({ year = 2023 }) => {
  const highHDI = citiesData.filter(c => c.HDI > 0.8);
  const highInternet = citiesData.filter(c => c.internetPenetration > 80);
  const highGDP = citiesData.filter(c => c.GDP > 150);
  const lowDisparity = citiesData.filter(c => c.economicDisparity < 27);

  const topCities = highHDI
    .filter(c => highInternet.includes(c) && highGDP.includes(c))
    .map(c => c.name);

  const strongPatterns = [
    topCities.length > 0
      ? `Cities like ${topCities.slice(0, 3).join(", ")} consistently combine high HDI, strong internet access, and elevated GDP.`
      : `No single set of cities shows overlap between high HDI, internet, and GDP this year.`,

    lowDisparity.length > 0
      ? `${lowDisparity.length} cities show low economic disparity (< 27), many of which also rank well in internet penetration.`
      : `Economic disparity remains elevated across all major cities.`,

    highHDI.length > 5
      ? `HDI scores > 0.8 are becoming more common. In ${highHDI.length} cities this year, human development is edging toward advanced territory.`
      : `Fewer than 6 cities reported HDI above 0.8 in ${year}. There’s room for inclusive growth.`,

    highGDP.length > 5
      ? `${highGDP.length} cities now exceed $150B GDP, showing solid economic scale.`
      : `GDP distribution is heavily skewed. Few cities cross the $150B mark.`,

    `In ${year}, internet penetration remained above 75% in ${highInternet.length} cities—signaling strong digital infrastructure in metros.`
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-3">🧠 Smart Narrative Insights</h2>
      {strongPatterns.map((point, index) => (
        <p key={index} className="text-gray-700 mb-2">• {point}</p>
      ))}
    </div>
  );
};

export default SmartNarrative;
