
import React from 'react';
import { motion } from 'framer-motion';

const HealthcareProgramLabel = () => {
  return (
    <motion.div 
      className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-semibold px-3 py-1 z-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      Healthcare Program
    </motion.div>
  );
};

export default HealthcareProgramLabel;
