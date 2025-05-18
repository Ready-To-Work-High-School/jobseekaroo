
import React, { useState, useEffect } from 'react';
import { Sparkles, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { SparkleGroup } from '../animations/Sparkle';
import FreeForStudentsBadge from '@/components/badges/FreeForStudentsBadge';
import StatsOverview from './hero/StatsOverview';
import ThreeSteps from './hero/ThreeSteps';
import HeroCTA from './hero/HeroCTA';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  const benefits = [
    { icon: <Shield className="h-4 w-4" />, text: "Safe & Secure" },
    { icon: <Award className="h-4 w-4" />, text: "Earn Badges" }
  ];

  return (
    <section className="summer-hero-gradient py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern & decorative elements */}
      <motion.div 
        className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] -z-10"
        animate={{
          opacity: [0.02, 0.05, 0.02],
          scale: [1, 1.02, 1],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror"
          }
        }}
      />
      
      <motion.div 
        className="absolute top-20 -right-16 w-48 h-48 bg-purple-200 rounded-full opacity-20 blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
          transition: { duration: 7, repeat: Infinity, repeatType: "mirror" }
        }}
      />
      
      <SparkleGroup count={5} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Free badge */}
          <motion.div 
            className="mb-6 flex justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <FreeForStudentsBadge variant="large" />
          </motion.div>
          
          {/* Main headline */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="relative">
              Hire Jacksonville's Certified High School Talent
              <motion.span 
                className="absolute -right-6 -top-6 hidden md:block"
                animate={{
                  y: [0, -10, 0],
                  transition: { duration: 4, repeat: Infinity }
                }}
              >
                <Sparkles className="h-6 w-6 text-amber-400" />
              </motion.span>
            </span>
          </motion.h1>
          
          {/* Stats Overview */}
          <StatsOverview />
          
          {/* Academy information */}
          <motion.div 
            className="my-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Badge variant="outline" className="border-white px-3 py-1 text-white font-medium relative">
                Exclusive to Westside High School Students in Entrepreneurship or Nursing Academy
                <motion.span 
                  className="absolute -top-2 -right-2"
                  animate={{
                    y: [0, -10, 0],
                    transition: { duration: 4, repeat: Infinity }
                  }}
                >
                  <Sparkles className="h-4 w-4 text-white" />
                </motion.span>
              </Badge>
            </motion.div>
          </motion.div>
          
          {/* Main description */}
          <motion.p 
            className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Indeed/ZipRecruiter are free, but we differentiate with verified, local teens and direct access
          </motion.p>
          
          {/* Three Steps Section */}
          <ThreeSteps />
          
          {/* CTA Buttons */}
          <HeroCTA />
          
          {/* Benefits badges */}
          <motion.div 
            className="flex justify-center flex-wrap gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
