
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import InterviewPrepContent from '@/components/interview/InterviewPrepContent';

const InterviewPrep = () => {
  useEffect(() => {
    console.log('InterviewPrep component mounted');
    return () => console.log('InterviewPrep component unmounted');
  }, []);

  console.log('InterviewPrep rendering');

  return (
    <Layout>
      {console.log('Layout rendering in InterviewPrep')}
      <Helmet>
        <title>Interview Preparation | Job Seekers 4 HS</title>
        <meta 
          name="description" 
          content="Prepare for job interviews with our comprehensive tools, practice questions, and expert tips." 
        />
      </Helmet>
      
      {console.log('About to render InterviewPrepContent')}
      <InterviewPrepContent />
    </Layout>
  );
};

export default InterviewPrep;
