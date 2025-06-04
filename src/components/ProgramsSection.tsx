
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, Calendar, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const ProgramsSection: React.FC = () => {
  const { user } = useAuth();

  const programs = [
    {
      id: 1,
      title: 'Summer Internship Program',
      description: 'Gain hands-on experience with local businesses during your summer break.',
      duration: '8-12 weeks',
      participants: '50+ students',
      status: 'Open',
      deadline: 'March 15, 2024',
    },
    {
      id: 2,
      title: 'Career Mentorship Program',
      description: 'Get paired with industry professionals for guidance and networking.',
      duration: '6 months',
      participants: '30+ mentors',
      status: 'Applications Soon',
      deadline: 'April 1, 2024',
    },
    {
      id: 3,
      title: 'Skills Certification Workshop',
      description: 'Earn industry-recognized certifications in various skill areas.',
      duration: '4-6 weeks',
      participants: '100+ students',
      status: 'Ongoing',
      deadline: 'Rolling basis',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Special Programs & Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accelerate your career with our exclusive programs designed for high school students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <Badge 
                    variant={
                      program.status === 'Open' ? 'default' :
                      program.status === 'Ongoing' ? 'secondary' :
                      'outline'
                    }
                  >
                    {program.status}
                  </Badge>
                </div>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    Duration: {program.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="mr-2 h-4 w-4" />
                    {program.participants}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="mr-2 h-4 w-4" />
                    Deadline: {program.deadline}
                  </div>
                </div>
                
                <Button className="w-full" disabled={program.status === 'Applications Soon'}>
                  {program.status === 'Applications Soon' ? 'Coming Soon' : 'Learn More'}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {!user && (
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Sign up to access exclusive programs and get notifications about new opportunities!
            </p>
            <Button asChild>
              <a href="/sign-up">Join Now</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgramsSection;
