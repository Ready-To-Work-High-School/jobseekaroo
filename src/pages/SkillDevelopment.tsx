
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import ErrorBoundary from '@/components/ErrorBoundary';
import SkillsTabs from '@/components/skills/SkillsTabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import AdaptiveLearning from '@/components/job-simulations/AdaptiveLearning';
import { SkillsProvider } from '@/contexts/SkillsContext';

const SkillDevelopment = () => {
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
            <SkillsProvider>
              <SkillsTabs />
            </SkillsProvider>
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
