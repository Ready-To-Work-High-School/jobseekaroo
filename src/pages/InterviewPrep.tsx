
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import InterviewPrepContent from '@/components/interview/InterviewPrepContent';

const InterviewPrep = () => {
  return (
    <Layout>
      <Helmet>
        <title>Interview Preparation | Job Seekers 4 HS</title>
        <meta 
          name="description" 
          content="Prepare for job interviews with our comprehensive tools, practice questions, and expert tips." 
        />
      </Helmet>
      
      <InterviewPrepContent />
    </Layout>
  );
};

export default InterviewPrep;
