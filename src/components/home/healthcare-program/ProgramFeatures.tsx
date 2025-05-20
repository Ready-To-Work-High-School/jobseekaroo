
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ProgramFeatures = () => {
  const features = [
    "Hands-on clinical shadowing experiences",
    "Professional development workshops",
    "Healthcare career exploration",
    "College application enhancement",
    "Potential for future employment"
  ];
  
  return (
    <motion.div 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <h3 className="font-semibold text-blue-800 mb-2">Program Highlights:</h3>
      <ul className="space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ProgramFeatures;
