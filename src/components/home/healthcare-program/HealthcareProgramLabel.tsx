
import React from 'react';
import { motion } from 'framer-motion';

const HealthcareProgramLabel = () => {
  return (
    <motion.div 
      className="healthcare-program-label"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      Healthcare Program
    </motion.div>
  );
};

export default HealthcareProgramLabel;
