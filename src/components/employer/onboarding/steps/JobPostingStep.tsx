
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, Star, Zap, Users, Clock } from 'lucide-react';

interface JobPostingStepProps {
  onComplete: (data: any) => void;
}

const JobPostingStep: React.FC<JobPostingStepProps> = ({ onComplete }) => {
  const jobTypes = [
    {
      title: "Part-Time Position",
      description: "Perfect for students balancing school and work",
      hours: "10-20 hours/week",
      icon: Clock,
      popular: true
    },
    {
      title: "Summer Internship",
      description: "Full-time summer opportunity for students",
      hours: "40 hours/week",
      icon: Star,
      popular: false
    },
    {
      title: "Entry-Level Role",
      description: "Great for recent graduates or motivated students",
      hours: "20-30 hours/week",
      icon: Users,
      popular: false
    }
  ];

  const benefits = [
    "Reach motivated high school students",
    "AI-powered candidate matching",
    "School partnership network",
    "Dedicated support team"
  ];

  const handleCreateJob = () => {
    // This would typically navigate to the job creation form
    onComplete({ jobPostingStarted: true });
  };

  const handleSkipForNow = () => {
    onComplete({ skippedJobPosting: true });
  };

  return (
    <Card>
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">Create Your First Job Posting</CardTitle>
            <CardDescription>
              Start attracting talented high school students to your company
            </CardDescription>
          </div>
        </motion.div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900">Why Post Now?</h4>
              <ul className="text-sm text-purple-700 mt-2 space-y-1">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Popular Job Types for High School Students</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobTypes.map((jobType, index) => {
              const IconComponent = jobType.icon;
              return (
                <motion.div
                  key={jobType.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                >
                  {jobType.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white">
                      Popular
                    </Badge>
                  )}
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{jobType.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{jobType.description}</p>
                      <Badge variant="outline" className="mt-2">
                        {jobType.hours}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-2">Ready to Get Started?</h4>
            <p className="text-sm text-gray-600 mb-4">
              Create your first job posting and start connecting with motivated students today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                size="lg" 
                onClick={handleCreateJob}
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create First Job
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleSkipForNow}
              >
                Skip for Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPostingStep;
