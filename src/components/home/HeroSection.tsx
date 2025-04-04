
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useFadeIn, useSlideIn } from '@/utils/animations';

const HeroSection = () => {
  const logoAnimation = useFadeIn(100);
  const titleAnimation = useSlideIn(300, 'right');
  const subtitleAnimation = useFadeIn(500);
  const buttonAnimation = useFadeIn(700);

  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      {/* Flying particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-400/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              animation: 'float-around infinite linear'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <div className={`flex justify-center mb-8 ${logoAnimation}`}>
          {/* Enhanced logo display with dynamic glow effect */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400 to-amber-400 opacity-30 blur-lg animate-pulse"></div>
            <img 
              src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
              alt="Job Seekers 4 High Schools Logo"
              className="h-28 w-auto relative z-10 drop-shadow-lg" 
            />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 text-gray-900 ${titleAnimation}`}>
            <div className="inline-block relative">
              <Sparkles className="h-6 w-6 text-amber-500 absolute -left-8 top-0 animate-bounce" />
              <span className="relative z-10">Find Your Perfect Job</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500">for High School Students</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 to-amber-100 opacity-50 rounded-lg transform rotate-1 blur-sm"></div>
            </div>
          </h1>
          
          <p className={`text-lg mb-8 text-gray-700 ${subtitleAnimation}`}>
            Connect with employers looking for motivated high school students. Start your career journey today!
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${buttonAnimation}`}>
            <Link to="/jobs">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-300">
                Browse Jobs <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/resources">
              <Button size="lg" variant="outline" className="border-2 shadow-sm hover:shadow-md transition-all duration-300">
                Student Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
