
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import JobListings from '@/components/JobListings';
import { Helmet } from 'react-helmet-async';

const Jobs = () => {
  // Log when the component mounts to debug
  useEffect(() => {
    console.log('Jobs page mounted');
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Find Your Perfect First Job</title>
        <meta name="description" content="Discover amazing opportunities tailored for high school students. Start your career journey today!" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Browse Jobs</h2>
        <JobListings />
      </div>
    </Layout>
  );
};

export default Jobs;
