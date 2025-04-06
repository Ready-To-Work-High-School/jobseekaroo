
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '@/components/SearchForm';
import { searchJobsByZipCode, JobSearchFilters } from '@/lib/mock-data/search';
import { getAllJobs } from '@/lib/supabase';
import { syncMockJobsToSupabase } from '@/lib/mock-data/sync-jobs';
import { Job } from '@/types/job';
import { toast } from 'sonner';
import JobListingsLayout from '@/components/job/JobListingsLayout';
import JobFilterSidebar from '@/components/job/JobFilterSidebar';
import JobMobileFilters from '@/components/job/JobMobileFilters';
import JobListContent from '@/components/job/JobListContent';
import TopEmployersSection from '@/components/job/TopEmployersSection';

const JobListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const zipCodeParam = searchParams.get('zipCode') || '';
  const radiusParam = searchParams.get('radius') ? parseInt(searchParams.get('radius') || '0', 10) : 0;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncingData, setSyncingData] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const applyFilters = (filters: JobSearchFilters) => {
    setLoading(true);
    setCurrentPage(1);
    
    const searchFilters: JobSearchFilters = {
      ...filters,
      radius: radiusParam > 0 ? radiusParam : undefined
    };
    
    setTimeout(() => {
      const results = searchJobsByZipCode(zipCodeParam, searchFilters);
      setJobs(results);
      setLoading(false);
    }, 800);
  };

  const handleSyncMockData = async () => {
    setSyncingData(true);
    try {
      const success = await syncMockJobsToSupabase();
      if (success) {
        toast.success('Mock job data synchronized successfully');
        // Refresh job listings
        await fetchJobs();
      } else {
        toast.error('Failed to synchronize mock job data');
      }
    } catch (error) {
      console.error('Error syncing mock data:', error);
      toast.error('An error occurred while synchronizing mock data');
    } finally {
      setSyncingData(false);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const allJobs = await getAllJobs();
      
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
      
      let filteredJobs = allJobs;
      if (zipCodeParam) {
        filteredJobs = searchJobsByZipCode(zipCodeParam, searchFilters);
      }
      
      setJobs(filteredJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
      toast.error('Error loading jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchParams, zipCodeParam, radiusParam]);

  // Reset filters
  const resetFilters = () => {
    setSearchParams(new URLSearchParams({ zipCode: zipCodeParam }));
  };

  return (
    <>
      {/* Add the TopEmployersSection component before the JobListingsLayout */}
      <TopEmployersSection />
      
      <JobListingsLayout
        title="Find Jobs Near You"
        zipCode={zipCodeParam}
        radius={radiusParam}
        searchForm={
          <SearchForm 
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
            onSyncMockData={handleSyncMockData}
            syncingData={syncingData}
          />
          
          <JobMobileFilters
            showFilters={showMobileFilters}
            setShowFilters={setShowMobileFilters}
            onFilterChange={applyFilters}
            onSyncMockData={handleSyncMockData}
            syncingData={syncingData}
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
    </>
  );
};

export default JobListings;
