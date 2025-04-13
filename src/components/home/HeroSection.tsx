
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Award, Users, Star, Check } from 'lucide-react';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import { SparkleGroup } from '../animations/Sparkle';
import LazyImage from '@/components/LazyImage';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import FreeForStudentsBadge from '@/components/badges/FreeForStudentsBadge';

const HeroSection = () => {
  const logoAnimation = useFadeIn(100);
  const titleAnimation = useSlideIn(300, 'right');
  const subtitleAnimation = useFadeIn(500);
  const buttonAnimation = useFadeIn(700);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation for the floating elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: { 
      duration: 4, 
      repeat: Infinity, 
      repeatType: "mirror",
      ease: "easeInOut"
    }
  };
  
  // Background pattern animation
  const patternAnimation = {
    opacity: [0.02, 0.05, 0.02],
    scale: [1, 1.02, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror"
    }
  };

  // Array of benefits with staggered animations
  const benefits = [
    { icon: <Shield className="h-5 w-5" />, text: "Safe & Secure" },
    { icon: <Check className="h-5 w-5" />, text: "School Verified" },
    { icon: <Award className="h-5 w-5" />, text: "Earn Badges" }
  ];

  return (
    <section className="bg-gradient-to-b from-white via-blue-50 to-white py-16 md:py-24 relative overflow-hidden">
      {/* Enhanced background pattern with subtle animation */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10"
        animate={patternAnimation}
      />
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 -right-16 w-48 h-48 bg-blue-100 rounded-full opacity-20 blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "mirror" }}
      ></motion.div>
      
      <motion.div 
        className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-100 rounded-full opacity-20 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.25, 0.2]
        }}
        transition={{ duration: 9, repeat: Infinity, repeatType: "mirror" }}
      ></motion.div>
      
      {/* Enhanced sparkle effect */}
      <SparkleGroup count={7} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Prominent Free for Students Badge */}
          <motion.div 
            className="mb-6 flex justify-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FreeForStudentsBadge variant="large" />
          </motion.div>
          
          {/* Main headline with animation */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500 relative">
              Your First Job, Made Simple.
              <motion.span 
                className="absolute -right-6 -top-6 hidden md:block"
                animate={floatingAnimation}
              >
                <Sparkles className="h-6 w-6 text-amber-400" />
              </motion.span>
            </span>
          </motion.h1>
          
          {/* Animated benefits badges */}
          <div className="flex justify-center flex-wrap gap-3 mb-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.2) }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 shadow-sm"
              >
                <span className="text-amber-500 mr-1.5">{benefit.icon}</span>
                <span className="text-sm font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="my-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge variant="outline" className="border-amber-500 px-3 py-1 text-amber-700 font-medium relative">
                Exclusive to Westside High School Students in Entrepreneurship or Nursing Academy
                <motion.span 
                  className="absolute -top-2 -right-2"
                  animate={floatingAnimation}
                >
                  <Sparkles className="h-4 w-4 text-amber-500" />
                </motion.span>
              </Badge>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            A fun, safe, mobile-first app to help high school students find their perfect first job, 
            with badges, guidance, and a simple application process
          </motion.p>
          
          {/* Sign up reminder with enhanced styling */}
          <motion.div 
            className="mb-10 max-w-md mx-auto bg-blue-50 p-4 rounded-lg border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-md font-medium text-blue-700 flex items-center justify-center">
              <Star className="h-4 w-4 mr-2 text-amber-500" />
              Easy sign up with just an email – 100% Free for Westside High School students!
            </p>
          </motion.div>
          
          {/* Enhanced feature cards with motion */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 mb-12">
            {/* Card 1 */}
            <motion.div 
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md hover:border-blue-200 transition-all duration-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Safe & Simple</h3>
              <p className="text-sm text-gray-600 text-center">Find jobs that fit your schedule, skills, and location</p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md hover:border-amber-200 transition-all duration-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Earn Badges</h3>
              <p className="text-sm text-gray-600 text-center">Build your profile with skill badges that impress employers</p>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div 
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md hover:border-green-200 transition-all duration-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-medium text-lg mb-2">Guidance & Support</h3>
              <p className="text-sm text-gray-600 text-center">Get help with interviews, resumes, and job skills</p>
            </motion.div>
          </div>
          
          {/* CTA Buttons with enhanced animations */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <Link to="/jobs">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Button glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-md bg-blue-400/30 blur-md"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                
                <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300 group relative">
                  Find Your First Job 
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <motion.span 
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={floatingAnimation}
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
              >
                <Button size="lg" variant="outline" className="border-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2 group">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span className="relative">
                    Sign Up Free
                    <motion.span
                      className="absolute inset-x-0 -bottom-1 h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 origin-left"
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
