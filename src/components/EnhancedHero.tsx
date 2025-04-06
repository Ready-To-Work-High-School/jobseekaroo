
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import PartnerLogosSection from '@/components/home/PartnerLogosSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import FeaturedJobsSection from '@/components/home/FeaturedJobsSection';
import JobPlacementsSection from '@/components/home/JobPlacementsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TopEmployersSection from '@/components/job/TopEmployersSection';
import SectionSeparator from '@/components/home/SectionSeparator';
import { TrendingUp, Briefcase, GraduationCap } from 'lucide-react';
import { SparkleGroup } from './animations/Sparkle';
import { Divider } from './ui/divider';
import { Separator } from './ui/separator';
import CompanyDirectory from './resources/CompanyDirectory';
import { topJacksonvilleCompanies } from '@/lib/mock-data/companiesData';

const EnhancedHero = () => {
  return (
    <div className="relative">
      {/* Add sparkles throughout the hero area */}
      <SparkleGroup count={12} />
      
      <div className="bg-blue-50 py-4 px-4 text-center relative overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="flex items-center">
            <TrendingUp className="text-blue-600 h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Your First Job, Made Simple.</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="text-amber-600 h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Fast lane to hire eager high schoolers</span>
          </div>
          <div className="flex items-center">
            <GraduationCap className="text-green-600 h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Partnering with schools to boost career readiness</span>
          </div>
        </div>
      </div>
      
      <HeroSection />
      
      {/* Divider with text "For Students, Employers & Schools" */}
      <div className="container mx-auto px-4">
        <Separator className="my-8" />
        <Divider className="mb-8">For Students, Employers & Schools</Divider>
      </div>
      
      {/* Top Employers in Jacksonville Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Top 10 Employers in Jacksonville</h2>
        <CompanyDirectory companies={topJacksonvilleCompanies} />
      </div>
      
      <SectionSeparator />
      
      <FeaturedJobsSection />
      <TopEmployersSection />
      <FeaturesSection />
      <JobPlacementsSection />
      <PartnerLogosSection />
      <CallToActionSection />
    </div>
  );
};

export default EnhancedHero;
