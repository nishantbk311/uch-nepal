
import React from 'react';
import { motion } from 'framer-motion';
import ColorChart from '../components/ColorChart';

const ColorChartPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <ColorChart />
    </motion.div>
  );
};

export default ColorChartPage;
