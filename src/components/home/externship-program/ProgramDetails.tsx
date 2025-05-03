
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const ProgramDetails = () => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-green-100 space-y-2 my-3"
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1, 
          transition: { type: "spring", stiffness: 100 }
        }
      }}
    >
      <div className="flex items-center text-sm text-gray-700">
        <Calendar className="h-4 w-4 mr-2 text-green-600" />
        <span>July 15 - July 30, 2025</span>
      </div>
      <div className="flex items-center text-sm text-gray-700">
        <MapPin className="h-4 w-4 mr-2 text-green-600" />
        <span>Macquarie Group, Jacksonville Financial District</span>
      </div>
    </motion.div>
  );
};

export default ProgramDetails;
