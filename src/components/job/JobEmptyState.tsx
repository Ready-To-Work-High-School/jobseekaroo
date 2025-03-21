
import React from 'react';

interface JobEmptyStateProps {
  zipCode: string;
  onResetFilters: () => void;
}

const JobEmptyState = ({ zipCode, onResetFilters }: JobEmptyStateProps) => {
  return (
    <div className="text-center py-12 px-6 rounded-lg border border-border bg-white shadow-sm">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-medium mb-2">No jobs found</h3>
      <p className="text-muted-foreground mb-6">
        {zipCode 
          ? "We couldn't find any jobs matching your filters in this ZIP code." 
          : "Please enter a ZIP code to search for jobs."}
      </p>
      {zipCode && (
        <button
          onClick={onResetFilters}
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Reset filters and try again
        </button>
      )}
    </div>
  );
};

export default JobEmptyState;
