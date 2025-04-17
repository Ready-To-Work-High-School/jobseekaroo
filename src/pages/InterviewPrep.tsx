
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
      
      {/* This assumes InterviewPrepContent component exists */}
      <div className="container mx-auto px-4 py-8">
        {/* Fallback content in case InterviewPrepContent is missing */}
        {typeof InterviewPrepContent === 'undefined' ? (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Interview Preparation</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Access interview tips, practice questions, and expert guidance to help you succeed in your job interviews.
            </p>
          </div>
        ) : (
          <InterviewPrepContent />
        )}
      </div>
    </Layout>
  );
};

export default InterviewPrep;
