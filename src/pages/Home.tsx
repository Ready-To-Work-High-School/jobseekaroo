
import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useFadeIn } from '@/utils/animations';
import AdminToggle from '@/components/admin/AdminToggle';
import { useAuth } from '@/contexts/AuthContext';
import InfoBanner from '@/components/home/InfoBanner';
import SearchSection from '@/components/home/SearchSection';
import EnhancedJobListings from '@/components/home/EnhancedJobListings';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FirstJobToolkit from '@/components/home/FirstJobToolkit';
import FeaturedProgramsSection from '@/components/home/FeaturedProgramsSection';
import MayoSummerFeature from '@/components/home/MayoSummerFeature';
import FeeTeaser from '@/components/pricing/FeeTeaser';
import CredentialsDropdown from '@/components/home/CredentialsDropdown';
import BrandLogo from '@/components/home/BrandLogo';
import QuickAccessButtons from '@/components/home/QuickAccessButtons';
import Hero from '@/components/Hero';
import SuccessStories from '@/components/home/SuccessStories';
import JobLocationsMap from '@/components/job/JobLocationsMap';
import SampleCandidates from '@/components/employer/SampleCandidates';
import CallToActionSection from '@/components/home/CallToActionSection';
import UserRecommendationsSection from '@/components/home/UserRecommendationsSection';
import Chatbot from '@/components/support/Chatbot';

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

      {/* Hero Section - Now includes job search immediately */}
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      {/* Search Section - Moved up */}
      <ErrorBoundary>
        <SearchSection />
      </ErrorBoundary>

      {/* Enhanced Job Listings - Moved up */}
      <ErrorBoundary>
        <EnhancedJobListings />
      </ErrorBoundary>

      {/* How It Works - Moved up since it's job-related */}
      <ErrorBoundary>
        <HowItWorksSection />
      </ErrorBoundary>

      {/* Job Locations Map - Moved up */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Discover Jobs Near You</h2>
        <ErrorBoundary>
          <JobLocationsMap />
        </ErrorBoundary>
      </div>

      {/* First Job Toolkit */}
      <ErrorBoundary>
        <FirstJobToolkit />
      </ErrorBoundary>

      {/* Mayo Summer Program Feature */}
      <ErrorBoundary>
        <MayoSummerFeature />
      </ErrorBoundary>

      {/* Featured Programs */}
      <ErrorBoundary>
        <FeaturedProgramsSection />
      </ErrorBoundary>

      {/* Fee Teaser */}
      <ErrorBoundary>
        <FeeTeaser />
      </ErrorBoundary>

      {/* Sample Candidates */}
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-center">Sample Candidates</h2>
        <ErrorBoundary>
          <SampleCandidates />
        </ErrorBoundary>
      </div>

      {/* Success Stories */}
      <ErrorBoundary>
        <SuccessStories />
      </ErrorBoundary>

      {/* Call to Action */}
      <ErrorBoundary>
        <CallToActionSection />
      </ErrorBoundary>

      {/* Quick Access Buttons */}
      <ErrorBoundary>
        <QuickAccessButtons />
      </ErrorBoundary>

      {/* Admin Toggle (if user is logged in) */}
      {user && (
        <div className="container mx-auto px-4 py-8">
          <AdminToggle />
        </div>
      )}

      {/* User Recommendations */}
      <ErrorBoundary>
        <UserRecommendationsSection />
      </ErrorBoundary>

      {/* Chatbot */}
      <ErrorBoundary>
        <Chatbot />
      </ErrorBoundary>
    </Layout>
  );
};

export default Home;
