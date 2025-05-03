
import React from 'react';
import { motion } from 'framer-motion';

const ProgramDescription = () => {
  return (
    <motion.p 
      className="text-gray-700"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      Exclusive opportunity for Westside High School students to gain hands-on experience in healthcare at the prestigious Mayo Clinic. Perfect for students in the Nursing Academy pathway. Limited spots available!
    </motion.p>
  );
};

export default ProgramDescription;
