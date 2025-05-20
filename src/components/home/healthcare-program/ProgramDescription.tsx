
import React from 'react';
import { motion } from 'framer-motion';

const ProgramDescription = () => {
  return (
    <motion.div 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-gray-700"
    >
      <p>Join Baptist Health's exclusive summer program designed for high school students interested in healthcare careers. Gain hands-on experience, professional mentorship, and explore various medical specialties in a supportive learning environment.</p>
    </motion.div>
  );
};

export default ProgramDescription;
