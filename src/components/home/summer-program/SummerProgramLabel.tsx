
import React from 'react';
import { motion } from 'framer-motion';

const SummerProgramLabel = () => {
  return (
    <motion.div 
      className="absolute -top-3 -left-2 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs px-3 py-1 rounded-full shadow-md transform -rotate-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      Summer Program
    </motion.div>
  );
};

export default SummerProgramLabel;
