
import React from 'react';
import { motion } from 'framer-motion';
import SpinningBitcoin from '@/components/animations/SpinningBitcoin';
import EnhancedSeparator from '@/components/shared/EnhancedSeparator';

const TopJobsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <EnhancedSeparator className="mb-8" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <SpinningBitcoin size={80} />
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top Jobs for Teenagers in Jacksonville, FL
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing opportunities designed specifically for high school students. 
            Start your career journey with trusted local employers.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Job cards would go here */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Retail Associate</h3>
            <p className="text-gray-600 mb-4">Part-time positions available at local stores</p>
            <div className="flex justify-between items-center">
              <span className="text-primary font-medium">$12-15/hour</span>
              <button className="btn-primary text-sm px-4 py-2">Apply Now</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Food Service</h3>
            <p className="text-gray-600 mb-4">Restaurant and fast food opportunities</p>
            <div className="flex justify-between items-center">
              <span className="text-primary font-medium">$11-14/hour</span>
              <button className="btn-primary text-sm px-4 py-2">Apply Now</button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Summer Internship</h3>
            <p className="text-gray-600 mb-4">Gain valuable work experience</p>
            <div className="flex justify-between items-center">
              <span className="text-primary font-medium">$13-16/hour</span>
              <button className="btn-primary text-sm px-4 py-2">Apply Now</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TopJobsSection;
