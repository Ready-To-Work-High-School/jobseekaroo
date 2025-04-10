
import React, { Suspense, lazy } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';

// Only import the EnhancedHero directly since it's visible immediately
import EnhancedHero from '../components/EnhancedHero';

// Import our new components
import EnhancedJobListings from '@/components/home/EnhancedJobListings';
import SuccessStories from '@/components/home/SuccessStories';

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
      </Helmet>
      
      <ErrorBoundary>
        <EnhancedHero />
      </ErrorBoundary>
      
      {/* Add new enhanced job listings component */}
      <ErrorBoundary>
        <EnhancedJobListings />
      </ErrorBoundary>
      
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
