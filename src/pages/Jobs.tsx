
import React from 'react';
import Layout from '@/components/Layout';
import JobListingsLayout from '@/components/job/JobListingsLayout';

const Jobs = () => {
  return (
    <Layout>
      <JobListingsLayout
        title="Browse Jobs"
        description="Find the perfect job opportunity"
        searchForm={<div />} // Replace with actual search form component
      >
        <div className="container mx-auto px-4">
          {/* Job listings content will go here */}
        </div>
      </JobListingsLayout>
    </Layout>
  );
};

export default Jobs;
