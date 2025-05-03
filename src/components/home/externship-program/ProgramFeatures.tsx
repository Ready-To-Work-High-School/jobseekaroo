
import React from 'react';
import { motion } from 'framer-motion';

const ProgramFeatures = () => {
  return (
    <motion.div
      className="flex flex-wrap gap-3 pt-2"
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { type: "spring", stiffness: 100 }
        }
      }}
    >
      <div className="flex items-center text-sm bg-blue-50 px-3 py-1 rounded-full text-blue-700">
        <span className="font-medium">Job Shadowing</span>
      </div>
      <div className="flex items-center text-sm bg-purple-50 px-3 py-1 rounded-full text-purple-700">
        <span className="font-medium">Networking</span>
      </div>
      <div className="flex items-center text-sm bg-amber-50 px-3 py-1 rounded-full text-amber-700">
        <span className="font-medium">Finance Experience</span>
      </div>
    </motion.div>
  );
};

export default ProgramFeatures;
