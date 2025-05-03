
import React from 'react';
import { motion } from 'framer-motion';
import ExternshipProgramLabel from './externship-program/ExternshipProgramLabel';
import UrgencyBadge from './externship-program/UrgencyBadge';
import ProgramLogo from './externship-program/ProgramLogo';
import ProgramHeader from './externship-program/ProgramHeader';
import ProgramDescription from './externship-program/ProgramDescription';
import ProgramDetails from './externship-program/ProgramDetails';
import ProgramFeatures from './externship-program/ProgramFeatures';
import ApplyButton from './externship-program/ApplyButton';

const VystarFeature = () => {
  // Animation variants
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
  
  return (
    <motion.div 
      className="relative my-12 mx-4 md:mx-auto max-w-5xl bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl overflow-hidden shadow-lg border border-blue-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Program label */}
      <div className="vystar-program-label">
        VyStar Financial Internship
      </div>
      
      {/* Urgency badge */}
      <UrgencyBadge daysLeft={21} />
      
      <div className="flex flex-col md:flex-row items-center p-6 z-10 relative">
        {/* VyStar Logo */}
        <ProgramLogo 
          logoSrc="/lovable-uploads/d84f89c0-eba4-4ea0-a757-0f58a4e079ff.png" 
          alt="VyStar Credit Union Logo" 
          isCSX={false}
        />
        
        <div className="md:w-2/3 lg:w-3/4 space-y-4">
          {/* Program Header */}
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-blue-800">
              VyStar Credit Union Financial Services Internship
            </h2>
            <p className="text-sm md:text-base text-blue-600 font-medium">
              Develop professional skills with Jacksonville's leading credit union
            </p>
          </motion.div>
          
          {/* Program Description */}
          <motion.p 
            className="text-gray-700"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { 
                y: 0, 
                opacity: 1,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
          >
            Premium opportunity for Westside High School students to gain hands-on experience in banking, 
            financial services, and customer support. Learn from industry professionals and build valuable 
            connections at one of Jacksonville's top financial institutions.
          </motion.p>
          
          {/* Program Details */}
          <motion.div
            className="flex flex-wrap gap-3 md:gap-6"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { 
                y: 0, 
                opacity: 1,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
          >
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 mr-1">Duration:</span>
              <span>8 Weeks (Summer)</span>
            </div>
            
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 mr-1">Format:</span>
              <span>In-person, 15-20 hrs/week</span>
            </div>
            
            <div className="flex items-center text-sm">
              <span className="font-medium text-gray-700 mr-1">Compensation:</span>
              <span>$15/hour stipend</span>
            </div>
          </motion.div>
          
          {/* Program Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { 
                y: 0, 
                opacity: 1,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
          >
            <div className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm">✓</span>
              </div>
              <span className="text-sm">Customer service training</span>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm">✓</span>
              </div>
              <span className="text-sm">Financial literacy education</span>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm">✓</span>
              </div>
              <span className="text-sm">Banking operations exposure</span>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm">✓</span>
              </div>
              <span className="text-sm">Professional mentorship</span>
            </div>
          </motion.div>
          
          {/* Apply Button */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { delay: 0.3, duration: 0.5 }
              }
            }}
            className="pt-2"
          >
            <a 
              href="/programs/vystar-internship"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Apply Now
            </a>
            <span className="text-xs text-gray-500 block mt-1">Application deadline: June 15, 2025</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VystarFeature;
