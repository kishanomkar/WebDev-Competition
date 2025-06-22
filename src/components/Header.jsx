import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-center gap-6">
      <Link to="/" className="hover:underline">Dashboard</Link>
      <Link to="/insights" className="hover:underline">Insights</Link>
      <Link to="/timeseries" className="hover:underline">
        📊 Time-Series Analysis
      </Link>
      <Link to="/multi-city-comparison" className="hover:text-blue-600">
    🏙️ Multi-City Comparison
  </Link>
  <Link to="/ranking-system" className="hover:text-blue-600">
    🏆 Ranking System
  </Link>
  <Link to="/correlation-matrix" className="hover:text-blue-600">
    🔗 Correlation Matrix
  </Link>
  <Link to="/trend-analysis" className="hover:text-blue-600">
    📈 Trend Analysis
  </Link>
  <Link to="/map-view">🗺️ Map View</Link>

</nav>
  );
};

export default Header;
