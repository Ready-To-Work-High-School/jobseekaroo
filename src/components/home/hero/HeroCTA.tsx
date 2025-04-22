
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroCTA = () => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
    >
      <Link to="/for-employers">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <motion.div 
            className="absolute inset-0 rounded-md bg-white/30 blur-md"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          />
          
          <Button size="lg" className="gap-2 bg-white text-[#ff2e63] hover:bg-white/90 shadow-md hover:shadow-lg transition-all duration-300 group relative">
            <Briefcase className="h-4 w-4" />
            Browse Candidates
            <motion.span 
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                y: [0, -10, 0],
                transition: { duration: 4, repeat: Infinity }
              }}
            >
              <Sparkles className="h-5 w-5 text-amber-300" />
            </motion.span>
          </Button>
        </motion.div>
      </Link>
      
      <Link to="/sign-up">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <motion.div 
            className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 opacity-70 blur-md"
            animate={{ 
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          />
          
          <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white hover:brightness-110 shadow-md hover:shadow-lg transition-all duration-300 group relative">
            <GraduationCap className="h-4 w-4" />
            Begin Now
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default HeroCTA;
