
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, Clock, Award, Calendar, MapPin, ExternalLink } from 'lucide-react';

const MacquarieExternshipFeature = () => {
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
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <motion.div 
      className="relative my-12 mx-4 md:mx-auto max-w-5xl bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-xl overflow-hidden shadow-lg border border-green-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Program label */}
      <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
        Finance Externship
      </div>
      
      {/* Urgency badge */}
      <motion.div 
        className="absolute -top-2 -right-20 md:-right-2 z-10"
        animate="pulse"
        variants={pulseVariants}
      >
        <div className="relative">
          <Award className="h-16 w-16 text-green-500 drop-shadow-md" />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
            APPLY<br/>NOW
          </span>
        </div>
      </motion.div>
      
      <div className="flex flex-col md:flex-row items-center p-6 z-10 relative">
        <motion.div
          className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0 md:mr-6"
          variants={itemVariants}
        >
          <div className="relative">
            {/* Glow effect behind the logo */}
            <motion.div 
              className="absolute inset-0 bg-green-200/50 blur-xl rounded-lg"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            ></motion.div>
            
            <img 
              src="/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.png" 
              alt="Macquarie Group Logo" 
              className="rounded-lg shadow-md w-full h-auto relative z-10 bg-white p-2"
            />
          </div>
        </motion.div>
        
        <div className="md:w-2/3 lg:w-3/4 space-y-4">
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <div className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                COMPETITIVE
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <Clock className="h-3.5 w-3.5 mr-1" />
                Applications close soon
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Macquarie Leads Externship Program
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-gray-700"
            variants={itemVariants}
          >
            Premium opportunity for Westside High School Entrepreneurship Academy students to gain hands-on experience in finance and investment banking. Observe industry professionals in action and build valuable connections at Macquarie Group.
          </motion.p>
          
          {/* Program details with icons */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-green-100 space-y-2 my-3"
            variants={itemVariants}
          >
            <div className="flex items-center text-sm text-gray-700">
              <Calendar className="h-4 w-4 mr-2 text-green-600" />
              <span>July 15 - July 30, 2025</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <MapPin className="h-4 w-4 mr-2 text-green-600" />
              <span>Macquarie Group, Jacksonville Financial District</span>
            </div>
          </motion.div>
          
          <motion.div
            className="flex flex-wrap gap-3 pt-2"
            variants={itemVariants}
          >
            <div className="flex items-center text-sm bg-blue-50 px-3 py-1 rounded-full text-blue-700">
              <span className="font-medium">Job Shadowing</span>
            </div>
            <div className="flex items-center text-sm bg-purple-50 px-3 py-1 rounded-full text-purple-700">
              <span className="font-medium">Networking</span>
            </div>
            <div className="flex items-center text-sm bg-amber-50 px-3 py-1 rounded-full text-amber-700">
              <span className="font-medium">Finance Experience</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="pt-4"
            variants={itemVariants}
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
        </div>
      </div>
    </motion.div>
  );
};

export default MacquarieExternshipFeature;
