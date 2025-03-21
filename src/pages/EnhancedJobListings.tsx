
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EnhancedSearchForm from '@/components/EnhancedSearchForm';
import { searchJobsByZipCode, JobSearchFilters } from '@/lib/mock-data/search';
import { Job } from '@/types/job';
import JobListingsLayout from '@/components/job/JobListingsLayout';
import JobFilterSidebar from '@/components/job/JobFilterSidebar';
import JobMobileFilters from '@/components/job/JobMobileFilters';
import JobListContent from '@/components/job/JobListContent';

const EnhancedJobListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const zipCodeParam = searchParams.get('zipCode') || '';
  const radiusParam = searchParams.get('radius') ? parseInt(searchParams.get('radius') || '0', 10) : 0;
  const [jobs, setJobs] = useState<Job[]>([]);
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
          />
        </div>
      </div>
    </JobListingsLayout>
  );
};

export default EnhancedJobListings;
