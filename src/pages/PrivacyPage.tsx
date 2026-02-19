
import React from 'react';
import { motion } from 'framer-motion';
import PrivacyPolicy from '../components/PrivacyPolicy';

const PrivacyPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <PrivacyPolicy />
    </motion.div>
  );
};

export default PrivacyPage;
