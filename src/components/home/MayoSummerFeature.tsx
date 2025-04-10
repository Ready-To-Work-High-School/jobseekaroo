
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Clock, Award } from 'lucide-react';

const MayoSummerFeature = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
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
      className="relative my-12 mx-4 md:mx-auto max-w-5xl bg-gradient-to-r from-amber-50 via-white to-blue-50 rounded-xl overflow-hidden shadow-lg border border-amber-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Urgency badge */}
      <motion.div 
        className="absolute -top-2 -right-2 z-10"
        animate="pulse"
        variants={pulseVariants}
      >
        <div className="relative">
          <Award className="h-16 w-16 text-amber-500 drop-shadow-md" />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
            APPLY<br/>NOW
          </span>
        </div>
      </motion.div>
      
      {/* Background stars */}
      {[...Array(5)].map((_, i) => (
        <motion.div 
          key={i}
          className="absolute text-amber-300"
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
          className="md:w-1/2 lg:w-2/5 mb-6 md:mb-0 md:mr-6"
          variants={itemVariants}
        >
          <img 
            src="/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png" 
            alt="Mayo Clinic Summer Program" 
            className="rounded-lg shadow-md w-full h-auto"
          />
        </motion.div>
        
        <div className="md:w-1/2 lg:w-3/5 space-y-4">
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                LIMITED SPOTS
              </div>
              <div className="flex items-center text-amber-600 text-sm">
                <Clock className="h-3.5 w-3.5 mr-1" />
                Deadline approaching
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
              Mayo Clinic Summer Program
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-gray-700"
            variants={itemVariants}
          >
            Exclusive opportunity for Westside High School students to gain hands-on experience in healthcare at the prestigious Mayo Clinic. Perfect for students in the Nursing Academy pathway. Limited spots available!
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-3 pt-2"
            variants={itemVariants}
          >
            <div className="flex items-center text-sm bg-blue-50 px-3 py-1 rounded-full text-blue-700">
              <span className="font-medium">Paid Internship</span>
            </div>
            <div className="flex items-center text-sm bg-green-50 px-3 py-1 rounded-full text-green-700">
              <span className="font-medium">College Credit</span>
            </div>
            <div className="flex items-center text-sm bg-purple-50 px-3 py-1 rounded-full text-purple-700">
              <span className="font-medium">Hands-on Training</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="pt-4"
            variants={itemVariants}
          >
            <Button 
              asChild
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <Link to="/jobs/mayo-summer-program">
                Apply Now
              </Link>
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              *Only for Westside High School Nursing Academy students
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MayoSummerFeature;
