
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Video, FileText, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const InterviewPrep = () => {
  const resources = [
    {
      title: 'Common Interview Questions',
      description: 'Practice answering frequently asked questions for entry-level positions.',
      icon: MessageSquare,
      link: '/interview-questions'
    },
    {
      title: 'Mock Interview Simulator',
      description: 'Practice your interview skills with our interactive simulator.',
      icon: Video,
      link: '/mock-interview'
    },
    {
      title: 'Resume Check',
      description: 'Ensure your resume is ready for your job applications.',
      icon: FileText,
      link: '/resume-assistant'
    },
    {
      title: 'Interview Checklist',
      description: 'Everything you need to prepare before your interview.',
      icon: Check,
      link: '/interview-checklist'
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Interview Preparation | Job Seekers 4 HS</title>
        <meta
          name="description"
          content="Prepare for your job interviews with practice questions, mock interviews, and expert tips."
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
            <h1 className="text-3xl font-bold">Interview Preparation</h1>
          </div>
        </div>

        <div className="bg-background p-6 rounded-lg border mb-8">
          <h2 className="text-xl font-semibold mb-2">Ace Your First Interview</h2>
          <p className="text-muted-foreground mb-6">
            Prepare for your interviews with our comprehensive tools and resources designed specifically for first-time job seekers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      {resource.title}
                    </CardTitle>
                    <CardDescription>
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link to={resource.link}>Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div className="text-center py-8">
          <h3 className="text-xl font-medium mb-4">Need personalized help?</h3>
          <Button size="lg" asChild>
            <Link to="/contact">Contact a Career Coach</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewPrep;
