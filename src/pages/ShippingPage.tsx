
import React from 'react';
import { motion } from 'framer-motion';
import ShippingReturns from '../components/ShippingReturns';

const ShippingPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <ShippingReturns />
    </motion.div>
  );
};

export default ShippingPage;
