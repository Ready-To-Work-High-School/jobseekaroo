
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Award, Users } from 'lucide-react';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import { SparkleGroup } from '../animations/Sparkle';
import LazyImage from '../LazyImage';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  // Use shorter delays for initial animations
  const logoAnimation = useFadeIn(50);
  const titleAnimation = useFadeIn(100);
  const subtitleAnimation = useFadeIn(150);
  const buttonAnimation = useFadeIn(200);
  
  return <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-12 md:py-16 relative overflow-hidden">
      {/* Simplified background pattern for faster paint */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      {/* Reduce initial sparkles */}
      <SparkleGroup count={4} />
      
      <div className="container mx-auto px-4">
        <div className={`flex justify-center mb-6 ${logoAnimation}`}>
          {/* Enhanced logo display - use priority loading for logo */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400 to-amber-400 opacity-30 blur-lg"></div>
            <LazyImage 
              src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
              alt="Job Seekers 4 High Schools Logo" 
              className="h-28 w-auto relative z-10 drop-shadow-lg" 
              priority={true}
            />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-gray-900 ${titleAnimation}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500 relative">
              Your First Job, Made Simple.
              <span className="absolute -right-6 -top-6 hidden md:block">
                <Sparkles className="h-6 w-6 text-amber-400" />
              </span>
            </span>
          </h1>
          
          <div className="my-6 flex justify-center">
            <Badge variant="outline" className="border-amber-500 px-3 py-1 text-amber-700 font-medium relative">
              Exclusive to Westside High School Students
              <span className="absolute -top-2 -right-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
              </span>
            </Badge>
          </div>
          
          <p className={`text-lg mb-8 text-gray-700 ${subtitleAnimation}`}>
            A fun, safe, mobile-first app to land your first job, with badges and guidance that makes the process simple
          </p>
          
          {/* Defer non-critical feature cards - load asynchronously */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8 mb-8 content-visibility-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col items-center">
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium mb-1">Safe & Simple</h3>
              <p className="text-sm text-gray-600 text-center">
                Find jobs that fit your schedule, skills, and location - all pre-screened for safety
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col items-center">
              <Award className="h-8 w-8 text-amber-600 mb-2" />
              <h3 className="font-medium mb-1">Earn Badges</h3>
              <p className="text-sm text-gray-600 text-center">
                Build your profile with skill badges that impress employers and strengthen your resume
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-col items-center">
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium mb-1">Guidance & Support</h3>
              <p className="text-sm text-gray-600 text-center">
                Get help with interviews, resumes, and job skills from our resources and school partners
              </p>
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${buttonAnimation}`}>
            <Link to="/jobs">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-300 group relative">
                Find Your First Job 
                <ArrowRight className="h-4 w-4" />
                <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="h-5 w-5 text-amber-300" />
                </span>
              </Button>
            </Link>
            <Link to="/resources">
              <Button size="lg" variant="outline" className="border-2 shadow-sm transition-all duration-300">
                Student Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};

export default HeroSection;
