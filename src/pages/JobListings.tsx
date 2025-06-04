import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '@/components/SearchForm';
import { searchJobsByZipCode, JobSearchFilters } from '@/lib/mock-data/search';
import { getAllJobs } from '@/lib/supabase/jobs';
import { syncMockJobsToSupabase } from '@/lib/mock-data/sync-jobs';
import { toast } from 'sonner';
import JobListingsLayout from '@/components/job/JobListingsLayout';
import JobFilterSidebar from '@/components/job/JobFilterSidebar';
import MobileJobFilters from '@/components/mobile/MobileJobFilters';
import JobListContent from '@/components/job/JobListContent';
import TopEmployersSection from '@/components/job/TopEmployersSection';
import EnhancedJobCard from '@/components/job/EnhancedJobCard';
import { useIsMobile } from '@/hooks/use-mobile';

// Use the interface that matches the database structure
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

const JobListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const zipCodeParam = searchParams.get('zipCode') || '';
  const radiusParam = searchParams.get('radius') ? parseInt(searchParams.get('radius') || '0', 10) : 0;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncingData, setSyncingData] = useState(false);
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);
  const isMobile = useIsMobile();
  
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const applyFilters = (filters: JobSearchFilters) => {
    setLoading(true);
    setCurrentPage(1);
    
    const searchFilters: JobSearchFilters = {
      ...filters,
      radius: radiusParam > 0 ? radiusParam : undefined
    };
    
    let count = 0;
    if (filters.type && filters.type !== 'all') count++;
    if (filters.experienceLevel && filters.experienceLevel !== 'all') count++;
    if (filters.isRemote !== null) count++;
    if (filters.isFlexible !== null) count++;
    if (filters.salary) count++;
    if (filters.postedWithin) count++;
    if (filters.keywords && filters.keywords.length > 0) count++;
    setAppliedFiltersCount(count);
    
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
      
      let count = 0;
      if (jobTypeParam && jobTypeParam !== 'all') count++;
      if (expLevelParam && expLevelParam !== 'all') count++;
      if (searchParams.has('remote')) count++;
      if (searchParams.has('flexible')) count++;
      if (salaryMinParam || salaryMaxParam) count++;
      if (postedWithinParam) count++;
      if (keywordParam) count++;
      setAppliedFiltersCount(count);
      
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

  const resetFilters = () => {
    setSearchParams(new URLSearchParams({ zipCode: zipCodeParam }));
    setAppliedFiltersCount(0);
  };

  return (
    <>
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
        {isMobile && (
          <div className="sticky top-0 z-30 bg-background pt-4 pb-3 -mx-4 px-4 border-b">
            <MobileJobFilters 
              onFilterChange={applyFilters} 
              appliedFiltersCount={appliedFiltersCount}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <JobFilterSidebar 
            onFilterChange={applyFilters}
            onSyncMockData={handleSyncMockData}
            syncingData={syncingData}
            className="hidden md:block"
          />
          
          <div className="md:col-span-3" id="job-listings">
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
                  size={isMobile ? 'compact' : 'default'}
                  className={isMobile ? "job-card-mobile" : ""}
                />
              )}
            />
          </div>
        </div>
      </JobListingsLayout>
    </>
  );
};

export default JobListings;
