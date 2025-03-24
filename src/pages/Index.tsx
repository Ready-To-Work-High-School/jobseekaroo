import { useEffect } from 'react';
import Layout from '@/components/Layout';
import EnhancedHero from '@/components/EnhancedHero';
import ProgramsSection from '@/components/ProgramsSection';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import ResourcesSection from '@/components/home/ResourcesSection';
import UserRecommendationsSection from '@/components/home/UserRecommendationsSection';
import SearchSection from '@/components/home/SearchSection';
import SectionSeparator from '@/components/home/SectionSeparator';
import FeaturedJobsSection from '@/components/home/FeaturedJobsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import JobPlacementsSection from '@/components/home/JobPlacementsSection';
import TestAdmin from '@/components/TestAdmin';

const Index = () => {
  const { user } = useAuth();
  const fadeInSlow = useFadeIn(600);
  
  return (
    <Layout>
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      
      <div id="main-content">
        <EnhancedHero />
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* Featured Jobs Section */}
        <FeaturedJobsSection />
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* Job Placements Section */}
        <JobPlacementsSection />
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* Student Success Stories - MOVED ABOVE Search Section */}
        <TestimonialsSection />
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* Search Section */}
        <SearchSection />
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* For Employers Only Section */}
        <div className={fadeInSlow}>
          <ProgramsSection />
        </div>
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* User-specific recommendation section */}
        {user && (
          <>
            <UserRecommendationsSection />
            <SectionSeparator />
          </>
        )}
        
        {/* Resources Section */}
        <ResourcesSection />
        
        {/* Add TestAdmin component at the bottom of the page */}
        <div className="mt-8 w-full max-w-4xl mx-auto">
          <TestAdmin />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
