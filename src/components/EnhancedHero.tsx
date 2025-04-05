
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import PartnerLogosSection from '@/components/home/PartnerLogosSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import { TrendingUp, Briefcase, GraduationCap } from 'lucide-react';

const EnhancedHero = () => {
  return (
    <div>
      <div className="bg-blue-50 py-4 px-4 text-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="flex items-center">
            <TrendingUp className="text-blue-600 h-5 w-5 mr-2" />
            <span className="text-sm font-medium">34% of high schoolers seek employment but struggle to find age-appropriate jobs</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="text-amber-600 h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Connecting businesses with motivated, pre-vetted students</span>
          </div>
          <div className="flex items-center">
            <GraduationCap className="text-green-600 h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Supporting career readiness skills & practical experience</span>
          </div>
        </div>
      </div>
      
      <HeroSection />
      <PartnerLogosSection />
      <CallToActionSection />
    </div>
  );
};

export default EnhancedHero;
