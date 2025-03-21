
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import JobCard from '@/components/JobCard';
import FilterBar, { FilterState } from '@/components/FilterBar';
import SearchForm from '@/components/SearchForm';
import { searchJobsByZipCode } from '@/lib/mock-data';
import { Job, JobType, ExperienceLevel } from '@/types/job';
import { useFadeIn } from '@/utils/animations';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { MapPin } from 'lucide-react';

const JobListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const zipCodeParam = searchParams.get('zipCode') || '';
  const radiusParam = searchParams.get('radius') ? parseInt(searchParams.get('radius') || '0', 10) : 0;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const animation = useFadeIn(200);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Apply filters function
  const applyFilters = (filters: FilterState) => {
    setLoading(true);
    setCurrentPage(1); // Reset to first page when filters change
    
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
      const filterObj: Partial<Job> & { radius?: number } = {};
      
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
      
      // Add radius filter if present
      if (radiusParam > 0) {
        filterObj.radius = radiusParam;
      }
      
      const results = searchJobsByZipCode(zipCodeParam, filterObj);
      setJobs(results);
      setLoading(false);
    }, 800);
  }, [searchParams, zipCodeParam, radiusParam]);

  // Get current jobs for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className={`space-y-8 ${animation}`}>
        <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Find Jobs Near You</h1>
              <div className="flex items-center text-muted-foreground">
                {zipCodeParam && (
                  <>
                    <MapPin className="h-4 w-4 mr-1 text-primary" />
                    <p>
                      Jobs in ZIP code <span className="font-medium">{zipCodeParam}</span>
                      {radiusParam > 0 && (
                        <span> within <span className="font-medium">{radiusParam} mile{radiusParam !== 1 ? 's' : ''}</span></span>
                      )}
                    </p>
                  </>
                )}
                {!zipCodeParam && (
                  <p>Search for jobs by entering your ZIP code</p>
                )}
              </div>
            </div>
            
            <SearchForm 
              variant="minimal" 
              initialZipCode={zipCodeParam} 
              initialRadius={radiusParam}
              className="w-full md:w-auto"
            />
          </div>
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
                <div className="bg-white p-4 rounded-lg border border-border shadow-sm">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Found <span className="font-medium text-foreground">{jobs.length}</span> job{jobs.length !== 1 ? 's' : ''}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Showing {indexOfFirstJob + 1} to {Math.min(indexOfLastJob, jobs.length)} of {jobs.length}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {currentJobs.map((job, index) => (
                    <div key={job.id} className="bg-white rounded-lg border border-border shadow-sm p-4 hover:border-primary/30 transition-all duration-200">
                      <JobCard job={job} index={index} />
                    </div>
                  ))}
                </div>
                
                {jobs.length > jobsPerPage && (
                  <div className="py-4">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
                          </PaginationItem>
                        )}
                        
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink 
                              isActive={currentPage === index + 1} 
                              onClick={() => paginate(index + 1)}>
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext onClick={() => paginate(currentPage + 1)} />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            ) : (
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
