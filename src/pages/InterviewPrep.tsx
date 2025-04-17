
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';

const InterviewPrep = () => {
  console.log("Rendering InterviewPrep page");

  // Create a basic fallback component
  const FallbackComponent = () => (
    <div className="text-center py-16">
      <h1 className="text-3xl font-bold mb-4">Interview Preparation</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Access interview tips, practice questions, and expert guidance to help you succeed in your job interviews.
      </p>
    </div>
  );

  // Dynamic import of InterviewPrepContent component if it exists
  const InterviewPrepContent = React.lazy(() => {
    return import('@/components/interview/InterviewPrepContent')
      .catch(() => {
        console.error("Failed to load InterviewPrepContent");
        return { default: FallbackComponent };
      });
  });

  return (
    <Layout>
      <Helmet>
        <title>Interview Preparation | Job Seekers 4 HS</title>
        <meta 
          name="description" 
          content="Prepare for job interviews with our comprehensive tools, practice questions, and expert tips." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <ErrorBoundary>
          <React.Suspense fallback={
            <div className="text-center py-16">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading interview preparation content...</p>
            </div>
          }>
            <InterviewPrepContent />
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default InterviewPrep;
