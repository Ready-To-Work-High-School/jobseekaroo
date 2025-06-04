
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EnhancedSearchForm from '@/components/EnhancedSearchForm';
import { searchJobsByZipCode, JobSearchFilters } from '@/lib/mock-data/search';
import JobListingsLayout from '@/components/job/JobListingsLayout';
import JobFilterSidebar from '@/components/job/JobFilterSidebar';
import JobMobileFilters from '@/components/job/JobMobileFilters';
import JobListContent from '@/components/job/JobListContent';
import EnhancedJobCard from '@/components/job/EnhancedJobCard';
import { DatabaseJob, transformMockJobsToDatabase } from '@/lib/utils/jobTransform';

const EnhancedJobListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const zipCodeParam = searchParams.get('zipCode') || '';
  const radiusParam = searchParams.get('radius') ? parseInt(searchParams.get('radius') || '0', 10) : 0;
  const [jobs, setJobs] = useState<DatabaseJob[]>([]);
  const [loading, setLoading] = useState(true);
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
      const mockResults = searchJobsByZipCode(zipCodeParam, searchFilters);
      const transformedResults = transformMockJobsToDatabase(mockResults);
      setJobs(transformedResults);
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
      
      const jobTypeParam = searchParams.get('jobType');
      if (jobTypeParam) {
        searchFilters.type = jobTypeParam;
      }
      
      const expLevelParam = searchParams.get('experienceLevel');
      if (expLevelParam) {
        searchFilters.experienceLevel = expLevelParam;
      }
      
      if (searchParams.has('remote')) {
        searchFilters.isRemote = searchParams.get('remote') === 'true';
      }
      
      if (searchParams.has('flexible')) {
        searchFilters.isFlexible = searchParams.get('flexible') === 'true';
      }
      
      const salaryMinParam = searchParams.get('salaryMin');
      const salaryMaxParam = searchParams.get('salaryMax');
      if (salaryMinParam || salaryMaxParam) {
        searchFilters.salary = {};
        if (salaryMinParam) searchFilters.salary.min = parseInt(salaryMinParam);
        if (salaryMaxParam) searchFilters.salary.max = parseInt(salaryMaxParam);
      }
      
      const postedWithinParam = searchParams.get('postedWithin');
      if (postedWithinParam) {
        searchFilters.postedWithin = parseInt(postedWithinParam);
      }
      
      const keywordParam = searchParams.get('keyword');
      if (keywordParam) {
        searchFilters.keywords = [keywordParam];
      }
      
      const sortByParam = searchParams.get('sortBy') as 'relevance' | 'date' | 'salary' | 'distance' | null;
      if (sortByParam) {
        searchFilters.sortBy = sortByParam;
      }
      
      const mockResults = searchJobsByZipCode(zipCodeParam, searchFilters);
      const transformedResults = transformMockJobsToDatabase(mockResults);
      setJobs(transformedResults);
      setLoading(false);
    }, 800);
  }, [searchParams, zipCodeParam, radiusParam]);

  // Reset filters
  const resetFilters = () => {
    setSearchParams(new URLSearchParams({ zipCode: zipCodeParam }));
  };

  return (
    <JobListingsLayout
      title="Find Jobs Near You"
      zipCode={zipCodeParam}
      radius={radiusParam}
      searchForm={
        <EnhancedSearchForm 
          variant="minimal" 
          initialZipCode={zipCodeParam} 
          initialRadius={radiusParam}
          className="w-full md:w-auto"
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <JobFilterSidebar 
          onFilterChange={applyFilters}
          className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto"
        />
        
        <JobMobileFilters
          showFilters={showMobileFilters}
          setShowFilters={setShowMobileFilters}
          onFilterChange={applyFilters}
        />
        
        <div className="md:col-span-3">
          <JobListContent
            jobs={jobs}
            loading={loading}
            currentPage={currentPage}
            jobsPerPage={jobsPerPage}
            zipCode={zipCodeParam}
            onResetFilters={resetFilters}
            onPageChange={setCurrentPage}
            renderJobCard={(job) => (
              <EnhancedJobCard 
                key={job.id}
                job={job}
              />
            )}
          />
        </div>
      </div>
    </JobListingsLayout>
  );
};

export default EnhancedJobListings;
