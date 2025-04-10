
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building, MapPin, Clock, DollarSign, Award } from 'lucide-react';

// Sample job data for demonstration
const featuredJobs = [
  {
    id: 'job-1',
    title: 'Customer Service Representative',
    company: 'Retail Solutions Inc.',
    location: 'Jacksonville, FL',
    type: 'Part-time',
    payRate: '$15-18/hr',
    postedDate: '3 days ago',
    badges: ['Entry Level', 'Flexible Schedule'],
    logoUrl: '/lovable-uploads/6a344606-c844-465c-b643-7ff460697a49.png'
  },
  {
    id: 'job-2',
    title: 'Junior Web Developer',
    company: 'Tech Innovations',
    location: 'Remote',
    type: 'Full-time',
    payRate: '$22-25/hr',
    postedDate: '1 day ago',
    badges: ['Tech', 'Remote'],
    logoUrl: '/lovable-uploads/7a8cdc49-c423-4d1d-ba37-61d9420a1056.png'
  },
  {
    id: 'job-3',
    title: 'Administrative Assistant',
    company: 'Westside Medical Center',
    location: 'Jacksonville, FL',
    type: 'Part-time',
    payRate: '$16-19/hr',
    postedDate: '5 days ago',
    badges: ['Healthcare', 'Office Skills'],
    logoUrl: '/lovable-uploads/5bd40401-b911-4d3b-a1f2-3e1712199dbc.png'
  }
];

const EnhancedJobListings: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Featured Job Opportunities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover high-quality entry-level positions from trusted local employers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center mr-4 border">
                    <img 
                      src={job.logoUrl} 
                      alt={`${job.company} logo`} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">{job.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Building className="h-3.5 w-3.5 mr-1" />
                      <span>{job.company}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>{job.payRate}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.badges.map((badge, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50">
                      {badge}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-muted-foreground">
                    Posted {job.postedDate}
                  </div>
                  <Button asChild size="sm">
                    <Link to={`/job/${job.id}`} className="flex items-center gap-1">
                      <span>Apply Now</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/jobs" className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>View All Jobs</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedJobListings;
