import React, { Suspense, lazy, useState } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';
import CanvaEmbed from '@/components/shared/CanvaEmbed';

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

// Import content directly instead of lazy loading to avoid dynamic import issues
import { Sparkles, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserRecommendationsSection from '@/components/home/UserRecommendationsSection';
import Chatbot from '@/components/support/Chatbot';
const Home = () => {
  return <Layout>
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
      
      {/* Enhanced Canva Design Embed with responsive styling and download button */}
      
      
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
      
      {/* Previously lazy loaded content now directly included */}
      <ErrorBoundary>
        {/* Premium Features Banner - simplified DOM */}
        <div className="max-w-5xl mx-auto mt-12 mb-8 bg-gradient-to-r from-amber-50 to-blue-50 p-5 rounded-lg border border-amber-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-amber-500" />
              <div>
                <h3 className="font-medium">Premium Features for Employers</h3>
                <p className="text-sm text-muted-foreground">Access advanced analytics and premium company profiles</p>
              </div>
            </div>
            <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
              <Link to="/employer-premium">
                Explore Premium Features
              </Link>
            </Button>
          </div>
        </div>
        
        {/* AI Job Help Banner - simplified DOM */}
        <div className="max-w-5xl mx-auto mt-12 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-medium">AI-Powered Job Search Help</h3>
                <p className="text-sm text-muted-foreground">Get personalized resume, interview, and job application guidance</p>
              </div>
            </div>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Link to="/job-help">
                Get AI Assistance
              </Link>
            </Button>
          </div>
        </div>
        
        {/* User recommendations section */}
        <ErrorBoundary>
          <UserRecommendationsSection />
        </ErrorBoundary>
        
        {/* Chatbot */}
        <ErrorBoundary>
          <Chatbot />
        </ErrorBoundary>
      </ErrorBoundary>
    </Layout>;
};
export default Home;