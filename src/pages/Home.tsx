
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';
import Hero from '@/components/Hero';
import SearchSection from '@/components/home/SearchSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import EnhancedHero from '@/components/EnhancedHero';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { toast } from 'sonner';

const Home = () => {
  const { isOnline, refreshData } = useNetworkStatus();
  
  useEffect(() => {
    console.log('Home component mounted - checking network status:', isOnline ? 'online' : 'offline');
    
    // Add additional debug logging
    const homeElement = document.getElementById('home-root');
    console.log('Home element found:', !!homeElement);
    
    // Initial data refresh when component mounts
    try {
      refreshData();
      console.log('Initial data refresh completed');
    } catch (error) {
      console.error('Error during initial data refresh:', error);
    }
    
    // Set up a refresh interval while the component is mounted
    const refreshInterval = setInterval(() => {
      if (isOnline) {
        console.log('Periodic data refresh triggered');
        try {
          refreshData();
        } catch (error) {
          console.error('Error during periodic refresh:', error);
        }
      } else {
        console.log('Skipping refresh - device is offline');
      }
    }, 60000); // Refresh every minute if online
    
    return () => {
      console.log('Home component unmounting - cleaning up');
      clearInterval(refreshInterval);
    };
  }, [isOnline, refreshData]);

  // Show reconnection notification when coming back online
  useEffect(() => {
    if (isOnline) {
      const lastReconnect = sessionStorage.getItem('last_reconnect');
      const now = Date.now();
      // Only show notification if we haven't shown one recently
      if (!lastReconnect || (now - parseInt(lastReconnect)) > 10000) {
        toast.success("You're back online. Content refreshed!", {
          duration: 3000,
          position: 'top-center',
        });
        sessionStorage.setItem('last_reconnect', now.toString());
      }
    }
  }, [isOnline]);

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
          <EnhancedHero key={`hero-${Date.now()}`} />
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
