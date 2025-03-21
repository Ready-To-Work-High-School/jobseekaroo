
import React from 'react';
import { Job } from '@/types/job';
import JobPagination from '@/components/job/JobPagination';
import JobCard from '@/components/JobCard';
import JobEmptyState from '@/components/job/JobEmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface JobListContentProps {
  jobs: Job[];
  loading: boolean;
  error?: string | null;
  currentPage: number;
  jobsPerPage: number;
  zipCode?: string;
  onResetFilters: () => void;
  onPageChange: (pageNumber: number) => void;
  onRetry?: () => void;
}

const JobListContent = ({
  jobs,
  loading,
  error,
  currentPage,
  jobsPerPage,
  zipCode,
  onResetFilters,
  onPageChange,
  onRetry
}: JobListContentProps) => {
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  
  if (loading) {
    return <LoadingSpinner size="large" className="min-h-[300px] flex items-center justify-center" />;
  }
  
  if (error) {
    return (
      <div className="space-y-4">
        <ErrorMessage message={error} />
        {onRetry && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={onRetry}>
              Try Again
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  if (jobs.length === 0) {
    return <JobEmptyState zipCode={zipCode} onResetFilters={onResetFilters} />;
  }
  
  return (
    <div className="space-y-4">
      <JobPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        jobsCount={jobs.length}
        currentPageStart={indexOfFirstJob + 1}
        currentPageEnd={Math.min(indexOfLastJob, jobs.length)}
      />
      
      <div className="space-y-4">
        {currentJobs.map((job, index) => (
          <div key={job.id} className="bg-white rounded-lg border border-border shadow-sm p-4 hover:border-primary/30 transition-all duration-200">
            <JobCard job={job} index={index} />
          </div>
        ))}
      </div>
      
      {jobs.length > jobsPerPage && (
        <div className="py-4">
          <JobPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            jobsCount={jobs.length}
            currentPageStart={indexOfFirstJob + 1}
            currentPageEnd={Math.min(indexOfLastJob, jobs.length)}
          />
        </div>
      )}
    </div>
  );
};

// We need to import Button that we're using
import { Button } from '@/components/ui/button';

export default JobListContent;
