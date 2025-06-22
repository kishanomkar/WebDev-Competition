
# 🏙️ Urban Development Analytics Dashboard

![React](https://img.shields.io/badge/Made%20with-React-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
[![Deployed on Vercel]([https://vercel.com/button)](https://vercel.com/new](https://urbandevelopmentanalyticsdashboard.vercel.app/))

A full-stack, map-enabled, interactive data visualization platform for analyzing city-wise urban development insights across India 🇮🇳 — built in **React**.

---

## 🚀 Live Demo

🔗 [https://your-urban-dashboard.vercel.app]((https://urbandevelopmentanalyticsdashboard.vercel.app/))

---

## 📊 Key Metrics Visualized

- **GDP** (in billion USD)  
- **HDI** (Human Development Index)  
- **Internet Penetration (%)**  
- **Economic Disparity Index**  
- **Population**

---

## 💡 Modules Overview

### 🔹 Correlation Matrix & Trend Analysis
- Heatmap matrix for correlation among metrics
- Animated line charts for metric evolution (2021–2023)
- Sortable, color-coded, and filterable interface

### 🔹 Interactive Map View
- Built with `React-Leaflet`
- Circle markers for cities, sized by population or metric
- Hover popups show sparkline trends
- Filters for year, metric type, and value range
- Export map view to PNG
- Animated year slider

### 🔹 AI-Powered Narrative Generator
- Natural-language summaries
- Highlights:
  - Top-performing cities
  - Key correlations
  - Noteworthy patterns
- Reactively updates with filters and year selection

### 🔹 PDF Exporter
- One-click download of:
  - Narrative insight
  - Map snapshot
  - Trend chart
- Generates a clean `city-report.pdf` using:
  - `jspdf`
  - `html2canvas`
  - `jspdf-autotable`

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── CorrelationMatrix.jsx
│   ├── MapView.jsx
│   ├── SmartNarrative.jsx
│   └── TrendChart.jsx
│
├── data/
│   └── citiesData.js
│
├── utils/
│   └── generatePdfReport.js
│
├── pages/
│   └── ReportPreview.jsx
```

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/urban-development-dashboard

# Install dependencies
npm install

# Run the project
npm start
```

---

## 🧠 Technologies Used

- **React JS**
- **Chart.js** & `react-chartjs-2`
- **React-Leaflet**
- **Tailwind CSS** (optional)
- **jsPDF**, **html2canvas**, **autotable**

---

## ✨ Credits

Designed and developed by **[Kishan Omkar](https://www.linkedin.com/in/kishan-omkar-022226314/)**  
> A fusion of UI design, frontend engineering, geospatial visualization, and AI-powered analytics.

---

## 📌 Future Enhancements

- User login and saved reports
- Extended datasets (rural, district-level)
- Real-time alerts and forecasting
- ML-powered predictive analysis

---

## 📝 License

This project is open-source under the [MIT License](LICENSE).
