import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Award, Users, Star, Briefcase, GraduationCap } from 'lucide-react';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import { SparkleGroup } from '../animations/Sparkle';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import FreeForStudentsBadge from '@/components/badges/FreeForStudentsBadge';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation for the floating elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: { 
      duration: 4, 
      repeat: Infinity, 
      repeatType: "mirror" as const,
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
      repeatType: "mirror" as const,
    }
  };

  // Array of benefits with staggered animations
  const benefits = [
    { icon: <Shield className="h-5 w-5" />, text: "Safe & Secure" },
    { icon: <Award className="h-5 w-5" />, text: "Earn Badges" }
  ];

  return (
    <section className="summer-hero-gradient py-16 md:py-24 relative overflow-hidden">
      {/* Enhanced background pattern with subtle animation */}
      <motion.div 
        className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] -z-10"
        animate={patternAnimation}
      />
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 -right-16 w-48 h-48 bg-purple-200 rounded-full opacity-20 blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
          transition: { duration: 7, repeat: Infinity, repeatType: "mirror" as const }
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-100 rounded-full opacity-20 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.25, 0.2],
          transition: { duration: 9, repeat: Infinity, repeatType: "mirror" as const }
        }}
      ></motion.div>
      
      {/* Enhanced sparkle effect */}
      <SparkleGroup count={5} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Prominent Free for Students Badge */}
          <motion.div 
            className={`mb-6 flex justify-center hero-animation-element ${isVisible ? 'hero-animation-fade-in' : ''}`}
            style={{ animationDelay: "0.1s" }}
          >
            <FreeForStudentsBadge variant="large" />
          </motion.div>
          
          {/* Main headline with animation - UPDATED HEADLINE */}
          <motion.h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 hero-animation-element ${isVisible ? 'hero-animation-slide-in' : ''}`}
            style={{ animationDelay: "0.3s" }}
          >
            <span className="relative">
              Hire Certified High School Talent in Jacksonville.
              <motion.span 
                className="absolute -right-6 -top-6 hidden md:block"
                animate={floatingAnimation}
              >
                <Sparkles className="h-6 w-6 text-amber-400" />
              </motion.span>
            </span>
          </motion.h1>
          
          {/* Stats Teaser - NEW */}
          <motion.div
            className={`bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg py-4 px-6 mb-8 inline-block hero-animation-element ${isVisible ? 'hero-animation-fade-in' : ''}`}
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-white" />
              <span className="text-lg font-semibold text-white">50+ Certified Students Ready to Work</span>
            </div>
          </motion.div>
          
          {/* Academy information badge */}
          <motion.div 
            className={`my-6 flex justify-center hero-animation-element ${isVisible ? 'hero-animation-fade-in' : ''}`}
            style={{ animationDelay: "0.7s" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge variant="outline" className="border-white px-3 py-1 text-white font-medium relative">
                Exclusive to Westside High School Students in Entrepreneurship or Nursing Academy
                <motion.span 
                  className="absolute -top-2 -right-2"
                  animate={floatingAnimation}
                >
                  <Sparkles className="h-4 w-4 text-white" />
                </motion.span>
              </Badge>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className={`text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto hero-animation-element ${isVisible ? 'hero-animation-slide-in' : ''}`}
            style={{ animationDelay: "0.9s" }}
          >
            A safe, mobile-first platform connecting certified high school students with local businesses
          </motion.p>
          
          {/* NEW: Find your dream job in 3 easy steps */}
          <motion.div
            className={`mb-8 hero-animation-element ${isVisible ? 'hero-animation-fade-in' : ''}`}
            style={{ animationDelay: "1.0s" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Find Your Dream Job in 3 Easy Steps
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">1</div>
                <h3 className="font-medium text-white">Create Profile</h3>
                <p className="text-sm text-white/80">Sign up and showcase your skills</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">2</div>
                <h3 className="font-medium text-white">Browse Jobs</h3>
                <p className="text-sm text-white/80">Explore certified opportunities</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">3</div>
                <h3 className="font-medium text-white">Get Hired</h3>
                <p className="text-sm text-white/80">Apply and launch your career</p>
              </div>
            </div>
          </motion.div>
          
          {/* CTA Buttons with enhanced animations - UPDATED */}
          <motion.div 
            className={`flex flex-col sm:flex-row gap-4 justify-center hero-animation-element ${isVisible ? 'hero-animation-fade-in' : ''}`}
            style={{ animationDelay: "1.1s" }}
          >
            {/* Browse Candidates button (for companies) */}
            <Link to="/for-employers">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Button glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-md bg-white/30 blur-md"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" as const }}
                ></motion.div>
                
                <Button size="lg" className="gap-2 bg-white text-[#ff2e63] hover:bg-white/90 shadow-md hover:shadow-lg transition-all duration-300 group relative">
                  <Briefcase className="h-4 w-4" />
                  Browse Candidates
                  <motion.span 
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={floatingAnimation}
                  >
                    <Sparkles className="h-5 w-5 text-amber-300" />
                  </motion.span>
                </Button>
              </motion.div>
            </Link>
            
            {/* Begin Now button (for students) - UPDATED TO PURPLE */}
            <Link to="/sign-up">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Button glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 opacity-70 blur-md"
                  animate={{ 
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" as const }}
                ></motion.div>
                
                <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white hover:brightness-110 shadow-md hover:shadow-lg transition-all duration-300 group relative">
                  <GraduationCap className="h-4 w-4" />
                  Begin Now
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Animated benefits badges */}
          <motion.div 
            className={`flex justify-center flex-wrap gap-3 mt-8 hero-animation-element ${isVisible ? 'hero-animation-slide-in' : ''}`}
            style={{ animationDelay: "1.3s" }}
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="flex items-center bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/25 shadow-sm"
              >
                <span className="text-amber-300 mr-1.5">{benefit.icon}</span>
                <span className="text-sm font-medium text-white">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* New image from the upload */}
          <motion.div 
            className={`mt-12 hero-animation-element ${isVisible ? 'hero-animation-fade-in' : ''}`}
            style={{ animationDelay: "1.5s" }}
          >
            <img 
              src="/lovable-uploads/836039bf-fe12-4e65-8785-83207fef23f0.png" 
              alt="Students working together" 
              className="rounded-xl shadow-lg max-w-full md:max-w-xl mx-auto" 
              width="600"
              height="400"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
