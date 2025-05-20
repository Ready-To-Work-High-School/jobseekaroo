
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

const ProgramDetails = () => {
  return (
    <motion.div 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex flex-wrap gap-4 text-sm text-gray-700"
    >
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4 text-blue-500" />
        <span>June - August 2025</span>
      </div>
      
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4 text-blue-500" />
        <span>20-25 hours/week</span>
      </div>
      
      <div className="flex items-center gap-1">
        <MapPin className="h-4 w-4 text-blue-500" />
        <span>Jacksonville, FL</span>
      </div>
    </motion.div>
  );
};

export default ProgramDetails;
