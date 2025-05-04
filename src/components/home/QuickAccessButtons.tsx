
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, Compass, Briefcase, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const QuickAccessButtons = () => {
  return (
    <div className="container mx-auto px-4 py-4 overflow-hidden">
      <div className="flex flex-nowrap overflow-x-auto hide-scrollbar pb-2 gap-4 -mx-2 px-2 horizontal-scroll-container">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-none"
        >
          <Button className="bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap" asChild>
            <Link to="/skill-development">
              <Award className="h-5 w-5" />
              Explore Our Program
            </Link>
          </Button>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-none"
        >
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap" asChild>
            <Link to="/resources">
              <Compass className="h-5 w-5" />
              First Job Toolkit
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-none"
        >
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap" asChild>
            <Link to="/jobs">
              <Briefcase className="h-5 w-5" />
              Find Jobs
            </Link>
          </Button>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-none"
        >
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap" asChild>
            <Link to="/resources">
              <FileText className="h-5 w-5" />
              Resume Assistant
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default QuickAccessButtons;
