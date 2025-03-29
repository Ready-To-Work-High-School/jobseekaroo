
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
import CompanyDirectory from '@/components/resources/CompanyDirectory';
import { topJacksonvilleCompanies } from '@/lib/mock-data/companiesData';
import EncryptionServiceTest from '@/components/EncryptionServiceTest';

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
        
        {/* Top Companies Directory Section - New prominent section */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl font-bold mb-3">Top Paying Companies in Jacksonville</h2>
              <p className="text-muted-foreground">
                Explore opportunities at these leading employers offering competitive salaries
              </p>
            </div>
            <CompanyDirectory companies={topJacksonvilleCompanies} />
          </div>
        </section>
        
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
        
        {/* Add TestAdmin component at the bottom of the page with clear heading */}
        <div className="mt-8 w-full max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Admin Testing Section</h2>
            <p className="text-gray-600">Use this panel to test admin functionality</p>
          </div>
          <TestAdmin />
        </div>
        
        {/* Add EncryptionServiceTest component section */}
        <div className="mt-8 mb-12 w-full max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Encryption Service Testing</h2>
            <p className="text-gray-600">Test if your encryption service is correctly configured</p>
          </div>
          <EncryptionServiceTest />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
