
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Clock, Award, Calendar, MapPin, Sparkles } from 'lucide-react';

const BaptistHealthFeature = () => {
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
      className="relative my-12 mx-4 md:mx-auto max-w-5xl bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl overflow-hidden shadow-lg border border-blue-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Program label */}
      <div className="healthcare-program-label">Healthcare Program</div>
      
      {/* Urgency badge */}
      <motion.div 
        className="absolute -top-2 -right-2 z-10"
        animate="pulse"
        variants={pulseVariants}
      >
        <div className="relative">
          <Award className="h-16 w-16 text-blue-500 drop-shadow-md" />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
            APPLY<br/>NOW
          </span>
        </div>
      </motion.div>
      
      {/* Background stars */}
      {[...Array(5)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute text-blue-300"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${Math.random() * 90}%`,
            opacity: 0.4,
            zIndex: 0
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          <Star className="h-6 w-6" />
        </motion.div>
      ))}
      
      <div className="flex flex-col md:flex-row items-center p-6 z-10 relative">
        <motion.div
          className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0 md:mr-6"
          variants={itemVariants}
        >
          <div className="relative">
            {/* Glow effect behind the logo */}
            <motion.div 
              className="absolute inset-0 bg-blue-200/50 blur-xl rounded-lg"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            ></motion.div>
            
            <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 relative z-10">
              {/* Baptist Health Logo */}
              <img 
                src="/lovable-uploads/ffe236ca-51e1-4cd8-a3ff-c40be0234760.png" 
                alt="Baptist Health Logo" 
                className="w-full h-auto" 
              />
            </div>
          </div>
        </motion.div>
        
        <div className="md:w-2/3 lg:w-3/4 space-y-4">
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <div className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                SCHOLARSHIP AVAILABLE
              </div>
              <div className="flex items-center text-blue-600 text-sm">
                <Clock className="h-3.5 w-3.5 mr-1" />
                Applications closing soon
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Baptist Health Scholar Program
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-gray-700"
            variants={itemVariants}
          >
            Join Baptist Health's prestigious Scholar Program designed for Westside High School students interested in healthcare careers. Receive mentorship, hands-on experience, and scholarship opportunities with one of Jacksonville's premier healthcare providers.
          </motion.p>
          
          {/* Program details with icons */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-blue-100 space-y-2 my-3"
            variants={itemVariants}
          >
            <div className="flex items-center text-sm text-gray-700">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              <span>September 1 - May 30, 2025-2026</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <MapPin className="h-4 w-4 mr-2 text-blue-600" />
              <span>Baptist Medical Center Jacksonville</span>
            </div>
          </motion.div>
          
          <motion.div
            className="flex flex-wrap gap-3 pt-2"
            variants={itemVariants}
          >
            <div className="flex items-center text-sm bg-green-50 px-3 py-1 rounded-full text-green-700">
              <span className="font-medium">$5,000 Scholarship</span>
            </div>
            <div className="flex items-center text-sm bg-blue-50 px-3 py-1 rounded-full text-blue-700">
              <span className="font-medium">Clinical Rotations</span>
            </div>
            <div className="flex items-center text-sm bg-purple-50 px-3 py-1 rounded-full text-purple-700">
              <span className="font-medium">Career Mentorship</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="pt-4"
            variants={itemVariants}
          >
            {/* Button with animated glow effect */}
            <div className="relative inline-block">
              <motion.div 
                className="absolute inset-0 rounded-full bg-blue-400/30 blur-md"
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              
              <Button 
                asChild
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all relative z-10"
                size="lg"
              >
                <Link to="/programs/healthcare-pathways#baptist" className="flex items-center gap-2">
                  Learn More
                  <Sparkles className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              *Priority given to Westside High School Health Academy students
            </p>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .healthcare-program-label {
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(90deg, #2563eb, #1e40af);
          color: white;
          font-weight: 600;
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-bottom-right-radius: 0.5rem;
          z-index: 10;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
};

export default BaptistHealthFeature;
