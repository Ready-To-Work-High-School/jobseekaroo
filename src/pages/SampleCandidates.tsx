
import React from 'react';
import Layout from '@/components/Layout';
import SampleCandidatesComponent from '@/components/employer/SampleCandidates';
import { Helmet } from 'react-helmet';

const SampleCandidates = () => {
  return (
    <Layout>
      <Helmet>
        <title>Sample Candidates - Job Seekers 4 HS</title>
        <meta name="description" content="View sample candidates from Westside High School's specialized academies" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Sample Candidates
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Browse profiles of student candidates from Westside High School's specialized academies. 
          These students are actively seeking entry-level positions and internships.
        </p>
        
        <SampleCandidatesComponent />
      </div>
    </Layout>
  );
};

export default SampleCandidates;
