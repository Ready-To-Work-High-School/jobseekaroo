
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const QuickAccessButtons = () => {
  return (
    <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-center gap-4">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button className="bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
          <Link to="/entrepreneurship-academy">
            <Award className="h-5 w-5" />
            Explore Our Program
          </Link>
        </Button>
      </motion.div>
      
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
          <Link to="/first-job-toolkit">
            <Compass className="h-5 w-5" />
            First Job Toolkit
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default QuickAccessButtons;
