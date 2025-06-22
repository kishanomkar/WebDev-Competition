import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Insights from "./pages/Insights";
import TimeSeries from "./components/TimeSeries";
import MultiCityComparison from "./components/MultiCityComparison";
import RankingSystem from "./components/RankingSystem";
import CorrelationMatrix from "./components/CorrelationMatrix";
import TrendAnalysis from "./components/TrendAnalysis";
import MapView from "./components/MapView";
import SmartNarrative from "./components/SmartNarrative";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/timeseries" element={<TimeSeries />} />
        <Route path="/multi-city-comparison" element={<MultiCityComparison />} />
        <Route path="/ranking-system" element={<RankingSystem />} />
        <Route path="/correlation-matrix" element={<CorrelationMatrix />} />
        <Route path="/trend-analysis" element={<TrendAnalysis />} />
        <Route path="/map-view" element={<MapView />} />
        <Route path="/smart-narrative" element={<SmartNarrative />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
