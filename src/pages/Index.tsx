
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import EnhancedHero from '@/components/EnhancedHero';
import ProgramsSection from '@/components/ProgramsSection';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import FeaturedJobsSection from '@/components/home/FeaturedJobsSection';
import ResourcesSection from '@/components/home/ResourcesSection';
import UserRecommendationsSection from '@/components/home/UserRecommendationsSection';
import SearchSection from '@/components/home/SearchSection';
import SectionSeparator from '@/components/home/SectionSeparator';

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
        
        {/* Featured Jobs Section - moved up directly after Hero */}
        <FeaturedJobsSection />
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* Search Section - moved after Featured Jobs */}
        <SearchSection />
        
        {/* User-specific recommendation section */}
        {user && (
          <>
            <UserRecommendationsSection />
            <SectionSeparator />
          </>
        )}
        
        {/* Training & Certification Section */}
        <div className={fadeInSlow}>
          <ProgramsSection />
        </div>
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* Resources Section */}
        <ResourcesSection />
      </div>
    </Layout>
  );
};

export default Index;
