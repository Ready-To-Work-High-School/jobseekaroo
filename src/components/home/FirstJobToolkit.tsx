
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';
import { motion } from 'framer-motion';

const FirstJobToolkit = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl mb-8 relative overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] -z-10"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-indigo-700">First Job Toolkit</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-center mb-6 text-gray-700">
            Resources and tools to help you prepare for and succeed in your first job.
            Learn essential skills, prepare for interviews, and build your professional profile.
          </p>
          <div className="flex justify-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
                <Link to="/first-job-toolkit" className="flex items-center justify-center gap-2">
                  <Compass className="h-5 w-5" />
                  Explore Toolkit
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FirstJobToolkit;
