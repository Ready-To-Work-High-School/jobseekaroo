
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useFadeIn } from '@/utils/animations';

type Job = {
  id: string;
  title: string;
  company_name: string;
  location_city: string;
  location_state: string;
  job_type: string;
  pay_rate_min: number;
  pay_rate_max: number;
  pay_rate_period: string;
  posted_date: string;
};

const JobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fadeIn = useFadeIn(300);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulating API call with timeout
        setTimeout(() => {
          const sampleJobs = [
            {
              id: '1',
              title: 'Customer Service Representative',
              company_name: 'Retail Solutions Inc',
              location_city: 'Jacksonville',
              location_state: 'FL',
              job_type: 'part-time',
              pay_rate_min: 15,
              pay_rate_max: 18,
              pay_rate_period: 'hourly',
              posted_date: new Date().toISOString()
            },
            {
              id: '2',
              title: 'Restaurant Host/Hostess',
              company_name: 'Local Bistro',
              location_city: 'Jacksonville',
              location_state: 'FL',
              job_type: 'part-time',
              pay_rate_min: 14,
              pay_rate_max: 16,
              pay_rate_period: 'hourly',
              posted_date: new Date(Date.now() - 86400000).toISOString()
            },
            {
              id: '3',
              title: 'Retail Associate',
              company_name: 'Fashion Outlet',
              location_city: 'Jacksonville',
              location_state: 'FL',
              job_type: 'part-time',
              pay_rate_min: 15,
              pay_rate_max: 17,
              pay_rate_period: 'hourly',
              posted_date: new Date(Date.now() - 172800000).toISOString()
            },
            {
              id: '4',
              title: 'Teacher Assistant',
              company_name: 'Duval County Public Schools',
              location_city: 'Jacksonville',
              location_state: 'FL',
              job_type: 'part-time',
              pay_rate_min: 16,
              pay_rate_max: 20,
              pay_rate_period: 'hourly',
              posted_date: new Date(Date.now() - 259200000).toISOString()
            },
            {
              id: '5',
              title: 'Accounting Clerk',
              company_name: 'Financial Services LLC',
              location_city: 'Jacksonville',
              location_state: 'FL',
              job_type: 'part-time',
              pay_rate_min: 17,
              pay_rate_max: 22,
              pay_rate_period: 'hourly',
              posted_date: new Date(Date.now() - 345600000).toISOString()
            },
            {
              id: '6',
              title: 'Cashier',
              company_name: 'SuperMart',
              location_city: 'Jacksonville',
              location_state: 'FL',
              job_type: 'part-time',
              pay_rate_min: 14,
              pay_rate_max: 16,
              pay_rate_period: 'hourly',
              posted_date: new Date(Date.now() - 432000000).toISOString()
            }
          ];
          setJobs(sampleJobs);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs. Please try again.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div id="job-listings" className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
              </div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-36 mt-4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-red-600">Error Loading Jobs</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div id="job-listings" className={`space-y-4 ${fadeIn}`}>
      {jobs.length > 0 ? (
        jobs.map(job => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-muted-foreground mb-3">{job.company_name}</p>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location_city}, {job.location_state}
                </span>
                
                <span className="inline-flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {job.job_type.charAt(0).toUpperCase() + job.job_type.slice(1)}
                </span>
                
                <span className="inline-flex items-center text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-1" />
                  ${job.pay_rate_min}-${job.pay_rate_max}/{job.pay_rate_period === 'hourly' ? 'hr' : job.pay_rate_period}
                </span>
              </div>
              
              <Button asChild>
                <Link to={`/jobs/${job.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">No Jobs Found</h3>
            <p className="text-muted-foreground mb-4">We couldn't find any job listings matching your criteria.</p>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobListings;
