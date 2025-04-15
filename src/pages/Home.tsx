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
import JobLocationsMap from '@/components/job/JobLocationsMap';
import JobPlacementsSection from '@/components/home/JobPlacementsSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import UserRecommendationsSection from '@/components/home/UserRecommendationsSection';
import Chatbot from '@/components/support/Chatbot';
import JobSimulationsSection from '@/components/home/JobSimulationsSection';
import InfoBanner from '@/components/home/InfoBanner';

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

      {/* Search Section - Keep it prominent for quick job search */}
      <ErrorBoundary>
        <SearchSection />
      </ErrorBoundary>

      {/* Enhanced Job Listings - Show available opportunities */}
      <ErrorBoundary>
        <EnhancedJobListings />
      </ErrorBoundary>

      {/* How It Works - Make the process clear */}
      <ErrorBoundary>
        <HowItWorksSection />
      </ErrorBoundary>

      {/* Job Locations Map */}
      <ErrorBoundary>
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Discover Jobs Near You</h2>
          <JobLocationsMap />
        </div>
      </ErrorBoundary>

      {/* Success Stories - Show real outcomes */}
      <ErrorBoundary>
        <SuccessStories />
      </ErrorBoundary>

      {/* First Job Toolkit - Help students prepare */}
      <ErrorBoundary>
        <FirstJobToolkit />
      </ErrorBoundary>

      {/* Job Simulations Section */}
      <ErrorBoundary>
        <JobSimulationsSection />
      </ErrorBoundary>

      {/* Mayo Summer Program Feature */}
      <ErrorBoundary>
        <MayoSummerFeature />
      </ErrorBoundary>

      {/* Fee Teaser */}
      <ErrorBoundary>
        <FeeTeaser />
      </ErrorBoundary>

      {/* Call to Action */}
      <ErrorBoundary>
        <CallToActionSection />
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

      {/* Chatbot for support */}
      <ErrorBoundary>
        <Chatbot />
      </ErrorBoundary>
    </Layout>
  );
};

export default Home;
