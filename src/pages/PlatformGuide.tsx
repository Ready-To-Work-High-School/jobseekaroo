
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import ComprehensiveGuide from '@/components/resources/ComprehensiveGuide';

const PlatformGuide = () => {
  return (
    <Layout>
      <Helmet>
        <title>Platform Guide | Job Seekers 4 High Schools</title>
        <meta name="description" content="Comprehensive guide to using the Job Seekers 4 High Schools platform" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Platform Guide</h1>
        <ComprehensiveGuide />
      </div>
    </Layout>
  );
};

export default PlatformGuide;
