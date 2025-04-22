
import React from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsOverview = () => {
  return (
    <motion.div
      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg py-4 px-6 mb-8 inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-center gap-2">
        <Users className="h-5 w-5 text-white" />
        <span className="text-lg font-semibold text-white">50+ Certified Students Ready to Work</span>
      </div>
    </motion.div>
  );
};

export default StatsOverview;
