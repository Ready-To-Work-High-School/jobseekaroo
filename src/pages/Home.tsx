
import React, { Suspense, lazy, useState, useEffect } from 'react';
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
import SearchSection from '@/components/home/SearchSection';

// Lazy load the content that appears below the fold
const LazyLoadedContent = lazy(() => import('../components/home/LazyLoadedContent'));

const Home = () => {
  const [canvaLoaded, setCanvaLoaded] = useState(false);
  
  // Handle iframe load event
  const handleIframeLoad = () => {
    setCanvaLoaded(true);
  };

  return (
    <Layout>
      <Helmet>
        <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
        <meta name="description" content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students at Westside High School." />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.webp" as="image" fetchPriority="high" type="image/webp" />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://cdn.gpteng.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.canva.com" crossOrigin="anonymous" />
        
        {/* Add responsive viewport meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      
      {/* Enhanced Canva Design Embed with responsive styling */}
      <div className="container mx-auto px-4 py-4">
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
          {/* Loading spinner overlay */}
          {!canvaLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 z-10">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Responsive container */}
          <div 
            className="relative w-full" 
            style={{ 
              paddingTop: "56.2225%",
              boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)", 
              overflow: "hidden",
              borderRadius: "8px", 
              willChange: "transform"
            }}
          >
            <iframe 
              loading="lazy" 
              onLoad={handleIframeLoad}
              className={`absolute top-0 left-0 w-full h-full border-0 p-0 m-0 transition-opacity duration-500 ${canvaLoaded ? 'opacity-100' : 'opacity-0'}`}
              src="https://www.canva.com/design/DAGkhyBr97U/mhY4WIvBv8Dw9yz13QDmRQ/view?embed" 
              allowFullScreen={true}
              allow="fullscreen"
              title="Career Platform Template"
            />
          </div>
          
          {/* Enhanced attribution with better styling */}
          <div className="flex items-center justify-center mt-3 mb-5 text-center">
            <a 
              href="https://www.canva.com/design/DAGkhyBr97U/mhY4WIvBv8Dw9yz13QDmRQ/view?utm_content=DAGkhyBr97U&utm_campaign=designshare&utm_medium=embeds&utm_source=link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <line x1="12" y1="22" x2="12" y2="12"></line>
              </svg>
              <span>Company Website Template</span>
            </a>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-500">by Coleman, Pamela Y.</span>
          </div>
        </div>
      </div>
      
      <ErrorBoundary>
        <EnhancedHero />
      </ErrorBoundary>
      
      {/* Add Mayo Summer Program Feature prominently after the hero */}
      <ErrorBoundary>
        <MayoSummerFeature />
      </ErrorBoundary>
      
      {/* Add the Search section (similar to Snyk's approach) */}
      <ErrorBoundary>
        <SearchSection />
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
