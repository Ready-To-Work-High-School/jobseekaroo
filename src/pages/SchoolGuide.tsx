
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, School, BookOpen, Users, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFadeIn } from '@/utils/animations';

const SchoolGuide = () => {
  const fadeIn = useFadeIn(300);

  const resources = [
    {
      title: 'School Integration Guide',
      description: 'Learn how to integrate our platform with your school systems.',
      icon: School,
      link: '/school-integration'
    },
    {
      title: 'Curriculum Resources',
      description: 'Classroom materials and curriculum guides for teachers.',
      icon: BookOpen,
      link: '/school/resources'
    },
    {
      title: 'Student Progress Tracking',
      description: 'Track student engagement and progress with our analytics tools.',
      icon: Users,
      link: '/school/students'
    },
    {
      title: 'Schedule Career Events',
      description: 'Plan and organize career fairs and employer visits.',
      icon: CalendarCheck,
      link: '/school/events'
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>School Guide | Job Seekers 4 HS</title>
        <meta
          name="description"
          content="Resources and guides for school administrators and teachers to help students prepare for their first jobs."
        />
      </Helmet>

      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="p-0 mr-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold flex items-center">
              <School className="mr-2" /> School Guide
            </h1>
          </div>
        </div>

        <div className="bg-background p-6 rounded-lg border mb-8">
          <h2 className="text-xl font-semibold mb-4">Resources for Educators</h2>
          <p className="text-muted-foreground mb-6">
            Utilize our platform to help your students prepare for the workforce with career guidance, skill development tools, and employer connections.
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
                      <Link to={resource.link}>Access Resource</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        <div className="text-center py-8">
          <h3 className="text-xl font-medium mb-4">Need specialized support for your school?</h3>
          <Button size="lg" asChild>
            <Link to="/contact">Contact our Education Team</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolGuide;
