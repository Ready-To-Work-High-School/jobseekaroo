
import React from 'react';
import { Job } from '@/types/job';
import JobPagination from '@/components/job/JobPagination';
import JobCard from '@/components/JobCard';
import JobEmptyState from '@/components/job/JobEmptyState';
import JobLoadingState from '@/components/job/JobLoadingState';

interface JobListContentProps {
  jobs: Job[];
  loading: boolean;
  currentPage: number;
  jobsPerPage: number;
  zipCode?: string;
  onResetFilters: () => void;
  onPageChange: (pageNumber: number) => void;
}

const JobListContent = ({
  jobs,
  loading,
  currentPage,
  jobsPerPage,
  zipCode,
  onResetFilters,
  onPageChange
}: JobListContentProps) => {
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  
  if (loading) {
    return <JobLoadingState />;
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

export default JobListContent;
