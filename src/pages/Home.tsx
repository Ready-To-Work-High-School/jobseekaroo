import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import AdminToggle from '@/components/admin/AdminToggle';
import SearchSection from '@/components/home/SearchSection';
import EnhancedJobListings from '@/components/home/EnhancedJobListings';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FirstJobToolkit from '@/components/home/FirstJobToolkit';
import MayoSummerFeature from '@/components/home/MayoSummerFeature';
import FeeTeaser from '@/components/pricing/FeeTeaser';
import Hero from '@/components/Hero';
import SuccessStories from '@/components/home/SuccessStories';
import JobPlacementsSection from '@/components/home/JobPlacementsSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import UserRecommendationsSection from '@/components/home/UserRecommendationsSection';
import Chatbot from '@/components/support/Chatbot';
import JobSimulationsSection from '@/components/home/JobSimulationsSection';
import InfoBanner from '@/components/home/InfoBanner';
import SectionSeparator from '@/components/home/SectionSeparator';
import { topJacksonvilleCompanies } from '@/lib/mock-data/companiesData';
import CompanyDirectory from '@/components/resources/CompanyDirectory';

const Home = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();

  return (
    <Layout>
      <Helmet>
        <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
        <meta 
          name="description" 
          content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students at Westside High School." 
        />
        <link 
          rel="preload" 
          href="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.webp" 
          as="image" 
          fetchPriority="high" 
          type="image/webp" 
        />
        <link rel="preconnect" href="https://cdn.gpteng.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.canva.com" crossOrigin="anonymous" />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" 
        />
      </Helmet>

      {/* Info Banner */}
      <ErrorBoundary>
        <InfoBanner />
      </ErrorBoundary>

      {/* Hero Section - Updated for student focus */}
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      {/* Video Section */}
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-purple-50 to-amber-50 p-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <video 
                controls 
                className="w-full h-full object-cover"
                poster="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png"
              >
                <source 
                  src="/career-kickstart-video.mp4" 
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-500">
                Career Kickstart Orientation Video
              </p>
            </div>
          </div>
        </div>
      </ErrorBoundary>

      <SectionSeparator />

      {/* Search Section - Keep it prominent for quick job search */}
      <ErrorBoundary>
        <SearchSection />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Enhanced Job Listings - Show available opportunities */}
      <ErrorBoundary>
        <EnhancedJobListings />
      </ErrorBoundary>

      <SectionSeparator />

      {/* How It Works - Make the process clear */}
      <ErrorBoundary>
        <HowItWorksSection />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Top Jacksonville Employers with logos */}
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Top Employers in Jacksonville</h2>
          <CompanyDirectory companies={topJacksonvilleCompanies.slice(0, 6)} />
        </div>
      </ErrorBoundary>

      <SectionSeparator />

      {/* Success Stories - Show real outcomes */}
      <ErrorBoundary>
        <SuccessStories />
      </ErrorBoundary>

      <SectionSeparator />

      {/* First Job Toolkit - Help students prepare */}
      <ErrorBoundary>
        <FirstJobToolkit />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Job Simulations Section */}
      <ErrorBoundary>
        <JobSimulationsSection />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Mayo Summer Program Feature */}
      <ErrorBoundary>
        <MayoSummerFeature />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Fee Teaser */}
      <ErrorBoundary>
        <FeeTeaser />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Call to Action */}
      <ErrorBoundary>
        <CallToActionSection />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Admin Toggle (if user is logged in) */}
      {user && (
        <div className="container mx-auto px-4 py-8">
          <AdminToggle />
        </div>
      )}

      <SectionSeparator />

      {/* User Recommendations */}
      <ErrorBoundary>
        <UserRecommendationsSection />
      </ErrorBoundary>

      <SectionSeparator />

      {/* Chatbot for support */}
      <ErrorBoundary>
        <Chatbot />
      </ErrorBoundary>
    </Layout>
  );
};

export default Home;
