
import React, { lazy, Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import { TrendingUp, Briefcase, GraduationCap } from 'lucide-react';
import { SparkleGroup } from './animations/Sparkle';
import { Divider } from './ui/divider';
import { Separator } from './ui/separator';
import { topJacksonvilleCompanies } from '@/lib/mock-data/companiesData';

// Lazy load components that aren't visible in the initial viewport
const PartnerLogosSection = lazy(() => import('@/components/home/PartnerLogosSection'));
const CallToActionSection = lazy(() => import('@/components/home/CallToActionSection'));
const FeaturedJobsSection = lazy(() => import('@/components/home/FeaturedJobsSection'));
const JobPlacementsSection = lazy(() => import('@/components/home/JobPlacementsSection'));
const FeaturesSection = lazy(() => import('@/components/home/FeaturesSection'));
const TopEmployersSection = lazy(() => import('@/components/job/TopEmployersSection'));
const SectionSeparator = lazy(() => import('@/components/home/SectionSeparator'));
const CompanyDirectory = lazy(() => import('./resources/CompanyDirectory'));

// Loading fallback component
const SectionSkeleton = () => (
  <div className="w-full py-8">
    <div className="max-w-6xl mx-auto px-4">
      <div className="h-10 w-1/3 bg-gray-200 rounded animate-pulse mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-100 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

const EnhancedHero = () => {
  return (
    <div className="relative">
      {/* Reduced number of sparkles */}
      <SparkleGroup count={6} />
      
      {/* Info banner with optimized DOM */}
      <div className="bg-blue-50 py-4 px-4 text-center">
        <div className="container mx-auto flex flex-wrap justify-center gap-4 md:gap-8">
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
      
      {/* Hero section is critical for initial render, so not lazy loaded */}
      <HeroSection />
      
      {/* Divider with text */}
      <div className="container mx-auto px-4">
        <Separator className="my-8" />
        <Divider className="mb-8">For Students, Employers & Schools</Divider>
      </div>
      
      {/* Lazy load below-the-fold content */}
      <Suspense fallback={<SectionSkeleton />}>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Top 10 Employers in Jacksonville</h2>
          <CompanyDirectory companies={topJacksonvilleCompanies.slice(0, 6)} />
        </div>
        
        <SectionSeparator />
        
        <FeaturedJobsSection />
        <TopEmployersSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturesSection />
        <JobPlacementsSection />
        <PartnerLogosSection />
        <CallToActionSection />
      </Suspense>
    </div>
  );
};

export default EnhancedHero;
