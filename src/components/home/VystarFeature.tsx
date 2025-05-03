
import React from 'react';
import { motion } from 'framer-motion';
import UrgencyBadge from './externship-program/UrgencyBadge';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const VystarFeature = () => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <motion.div 
      className="relative my-12 mx-4 md:mx-auto max-w-5xl bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl overflow-hidden shadow-lg border border-blue-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* VyStar program label */}
      <div className="vystar-program-label">
        <span>VyStar Internship Program</span>
        <img 
          src="/lovable-uploads/d84f89c0-eba4-4ea0-a757-0f58a4e079ff.png" 
          className="vystar-logo" 
          alt="VyStar Logo"
        />
      </div>
      
      {/* Urgency badge */}
      <UrgencyBadge daysLeft={45} />
      
      <div className="flex flex-col md:flex-row items-center p-6 z-10 relative">
        <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center mb-6 md:mb-0">
          <img 
            src="/lovable-uploads/d84f89c0-eba4-4ea0-a757-0f58a4e079ff.png"
            alt="VyStar Credit Union Logo" 
            className="w-48 h-auto object-contain md:mr-6"
          />
        </div>
        
        <div className="md:w-2/3 lg:w-3/4 space-y-4">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl md:text-2xl font-bold text-blue-900">VyStar Credit Union Internship Program</h3>
            <p className="text-sm text-blue-700">Financial Services Career Development</p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="text-sm md:text-base text-gray-700">
              Gain hands-on experience in financial services at one of Florida's largest credit unions. 
              VyStar's internship program offers rotations through multiple departments including member services, 
              lending, and financial education.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm font-medium">Duration: 8-10 weeks (Summer 2025)</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm font-medium">Location: Jacksonville, FL</span>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm font-medium">Paid Position: $15-17/hour</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm font-medium">Open to: Business & Finance Students</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-3">
              <div className="bg-white border border-blue-100 rounded p-2 text-xs text-center font-medium text-blue-800">Financial Literacy</div>
              <div className="bg-white border border-blue-100 rounded p-2 text-xs text-center font-medium text-blue-800">Customer Service</div>
              <div className="bg-white border border-blue-100 rounded p-2 text-xs text-center font-medium text-blue-800">Banking Operations</div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="pt-2">
            <Link 
              to="/programs/vystar-internship" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Learn More & Apply
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VystarFeature;
