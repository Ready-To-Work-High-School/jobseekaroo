
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import EnhancedHero from '@/components/EnhancedHero';
import LazyLoadedContent from '@/components/home/LazyLoadedContent';

const Home = () => {
  console.log('Home component rendering');
  
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
      </Helmet>
      
      <EnhancedHero />
      <LazyLoadedContent />
    </Layout>
  );
};

export default Home;
