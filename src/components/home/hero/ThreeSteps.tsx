import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThreeSteps = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      className="mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Find Your Dream Job in 3 Easy Steps
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 horizontal-scroll hide-scrollbar pb-4">
        <Link to="/signup">
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 min-w-[260px]">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">1</div>
            <h3 className="font-medium text-white">Create Profile</h3>
            <p className="text-sm text-white/80">Sign up and showcase your skills</p>
          </motion.div>
        </Link>
        
        <Link to="/jobs">
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 min-w-[260px]">
            <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">2</div>
            <h3 className="font-medium text-white">Browse Jobs</h3>
            <p className="text-sm text-white/80">Explore certified opportunities</p>
          </motion.div>
        </Link>
        
        <Link to="/jobs">
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 min-w-[260px]">
            <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">3</div>
            <h3 className="font-medium text-white">Get Hired</h3>
            <p className="text-sm text-white/80">Apply and launch your career</p>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ThreeSteps;
