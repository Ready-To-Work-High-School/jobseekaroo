import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getFeaturedJobs } from '@/lib/mock-data/jobs';
import JobCard from '@/components/JobCard';
import FreemiumInfoCard from '@/components/employer/FreemiumInfoCard'; 
import { useSlideIn } from '@/utils/animations';
import { motion } from 'framer-motion';
import { Briefcase, FilterX } from 'lucide-react';

const EnhancedJobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, userProfile } = useAuth();
  const slideIn = useSlideIn(300, 'right');
  
  // If the user is an employer, show them the FreemiumInfoCard
  const isEmployer = userProfile?.user_type === 'employer';
  
  useEffect(() => {
    setTimeout(() => {
      setJobs(getFeaturedJobs());
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className={`py-12 px-4 ${slideIn}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            Latest Job Opportunities
          </h2>
          <Button asChild variant="outline" size="sm">
            <Link to="/jobs">Browse All Jobs</Link>
          </Button>
        </div>
        
        {/* Show FreemiumInfoCard for employers */}
        {isEmployer && <FreemiumInfoCard />}
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-6 h-64 animate-pulse">
                <div className="w-2/3 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-2">
                  <div className="w-full h-3 bg-gray-200 rounded"></div>
                  <div className="w-full h-3 bg-gray-200 rounded"></div>
                  <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <JobCard job={job} index={index} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FilterX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Jobs Found</h3>
                <p className="text-gray-500 mb-6">
                  We're updating our job listings. Check back soon or explore our featured opportunities.
                </p>
                <Button asChild>
                  <Link to="/jobs">Explore More Jobs</Link>
                </Button>
              </div>
            )}
          </>
        )}
        
        <div className="mt-8 text-center">
          <Button asChild size="lg">
            <Link to="/jobs" className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              View All Job Opportunities
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedJobListings;
