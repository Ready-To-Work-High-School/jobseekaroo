
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
const CredentialBadges = lazy(() => import('./auth/CredentialBadges'));

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
      
      {/* Prominent JS4HS Logo Display */}
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/0b66caa3-2a72-475c-981f-fe66e8da8bb0.png" 
            alt="JS4HS Logo" 
            className="h-32 md:h-40 w-auto object-contain"
            width="300"
            height="300"
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23dddddd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='8' r='7'%3E%3C/circle%3E%3Cpolyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88'%3E%3C/polyline%3E%3C/svg%3E";
            }}
          />
        </div>
        <h2 className="text-2xl font-bold">Job Seekers 4 High Schools</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Connecting students with credential-ready opportunities at Westside High School
        </p>
      </div>
      
      {/* Divider with text */}
      <div className="container mx-auto px-4">
        <Separator className="my-8" />
        <Divider className="mb-8">For Students, Employers & Schools</Divider>
        <p className="text-center text-muted-foreground mb-8">
          Job Seekers 4 High Schools brings together all parts of the career readiness ecosystem
        </p>
      </div>
      
      {/* Top Jacksonville Employers with logos */}
      <Suspense fallback={<SectionSkeleton />}>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Top Employers in Jacksonville</h2>
          <CompanyDirectory companies={topJacksonvilleCompanies.slice(0, 6)} />
        </div>
        
        <SectionSeparator />
        
        <FeaturedJobsSection />
        <TopEmployersSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <CredentialBadges />
        <FeaturesSection />
        <JobPlacementsSection />
        <PartnerLogosSection />
        <CallToActionSection />
      </Suspense>
    </div>
  );
};

export default EnhancedHero;
