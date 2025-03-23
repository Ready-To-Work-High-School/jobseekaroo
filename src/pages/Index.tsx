
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
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Database, Cloud } from 'lucide-react';

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
        
        {/* Advanced Curriculum Section - NEW */}
        <section className={`py-12 bg-gradient-to-r from-blue-50 to-white ${contentAnimation}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">Advanced Technology Curriculum</h2>
              <p className="text-gray-700 mb-8 text-center">
                Westside High School students are gaining a competitive edge in the workforce before they even graduate through an advanced-level curriculum that covers Artificial Intelligence Foundations, Blockchain, Cloud Computing, Emerging Technologies, and the Internet of Things (IoT).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-blue-100 p-3 rounded-full mb-4">
                        <Bot className="h-8 w-8 text-blue-700" />
                      </div>
                      <h3 className="font-bold mb-2">AI Foundations</h3>
                      <p className="text-sm text-gray-600">Understanding machine learning algorithms and natural language processing</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-purple-100 p-3 rounded-full mb-4">
                        <Database className="h-8 w-8 text-purple-700" />
                      </div>
                      <h3 className="font-bold mb-2">Blockchain</h3>
                      <p className="text-sm text-gray-600">Exploring distributed ledger technology and smart contracts</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-sky-100 p-3 rounded-full mb-4">
                        <Cloud className="h-8 w-8 text-sky-700" />
                      </div>
                      <h3 className="font-bold mb-2">Cloud Computing</h3>
                      <p className="text-sm text-gray-600">Learning infrastructure, platforms, and software as a service</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-gray-700 text-center">
                By mastering these in-demand skills and earning industry-recognized credentials, students develop a strong foundation in current technology trends and gain practical, real-world expertise. Their hands-on experience and proven competencies make them highly valuable to employers, ready to contribute effectively and drive innovation from day one.
              </p>
            </div>
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
