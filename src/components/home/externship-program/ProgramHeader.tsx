
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const ProgramHeader = () => {
  return (
    <motion.div 
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { type: "spring", stiffness: 100 }
        }
      }}
    >
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
          COMPETITIVE
        </div>
        <div className="flex items-center text-green-600 text-sm">
          <Clock className="h-3.5 w-3.5 mr-1" />
          Applications close soon
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Macquarie Leads Externship Program
      </h2>
    </motion.div>
  );
};

export default ProgramHeader;
