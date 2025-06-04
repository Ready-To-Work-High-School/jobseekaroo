
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Users, TrendingUp, ExternalLink, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

interface TopJob {
  id: string;
  title: string;
  company: string;
  location: string;
  payRange: string;
  type: string;
  description: string;
  requirements: string[];
  openings: number;
  isHiring: boolean;
  jobWebsiteUrl: string;
}

const TopJobsSection = () => {
  const { user } = useAuth();
  const [topJobs] = useState<TopJob[]>([
    {
      id: '1',
      title: 'Retail Associate',
      company: 'Target',
      location: 'Jacksonville, FL',
      payRange: '$15-17/hr',
      type: 'Part-time',
      description: 'Help customers, stock shelves, and maintain store appearance.',
      requirements: ['Customer service skills', 'Flexible schedule', 'Team player'],
      openings: 8,
      isHiring: true,
      jobWebsiteUrl: 'https://corporate.target.com/careers/team-member-jobs'
    },
    {
      id: '2',
      title: 'Food Service Team Member',
      company: 'Chick-fil-A',
      location: 'Jacksonville, FL',
      payRange: '$14-16/hr',
      type: 'Part-time',
      description: 'Prepare food, serve customers, and maintain cleanliness.',
      requirements: ['Food safety knowledge', 'Positive attitude', 'Reliability'],
      openings: 12,
      isHiring: true,
      jobWebsiteUrl: 'https://www.chick-fil-a.com/careers'
    },
    {
      id: '3',
      title: 'Cashier',
      company: 'Publix',
      location: 'Jacksonville, FL',
      payRange: '$13-15/hr',
      type: 'Part-time',
      description: 'Process transactions, bag groceries, and assist customers.',
      requirements: ['Math skills', 'Communication', 'Attention to detail'],
      openings: 6,
      isHiring: true,
      jobWebsiteUrl: 'https://corporate.publix.com/careers'
    },
    {
      id: '4',
      title: 'Movie Theater Crew',
      company: 'AMC Theatres',
      location: 'Jacksonville, FL',
      payRange: '$12-14/hr',
      type: 'Part-time',
      description: 'Sell tickets, operate concessions, and clean theaters.',
      requirements: ['Weekend availability', 'Customer service', 'Physical stamina'],
      openings: 10,
      isHiring: true,
      jobWebsiteUrl: 'https://www.amctheatres.com/careers'
    },
    {
      id: '5',
      title: 'Lifeguard',
      company: 'City of Jacksonville',
      location: 'Jacksonville, FL',
      payRange: '$16-18/hr',
      type: 'Seasonal',
      description: 'Ensure swimmer safety and maintain pool areas.',
      requirements: ['Lifeguard certification', 'CPR certified', 'Strong swimmer'],
      openings: 15,
      isHiring: true,
      jobWebsiteUrl: 'https://www.coj.net/departments/human-resources/employment-opportunities'
    },
    {
      id: '6',
      title: 'Tutor Assistant',
      company: 'Kumon Learning Center',
      location: 'Jacksonville, FL',
      payRange: '$14-16/hr',
      type: 'Part-time',
      description: 'Help students with math and reading assignments.',
      requirements: ['Good grades', 'Patience', 'Communication skills'],
      openings: 4,
      isHiring: true,
      jobWebsiteUrl: 'https://www.kumon.com/careers'
    }
  ]);

  const UnauthenticatedView = () => (
    <div className="w-full py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/a051d480-e6ba-4e2e-8f5c-69229c03b3f9.png" 
              alt="Job Seekers 4 High Schools Logo" 
              className="h-8 w-8 object-contain"
            />
            <h2 className="text-3xl font-bold text-slate-800">
              Top Jobs for Teenagers in Jacksonville, FL
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span>55 total openings available now</span>
          </div>
        </div>

        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Sign In to View Job Opportunities
            </h3>
            <p className="text-muted-foreground mb-6">
              Create your free account to access direct links to company job applications and exclusive teen-friendly positions.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/signup">Create Free Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (!user) {
    return <UnauthenticatedView />;
  }

  return (
    <div className="w-full py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/lovable-uploads/a051d480-e6ba-4e2e-8f5c-69229c03b3f9.png" 
              alt="Job Seekers 4 High Schools Logo" 
              className="h-8 w-8 object-contain"
            />
            <h2 className="text-3xl font-bold text-slate-800">
              Top Jobs for Teenagers in Jacksonville, FL
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span>55 total openings available now</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entry-level positions perfect for high school students. No experience required for most positions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {topJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                    </div>
                    {job.isHiring && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Hiring Now
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {job.payRange}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {job.type}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {job.openings} openings
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-slate-700 mb-2">Key Requirements:</p>
                    <div className="flex flex-wrap gap-1">
                      {job.requirements.slice(0, 2).map((req, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {job.requirements.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.requirements.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <a 
                      href={job.jobWebsiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Apply on Company Website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600">
            <Link to="/jobs?zipCode=32207">
              View All Teen Jobs in Jacksonville
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopJobsSection;
