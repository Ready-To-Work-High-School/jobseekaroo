
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';

const InterviewPrep = () => {
  console.log("Rendering InterviewPrep page");

  // Dynamic import of InterviewPrepContent component if it exists
  const InterviewPrepContent = React.lazy(() => {
    return new Promise((resolve) => {
      try {
        // Try to import the component
        import('@/components/interview/InterviewPrepContent').then(resolve)
          .catch(error => {
            console.error("Failed to load InterviewPrepContent:", error);
            // Fallback to a minimal component if import fails
            resolve({
              default: () => (
                <div className="text-center py-16">
                  <h1 className="text-3xl font-bold mb-4">Interview Preparation</h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Access interview tips, practice questions, and expert guidance to help you succeed in your job interviews.
                  </p>
                </div>
              )
            });
          });
      } catch (error) {
        console.error("Error in dynamic import:", error);
        // Fallback component
        resolve({
          default: () => (
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold mb-4">Interview Preparation</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Access interview tips, practice questions, and expert guidance to help you succeed in your job interviews.
              </p>
            </div>
          )
        });
      }
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
