
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
      Join Baptist Health's prestigious Scholar Program designed for Westside High School students interested in healthcare careers. Receive mentorship, hands-on experience, and scholarship opportunities with one of Jacksonville's premier healthcare providers.
    </motion.p>
  );
};

export default ProgramDescription;
