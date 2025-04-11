import React, { Suspense, lazy } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';

// Only import the EnhancedHero directly since it's visible immediately
import EnhancedHero from '../components/EnhancedHero';

// Import our components
import EnhancedJobListings from '@/components/home/EnhancedJobListings';
import SuccessStories from '@/components/home/SuccessStories';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import JobLocationsMap from '@/components/job/JobLocationsMap';
import StudentProfileGrid from '@/components/students/StudentProfileGrid';
import SampleCandidates from '@/components/employer/SampleCandidates';
import FeeTeaser from '@/components/pricing/FeeTeaser';
import MayoSummerFeature from '@/components/home/MayoSummerFeature';

// Lazy load the content that appears below the fold
const LazyLoadedContent = lazy(() => import('../components/home/LazyLoadedContent'));

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
        <meta name="description" content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students at Westside High School." />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.webp" as="image" fetchPriority="high" type="image/webp" />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://cdn.gpteng.co" crossOrigin="anonymous" />
        
        {/* Add responsive viewport meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      
      <ErrorBoundary>
        <EnhancedHero />
      </ErrorBoundary>
      
      {/* Add Mayo Summer Program Feature prominently after the hero */}
      <ErrorBoundary>
        <MayoSummerFeature />
      </ErrorBoundary>
      
      {/* Add the How It Works section */}
      <ErrorBoundary>
        <HowItWorksSection />
      </ErrorBoundary>
      
      {/* Add enhanced job listings component */}
      <ErrorBoundary>
        <EnhancedJobListings />
      </ErrorBoundary>
      
      {/* Add Fee Teaser section */}
      <ErrorBoundary>
        <FeeTeaser />
      </ErrorBoundary>
      
      {/* Add map of job locations */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Discover Jobs Near You</h2>
        <ErrorBoundary>
          <JobLocationsMap />
        </ErrorBoundary>
      </div>
      
      {/* Add sample candidates section */}
      <div className="container mx-auto px-4 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-center">Sample Candidates</h2>
        <ErrorBoundary>
          <SampleCandidates />
        </ErrorBoundary>
      </div>
      
      {/* Add success stories component */}
      <ErrorBoundary>
        <SuccessStories />
      </ErrorBoundary>
      
      <Suspense fallback={<div className="py-8 flex justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>}>
        <LazyLoadedContent />
      </Suspense>
    </Layout>
  );
};

export default Home;
