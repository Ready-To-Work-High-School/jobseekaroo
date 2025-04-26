
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';
import SkillsTabs from '@/components/skills/SkillsTabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import AdaptiveLearning from '@/components/job-simulations/AdaptiveLearning';
import { SkillsProvider } from '@/contexts/SkillsContext';
import { useAuth } from '@/contexts/auth';

const SkillDevelopment = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a small timeout to prevent rapid mounting/unmounting
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Skill Development | Job Seekers 4 HS</title>
        <meta
          name="description"
          content="Develop essential skills for your first job through guided learning paths and interactive activities."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="p-0 mr-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold flex items-center">
              <BookOpen className="mr-2" /> Skill Development
            </h1>
          </div>
        </div>

        <div className="bg-background p-6 rounded-lg border mb-8">
          <h2 className="text-xl font-semibold mb-4">Build Your Career Skills</h2>
          <p className="text-muted-foreground mb-6">
            Track your progress, identify skill gaps, and access personalized resources to help you prepare for your first job.
          </p>
          
          <ErrorBoundary>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : (
              <SkillsProvider>
                <ErrorBoundary>
                  <SkillsTabs />
                </ErrorBoundary>
              </SkillsProvider>
            )}
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <AdaptiveLearning />
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default SkillDevelopment;
