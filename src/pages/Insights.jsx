import { motion } from "framer-motion";
import HDIChart from "../components/HDIChart";
import PopulationChart from "../components/PopulationChart";

const Insights = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="p-6 text-center"
    >
      {/* Title & Intro */}
      <h1 className="text-3xl font-bold text-green-600">Insights Page</h1>
      <p className="text-gray-600">Deep dive into India's development trends.</p>

      <div className="flex w-full h-screen">
        {/* HDI Chart */}
      <motion.div
        className="mt-6 w-[50%] h-[60%]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold">HDI Comparison</h2>
        <HDIChart />
      </motion.div>

      {/* Population Chart */}
      <motion.div
        className="mt-6 w-[50%]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold">Population Distribution</h2>
        <PopulationChart />
      </motion.div>
      </div>
    </motion.div>
  );
};

export default Insights;
