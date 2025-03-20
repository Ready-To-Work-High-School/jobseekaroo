
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import JobCard from '@/components/JobCard';
import FilterBar, { FilterState } from '@/components/FilterBar';
import SearchForm from '@/components/SearchForm';
import { searchJobsByZipCode } from '@/lib/mock-data';
import { Job, JobType, ExperienceLevel } from '@/types/job';
import { useFadeIn } from '@/utils/animations';

const JobListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const zipCodeParam = searchParams.get('zipCode') || '';
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const animation = useFadeIn(200);

  // Apply filters function
  const applyFilters = (filters: FilterState) => {
    setLoading(true);
    
    // Update search params
    const newParams = new URLSearchParams(searchParams);
    
    if (filters.jobType !== 'all') {
      newParams.set('jobType', filters.jobType);
    } else {
      newParams.delete('jobType');
    }
    
    if (filters.experienceLevel !== 'all') {
      newParams.set('experienceLevel', filters.experienceLevel);
    } else {
      newParams.delete('experienceLevel');
    }
    
    if (filters.isRemote !== null) {
      newParams.set('remote', filters.isRemote.toString());
    } else {
      newParams.delete('remote');
    }
    
    if (filters.isFlexible !== null) {
      newParams.set('flexible', filters.isFlexible.toString());
    } else {
      newParams.delete('flexible');
    }
    
    setSearchParams(newParams);
  };

  // Get filters from URL
  const getFiltersFromUrl = (): FilterState => {
    return {
      jobType: (searchParams.get('jobType') as JobType) || 'all',
      experienceLevel: (searchParams.get('experienceLevel') as ExperienceLevel) || 'all',
      isRemote: searchParams.has('remote') 
        ? searchParams.get('remote') === 'true' 
        : null,
      isFlexible: searchParams.has('flexible') 
        ? searchParams.get('flexible') === 'true' 
        : null,
    };
  };

  // Search for jobs
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filters = getFiltersFromUrl();
      const filterObj: Partial<Job> = {};
      
      if (filters.jobType !== 'all') {
        filterObj.type = filters.jobType;
      }
      
      if (filters.experienceLevel !== 'all') {
        filterObj.experienceLevel = filters.experienceLevel;
      }
      
      if (filters.isRemote !== null) {
        filterObj.isRemote = filters.isRemote;
      }
      
      if (filters.isFlexible !== null) {
        filterObj.isFlexible = filters.isFlexible;
      }
      
      const results = searchJobsByZipCode(zipCodeParam, filterObj);
      setJobs(results);
      setLoading(false);
    }, 800);
  }, [searchParams, zipCodeParam]);

  return (
    <Layout>
      <div className={`space-y-8 ${animation}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Jobs Near You</h1>
            <p className="text-muted-foreground">
              {zipCodeParam 
                ? `Showing jobs in ZIP code ${zipCodeParam}` 
                : "Search for jobs by entering your ZIP code"}
            </p>
          </div>
          
          <SearchForm 
            variant="minimal" 
            initialZipCode={zipCodeParam} 
            className="w-full md:w-auto"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <FilterBar 
              onFilterChange={applyFilters} 
              className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto"
            />
          </div>
          
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : jobs.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Showing {jobs.length} job{jobs.length !== 1 ? 's' : ''}
                </p>
                <div className="space-y-4">
                  {jobs.map((job, index) => (
                    <JobCard key={job.id} job={job} index={index} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 px-6 rounded-lg border border-border bg-white">
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
                  {zipCodeParam 
                    ? "We couldn't find any jobs matching your filters in this ZIP code." 
                    : "Please enter a ZIP code to search for jobs."}
                </p>
                {zipCodeParam && (
                  <button
                    onClick={() => {
                      setSearchParams(new URLSearchParams({ zipCode: zipCodeParam }));
                    }}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Reset filters and try again
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobListings;
