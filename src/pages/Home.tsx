
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';
import Hero from '@/components/Hero';
import SearchSection from '@/components/home/SearchSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import EnhancedHero from '@/components/EnhancedHero';

const Home = () => {
  useEffect(() => {
    console.log('Home component mounted - checking render status');
    
    // Add additional debug logging
    const homeElement = document.getElementById('home-root');
    console.log('Home element found:', !!homeElement);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
        <meta 
          name="description" 
          content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students at Westside High School." 
        />
      </Helmet>

      <div id="home-root" className="container mx-auto">
        <ErrorBoundary>
          <EnhancedHero />
        </ErrorBoundary>

        <ErrorBoundary>
          <SearchSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <HowItWorksSection />
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default Home;
