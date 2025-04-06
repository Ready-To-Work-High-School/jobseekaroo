
import React, { lazy, Suspense } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Bot } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Use lazy loading for non-critical components
const EnhancedHero = lazy(() => 
  import('../components/EnhancedHero').then(module => {
    // Add a small delay to prioritize the main content paint first
    if (window.requestAnimationFrame) {
      return new Promise(resolve => {
        window.requestAnimationFrame(() => resolve(module));
      });
    }
    return module;
  })
);

const Chatbot = lazy(() => import('@/components/support/Chatbot'));

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
        <meta name="description" content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students at Westside High School." />
        {/* Add preload for critical fonts */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
      </Helmet>
      
      {/* Improve the Hero loading experience with better placeholder */}
      <Suspense fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center bg-blue-50 px-4">
          <div className="w-full max-w-3xl mx-auto text-center">
            <Skeleton className="h-28 w-48 mx-auto mb-6" />
            <Skeleton className="h-12 w-4/5 mx-auto mb-4" />
            <Skeleton className="h-6 w-3/5 mx-auto mb-8" />
            <div className="flex justify-center space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      }>
        <EnhancedHero />
      </Suspense>
      
      {/* Premium Features Banner - use display: contents to avoid layout shifts */}
      <div style={{ display: 'contents' }}>
        <div className="max-w-5xl mx-auto mt-12 mb-8 bg-gradient-to-r from-amber-50 to-blue-50 p-5 rounded-lg border border-amber-100 dark:from-amber-950/30 dark:to-blue-950/30 dark:border-amber-900/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-amber-500" />
              <div>
                <h3 className="font-medium">Premium Features for Employers</h3>
                <p className="text-sm text-muted-foreground">Access advanced analytics and premium company profiles</p>
              </div>
            </div>
            <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
              <Link to="/employer-premium">
                Explore Premium Features
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* AI Job Help Banner */}
      <div style={{ display: 'contents' }}>
        <div className="max-w-5xl mx-auto mt-12 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg border border-blue-100 dark:from-blue-950/30 dark:to-purple-950/30 dark:border-blue-900/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-medium">AI-Powered Job Search Help</h3>
                <p className="text-sm text-muted-foreground">Get personalized resume, interview, and job application guidance</p>
              </div>
            </div>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Link to="/job-help">
                Get AI Assistance
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Lazy load the Chatbot component with lower priority */}
      <Suspense fallback={null}>
        {document.readyState === 'complete' ? <Chatbot /> : null}
      </Suspense>
    </Layout>
  );
};

export default Home;
