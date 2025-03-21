
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import JobCard from '@/components/JobCard';
import EnhancedSearchForm from '@/components/EnhancedSearchForm';
import JobFilter from '@/components/JobFilter';
import { searchJobsByZipCode, JobSearchFilters } from '@/lib/mock-data/search';
import { Job } from '@/types/job';
import { useFadeIn } from '@/utils/animations';
import { MapPin, Filter as FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from '@/contexts/AuthContext';
import JobPagination from '@/components/job/JobPagination';
import JobEmptyState from '@/components/job/JobEmptyState';
import JobLoadingState from '@/components/job/JobLoadingState';

const EnhancedJobListings = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const zipCodeParam = searchParams.get('zipCode') || '';
  const radiusParam = searchParams.get('radius') ? parseInt(searchParams.get('radius') || '0', 10) : 0;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const animation = useFadeIn(200);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Apply filters function
  const applyFilters = (filters: JobSearchFilters) => {
    setLoading(true);
    setCurrentPage(1); // Reset to first page when filters change
    
    // Search for jobs with the provided filters
    const searchFilters: JobSearchFilters = {
      ...filters,
      radius: radiusParam > 0 ? radiusParam : undefined
    };
    
    // Simulate API call
    setTimeout(() => {
      const results = searchJobsByZipCode(zipCodeParam, searchFilters);
      setJobs(results);
      setLoading(false);
    }, 800);
  };

  // Search for jobs based on URL params
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const searchFilters: JobSearchFilters = {
        radius: radiusParam > 0 ? radiusParam : undefined
      };
      
      // Get job type filter
      const jobTypeParam = searchParams.get('jobType');
      if (jobTypeParam) {
        searchFilters.type = jobTypeParam;
      }
      
      // Get experience level filter
      const expLevelParam = searchParams.get('experienceLevel');
      if (expLevelParam) {
        searchFilters.experienceLevel = expLevelParam;
      }
      
      // Get remote work filter
      if (searchParams.has('remote')) {
        searchFilters.isRemote = searchParams.get('remote') === 'true';
      }
      
      // Get flexible schedule filter
      if (searchParams.has('flexible')) {
        searchFilters.isFlexible = searchParams.get('flexible') === 'true';
      }
      
      // Get salary range filter
      const salaryMinParam = searchParams.get('salaryMin');
      const salaryMaxParam = searchParams.get('salaryMax');
      if (salaryMinParam || salaryMaxParam) {
        searchFilters.salary = {};
        if (salaryMinParam) searchFilters.salary.min = parseInt(salaryMinParam);
        if (salaryMaxParam) searchFilters.salary.max = parseInt(salaryMaxParam);
      }
      
      // Get posted within filter
      const postedWithinParam = searchParams.get('postedWithin');
      if (postedWithinParam) {
        searchFilters.postedWithin = parseInt(postedWithinParam);
      }
      
      // Get keyword filter
      const keywordParam = searchParams.get('keyword');
      if (keywordParam) {
        searchFilters.keywords = [keywordParam];
      }
      
      // Get sort option
      const sortByParam = searchParams.get('sortBy') as 'relevance' | 'date' | 'salary' | 'distance' | null;
      if (sortByParam) {
        searchFilters.sortBy = sortByParam;
      }
      
      const results = searchJobsByZipCode(zipCodeParam, searchFilters);
      setJobs(results);
      setLoading(false);
    }, 800);
  }, [searchParams, zipCodeParam, radiusParam]);

  // Get current jobs for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Reset filters
  const resetFilters = () => {
    setSearchParams(new URLSearchParams({ zipCode: zipCodeParam }));
  };

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
            
            <EnhancedSearchForm 
              variant="minimal" 
              initialZipCode={zipCodeParam} 
              initialRadius={radiusParam}
              className="w-full md:w-auto"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Desktop Filters */}
          <div className="hidden md:block md:col-span-1">
            <JobFilter 
              onFilterChange={applyFilters} 
              className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto"
            />
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full gap-2">
                  <FilterIcon className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] sm:w-[400px] p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle>Job Filters</SheetTitle>
                  <SheetDescription>
                    Refine your job search results
                  </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                  <JobFilter 
                    onFilterChange={(filters) => {
                      applyFilters(filters);
                      setShowMobileFilters(false);
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="md:col-span-3">
            {loading ? (
              <JobLoadingState />
            ) : jobs.length > 0 ? (
              <div className="space-y-4">
                <JobPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
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
                      onPageChange={setCurrentPage}
                      jobsCount={jobs.length}
                      currentPageStart={indexOfFirstJob + 1}
                      currentPageEnd={Math.min(indexOfLastJob, jobs.length)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <JobEmptyState zipCode={zipCodeParam} onResetFilters={resetFilters} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EnhancedJobListings;
