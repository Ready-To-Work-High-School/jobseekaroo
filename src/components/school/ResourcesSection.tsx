
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { School, BookOpen, Users, CalendarCheck } from 'lucide-react';

const ResourcesSection = () => {
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
  );
};

export default ResourcesSection;
