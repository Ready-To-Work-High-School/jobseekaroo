
import React from 'react';
import Layout from '@/components/Layout';
import BackToTopButton from '@/components/navigation/BackToTopButton';

const JobDetail = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Job Detail</h1>
          <p className="text-muted-foreground">This is a placeholder for the job detail page.</p>
        </div>
      </div>
      <BackToTopButton />
    </Layout>
  );
};

export default JobDetail;
