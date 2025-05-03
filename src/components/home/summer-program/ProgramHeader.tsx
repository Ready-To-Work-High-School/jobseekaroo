
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const ProgramHeader = () => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <div className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
          LIMITED SPOTS
        </div>
        <div className="flex items-center text-amber-600 text-sm">
          <Clock className="h-3.5 w-3.5 mr-1" />
          Deadline approaching
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
        Mayo Clinic Summer Program
      </h2>
    </motion.div>
  );
};

export default ProgramHeader;
