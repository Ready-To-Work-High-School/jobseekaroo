
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const ApplyButton = () => {
  return (
    <motion.div 
      className="pt-4"
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { type: "spring", stiffness: 100 }
        }
      }}
    >
      {/* Button with animated glow effect */}
      <div className="relative inline-block">
        <motion.div 
          className="absolute inset-0 rounded-full bg-green-400/30 blur-md"
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        ></motion.div>
        
        <Button 
          asChild
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all relative z-10"
          size="lg"
        >
          <Link to="/programs/macquarie-externship" className="flex items-center gap-2">
            Apply Now
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        *Only for Westside High School Entrepreneurship Academy students
      </p>
    </motion.div>
  );
};

export default ApplyButton;
