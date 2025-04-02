
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
            alt="Job Seekers 4 High Schools Logo"
            className="h-24 w-auto" 
          />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            <span className="relative inline-block">
              <span className="relative z-10">Find Your Perfect Job for High School Students</span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400 to-amber-400 opacity-20 rounded-lg transform -rotate-1"></span>
            </span>
          </h1>
          <p className="text-lg mb-8 text-gray-700">
            Connect with employers looking for motivated high school students. Start your career journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/jobs">
              <Button size="lg" className="gap-2">
                Browse Jobs <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/resources">
              <Button size="lg" variant="outline">
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
