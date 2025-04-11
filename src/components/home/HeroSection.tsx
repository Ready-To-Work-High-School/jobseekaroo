
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Award, Users, Star } from 'lucide-react';
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

  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 md:py-24 relative overflow-hidden">
      {/* Enhanced background pattern with subtle animation */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      {/* Enhanced sparkle effect */}
      <SparkleGroup count={7} />
      
      <div className="container mx-auto px-4">
        <div className={`flex justify-center mb-6 ${logoAnimation}`}>
          {/* Optimized logo display with proper sizing and animation */}
          <motion.div 
            className="relative w-24 h-24 md:w-28 md:h-28"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <LazyImage 
              src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
              webpSrc="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.webp" 
              avifSrc="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.avif" 
              alt="Job Seekers 4 High Schools Logo" 
              className="h-full w-full relative z-10 drop-shadow-lg object-contain" 
              width={112} 
              height={112} 
              priority={true} 
              sizes="(max-width: 640px) 96px, 112px" 
            />
          </motion.div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          {/* Prominent Free for Students Badge */}
          <div className="mb-6 flex justify-center">
            <FreeForStudentsBadge variant="large" />
          </div>
          
          {/* JS4HS Section - Above the main headline */}
          <div className="mb-6">
            <motion.h2 
              className="text-xl md:text-2xl font-semibold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Job Seekers 4 High Schools
            </motion.h2>
            <motion.p 
              className="text-muted-foreground mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Connecting students with credential-ready opportunities at Westside High School
            </motion.p>
          </div>
          
          <motion.h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 ${titleAnimation}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500 relative">
              Your First Job, Made Simple.
              <span className="absolute -right-6 -top-6 hidden md:block">
                <Sparkles className="h-6 w-6 text-amber-400 animate-bounce-subtle" />
              </span>
            </span>
          </motion.h1>
          
          <div className="my-6 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge variant="outline" className="border-amber-500 px-3 py-1 text-amber-700 font-medium relative">
                Exclusive to Westside High School Students in Entrepreneurship or Nursing Academy
                <span className="absolute -top-2 -right-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                </span>
              </Badge>
            </motion.div>
          </div>
          
          <motion.p 
            className={`text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto ${subtitleAnimation}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            A fun, safe, mobile-first app to help high school students find their perfect first job, 
            with badges, guidance, and a simple application process
          </motion.p>
          
          {/* Sign up reminder */}
          <motion.p 
            className="text-md mb-8 font-medium text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Easy sign up with just an email – 100% Free for Westside High School students!
          </motion.p>
          
          {/* Enhanced feature cards with motion */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 mb-12">
            <motion.div 
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md hover:border-blue-200 transition-all duration-200"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium mb-1">Safe & Simple</h3>
              <p className="text-sm text-gray-600 text-center">Find jobs that fit your schedule, skills, and location</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md hover:border-amber-200 transition-all duration-200"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Award className="h-8 w-8 text-amber-600 mb-2" />
              <h3 className="font-medium mb-1">Earn Badges</h3>
              <p className="text-sm text-gray-600 text-center">Build your profile with skill badges that impress employers</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md hover:border-green-200 transition-all duration-200"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium mb-1">Guidance & Support</h3>
              <p className="text-sm text-gray-600 text-center">Get help with interviews, resumes, and job skills</p>
            </motion.div>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${buttonAnimation}`}>
            <Link to="/jobs">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300 group relative">
                  Find Your First Job 
                  <ArrowRight className="h-4 w-4" />
                  <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="h-5 w-5 text-amber-300" />
                  </span>
                </Button>
              </motion.div>
            </Link>
            <Link to="/sign-up">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-2 shadow-sm hover:shadow-md transition-all duration-300 gap-2">
                  <Sparkles className="h-4 w-4" />
                  Sign Up Free
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
