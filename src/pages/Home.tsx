
import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAuth } from '@/contexts/AuthContext';
import Hero from '@/components/Hero';
import SearchSection from '@/components/home/SearchSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FirstJobToolkit from '@/components/home/FirstJobToolkit';
import FeeTeaser from '@/components/pricing/FeeTeaser';
import SuccessStories from '@/components/home/SuccessStories';
import CallToActionSection from '@/components/home/CallToActionSection';
import { SparkleGroup } from '@/components/animations/Sparkle';

const Home = () => {
  console.log("Home component rendering");
  const { user } = useAuth();

  return (
    <Layout>
      <Helmet>
        <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
        <meta 
          name="description" 
          content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students at Westside High School." 
        />
      </Helmet>

      <div className="relative overflow-hidden">
        {/* Add multiple SparkleGroup components in different positions */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <SparkleGroup count={3} />
        </div>
        <div className="absolute top-1/4 right-0 w-full h-full pointer-events-none">
          <SparkleGroup count={2} />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
          <SparkleGroup count={3} />
        </div>

        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>

        <ErrorBoundary>
          <SearchSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <HowItWorksSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <FirstJobToolkit />
        </ErrorBoundary>

        <ErrorBoundary>
          <FeeTeaser />
        </ErrorBoundary>

        <ErrorBoundary>
          <SuccessStories />
        </ErrorBoundary>

        <ErrorBoundary>
          <CallToActionSection />
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default Home;
