
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const ProgramDetails = () => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-blue-100 space-y-2 my-3"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center text-sm text-gray-700">
        <Calendar className="h-4 w-4 mr-2 text-blue-600" />
        <span>September 1 - May 30, 2025-2026</span>
      </div>
      <div className="flex items-center text-sm text-gray-700">
        <MapPin className="h-4 w-4 mr-2 text-blue-600" />
        <span>Baptist Medical Center Jacksonville</span>
      </div>
    </motion.div>
  );
};

export default ProgramDetails;
