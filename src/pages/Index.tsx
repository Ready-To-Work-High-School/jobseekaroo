
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
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const fadeInSlow = useFadeIn(600);
  const contentAnimation = useFadeIn(800);
  
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
        
        {/* Advanced Curriculum CTA - Simplified with link to Academy page */}
        <section className={`py-12 bg-gradient-to-r from-blue-50 to-white ${contentAnimation}`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Advanced Technology Curriculum</h2>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              Westside High School students are gaining a competitive edge in the workforce before they even graduate through 
              an advanced-level curriculum that covers Artificial Intelligence Foundations, Blockchain, Cloud Computing, 
              and Internet of Things (IoT).
            </p>
            
            <Button className="bg-blue-700 hover:bg-blue-800" asChild>
              <Link to="/academy">
                <GraduationCap className="mr-2 h-4 w-4" />
                Explore Our Academy Program
              </Link>
            </Button>
          </div>
        </section>
        
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
        
        {/* Search Section */}
        <SearchSection />
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* User-specific recommendation section */}
        {user && (
          <>
            <UserRecommendationsSection />
            <SectionSeparator />
          </>
        )}
        
        {/* Training & Certification Section - Simplified */}
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
