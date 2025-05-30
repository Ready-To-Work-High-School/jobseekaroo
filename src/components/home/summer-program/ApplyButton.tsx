
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ApplyButton = () => {
  return (
    <motion.div 
      className="pt-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Button with animated glow effect */}
      <div className="relative inline-block">
        <motion.div 
          className="absolute inset-0 rounded-full bg-amber-400/30 blur-md"
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        ></motion.div>
        
        <Button 
          asChild
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all relative z-10"
          size="lg"
        >
          <Link to="/jobs/mayo-summer-program" className="flex items-center gap-2">
            Apply Now
            <Sparkles className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        *Only for Westside High School Nursing Academy students
      </p>
    </motion.div>
  );
};

export default ApplyButton;
