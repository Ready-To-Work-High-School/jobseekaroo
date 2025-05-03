
import React from 'react';
import { motion } from 'framer-motion';

const ProgramFeatures = () => {
  return (
    <motion.div
      className="flex flex-wrap gap-3 pt-2"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center text-sm bg-green-50 px-3 py-1 rounded-full text-green-700">
        <span className="font-medium">$5,000 Scholarship</span>
      </div>
      <div className="flex items-center text-sm bg-blue-50 px-3 py-1 rounded-full text-blue-700">
        <span className="font-medium">Clinical Rotations</span>
      </div>
      <div className="flex items-center text-sm bg-purple-50 px-3 py-1 rounded-full text-purple-700">
        <span className="font-medium">Career Mentorship</span>
      </div>
    </motion.div>
  );
};

export default ProgramFeatures;
