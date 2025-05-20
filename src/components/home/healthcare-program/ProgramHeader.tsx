
import React from 'react';
import { motion } from 'framer-motion';

const ProgramHeader = () => {
  return (
    <motion.div 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800">Baptist Health Career Program</h2>
      <p className="text-blue-600 font-medium">Summer 2025 Healthcare Opportunities</p>
    </motion.div>
  );
};

export default ProgramHeader;
