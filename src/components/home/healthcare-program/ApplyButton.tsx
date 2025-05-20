
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApplyButton = () => {
  return (
    <motion.div 
      className="mt-4"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8 }}
      whileHover={{ scale: 1.02 }}
    >
      <Button 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2"
        asChild
      >
        <Link to="/programs/baptist-health">
          Apply Now <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
      <p className="text-xs text-gray-500 mt-2">Limited spots available. Application deadline: May 15, 2025</p>
    </motion.div>
  );
};

export default ApplyButton;
