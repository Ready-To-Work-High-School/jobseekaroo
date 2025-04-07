
import React, { Suspense, lazy } from 'react';
import { Sparkles, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load components that aren't immediately visible
const UserRecommendationsSection = lazy(() => import('./UserRecommendationsSection'));
const Chatbot = lazy(() => import('@/components/support/Chatbot'));

const LazyLoadedContent = () => {
  return (
    <>
      {/* Premium Features Banner */}
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
      
      {/* AI Job Help Banner */}
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
      
      {/* Lazy load recommendations section */}
      <Suspense fallback={<div className="py-12 flex justify-center"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
        <ErrorBoundary>
          <UserRecommendationsSection />
        </ErrorBoundary>
      </Suspense>
      
      {/* Lazy load chatbot */}
      <Suspense fallback={<div className="min-h-[200px]"></div>}>
        <ErrorBoundary>
          <Chatbot />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default LazyLoadedContent;
