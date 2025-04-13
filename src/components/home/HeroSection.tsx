
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
  const logoAnimation = useFadeIn(100);
  const titleAnimation = useSlideIn(300, 'right');
  const subtitleAnimation = useFadeIn(500);
  const buttonAnimation = useFadeIn(700);
  
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
        className="absolute top-20 -right-16 w-48 h-48 bg-blue-100 rounded-full opacity-20 blur-2xl"
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
            
            {/* Join as a Student button */}
            <Link to="/sign-up">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 shadow-sm hover:shadow-md transition-all duration-300 gap-2 group">
                  <GraduationCap className="h-4 w-4 text-white" />
                  <span className="relative">
                    Join as a Student
                    <motion.span
                      className="absolute inset-x-0 -bottom-1 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 origin-left"
                      transition={{ duration: 0.3 }}
                    />
                  </span>
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
