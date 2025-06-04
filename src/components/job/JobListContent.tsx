
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Briefcase } from 'lucide-react';
import JobPagination from './JobPagination';

interface Job {
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
  logo_url?: string;
  is_featured?: boolean;
  is_remote?: boolean;
  is_flexible?: boolean;
  description?: string;
  experience_level?: string;
}

interface JobListContentProps {
  jobs: Job[];
  loading: boolean;
  currentPage: number;
  jobsPerPage: number;
  zipCode: string;
  onResetFilters: () => void;
  onPageChange: (page: number) => void;
  renderJobCard: (job: Job) => React.ReactNode;
}

const JobListContent: React.FC<JobListContentProps> = ({
  jobs,
  loading,
  currentPage,
  jobsPerPage,
  zipCode,
  onResetFilters,
  onPageChange,
  renderJobCard
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Loading jobs...</h2>
        </div>
        {[1, 2, 3, 4, 5].map(i => (
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

  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Job Search Results</h2>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Jobs Found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {zipCode 
                ? `We couldn't find any job listings near ${zipCode}. Try adjusting your search criteria or location.`
                : "We couldn't find any job listings matching your criteria. Try adjusting your search filters."
              }
            </p>
            <Button onClick={onResetFilters} variant="outline">
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {jobs.length} Job{jobs.length !== 1 ? 's' : ''} Found
          {zipCode && ` near ${zipCode}`}
        </h2>
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, jobs.length)} of {jobs.length}
        </div>
      </div>

      <div className="space-y-4">
        {currentJobs.map((job) => {
          try {
            return renderJobCard(job);
          } catch (error) {
            console.error('Error rendering job card:', error);
            return (
              <Card key={job?.id || Math.random()} className="border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span>Error loading job details</span>
                  </div>
                </CardContent>
              </Card>
            );
          }
        })}
      </div>

      {totalPages > 1 && (
        <JobPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          jobsCount={jobs.length}
          currentPageStart={startIndex + 1}
          currentPageEnd={Math.min(endIndex, jobs.length)}
        />
      )}
    </div>
  );
};

export default JobListContent;
