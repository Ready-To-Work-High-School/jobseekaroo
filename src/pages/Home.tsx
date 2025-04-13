
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
import SearchSection from '@/components/home/SearchSection';

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
      
      {/* Canva Design Embed */}
      <div className="container mx-auto px-4 py-4">
        <div style={{ 
          position: "relative", 
          width: "100%", 
          height: "0", 
          paddingTop: "56.2225%",
          paddingBottom: "0", 
          boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)", 
          marginTop: "1.6em", 
          marginBottom: "0.9em", 
          overflow: "hidden",
          borderRadius: "8px", 
          willChange: "transform"
        }}>
          <iframe 
            loading="lazy" 
            style={{
              position: "absolute", 
              width: "100%", 
              height: "100%", 
              top: "0", 
              left: "0", 
              border: "none", 
              padding: "0",
              margin: "0"
            }}
            src="https://www.canva.com/design/DAGkhyBr97U/mhY4WIvBv8Dw9yz13QDmRQ/view?embed" 
            allowFullScreen={true}
            allow="fullscreen"
          />
        </div>
        <div className="text-center text-sm text-gray-500 mb-8">
          <a 
            href="https://www.canva.com/design/DAGkhyBr97U/mhY4WIvBv8Dw9yz13QDmRQ/view?utm_content=DAGkhyBr97U&utm_campaign=designshare&utm_medium=embeds&utm_source=link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Company Website Business Website in Violet Dark Blue Neon Pink Gradient Tech Style
          </a> by Coleman, Pamela Y.
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
