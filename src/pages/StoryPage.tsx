
import React from 'react';
import { motion } from 'framer-motion';
import StorySection from '../components/StorySection';

const StoryPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="w-full"
    >
      <StorySection fullView />
    </motion.div>
  );
};

export default StoryPage;
