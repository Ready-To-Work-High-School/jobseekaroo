
import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import { SparkleGroup } from './animations/Sparkle';
import { Divider } from './ui/divider';
import { Separator } from './ui/separator';
import CompanyDirectory from './resources/CompanyDirectory';
import { topJacksonvilleCompanies } from '@/lib/mock-data/companiesData';
import { afterInitialRender } from '@/utils/performance';

// Import components that will be lazy loaded
const PartnerLogosSection = React.lazy(() => import('@/components/home/PartnerLogosSection'));
const CallToActionSection = React.lazy(() => import('@/components/home/CallToActionSection'));
const FeaturedJobsSection = React.lazy(() => import('@/components/home/FeaturedJobsSection'));
const JobPlacementsSection = React.lazy(() => import('@/components/home/JobPlacementsSection'));
const FeaturesSection = React.lazy(() => import('@/components/home/FeaturesSection'));
const TopEmployersSection = React.lazy(() => import('@/components/job/TopEmployersSection'));
const SectionSeparator = React.lazy(() => import('@/components/home/SectionSeparator'));
import { TrendingUp, Briefcase, GraduationCap } from 'lucide-react';

const EnhancedHero = () => {
  // Use state to control when to render non-critical components
  const [renderSecondary, setRenderSecondary] = useState(false);
  const [renderTertiary, setRenderTertiary] = useState(false);

  useEffect(() => {
    // Load secondary components after initial render
    afterInitialRender(() => {
      setRenderSecondary(true);
      
      // Load tertiary components after another delay
      setTimeout(() => {
        setRenderTertiary(true);
      }, 1000);
    });
  }, []);

  return (
    <div className="relative">
      {/* Only include critical sparkles initially */}
      <SparkleGroup count={4} />
      
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
      
      {/* Hero section is critical and should always render */}
      <HeroSection />
      
      {/* Divider with text "For Students, Employers & Schools" */}
      <div className="container mx-auto px-4">
        <Separator className="my-8" />
        <Divider className="mb-8">For Students, Employers & Schools</Divider>
      </div>
      
      {/* Top Employers in Jacksonville Section - critical for SEO */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Top 10 Employers in Jacksonville</h2>
        <CompanyDirectory companies={topJacksonvilleCompanies} />
      </div>
      
      {/* Only render non-critical components after initial load */}
      {renderSecondary && (
        <React.Suspense fallback={<div className="min-h-[200px]"></div>}>
          <SectionSeparator />
          <FeaturedJobsSection />
        </React.Suspense>
      )}
      
      {/* Load tertiary components last */}
      {renderTertiary && (
        <React.Suspense fallback={<div className="min-h-[200px]"></div>}>
          <TopEmployersSection />
          <FeaturesSection />
          <JobPlacementsSection />
          <PartnerLogosSection />
          <CallToActionSection />
        </React.Suspense>
      )}
    </div>
  );
};

export default EnhancedHero;
