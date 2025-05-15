
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { JobType, ExperienceLevel } from '@/types/job';
import { Briefcase, Clock, DollarSign } from 'lucide-react';

// Import our new filter components
import { JobFilterProvider } from '@/components/search/filters/JobFilterContext';
import FilterHeader from '@/components/search/filters/FilterHeader';
import AppliedFilters from '@/components/search/filters/AppliedFilters';
import KeywordFilter from '@/components/search/filters/KeywordFilter';
import JobTypeFilter from '@/components/search/filters/JobTypeFilter';
import ExperienceLevelFilter from '@/components/search/filters/ExperienceLevelFilter';
import JobFeaturesFilter from '@/components/search/filters/JobFeaturesFilter';
import SalaryRangeFilter from '@/components/search/filters/SalaryRangeFilter';
import DatePostedFilter from '@/components/search/filters/DatePostedFilter';
import FilterFooter from '@/components/search/filters/FilterFooter';

interface JobFilterProps {
  className?: string;
  onFilterChange: (filters: any) => void;
}

const JobFilter = ({ className, onFilterChange }: JobFilterProps) => {
  const [searchParams] = useSearchParams();
  
  // Filter states
  const [jobType, setJobType] = useState<JobType | 'all'>('all');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | 'all'>('all');
  const [isRemote, setIsRemote] = useState<boolean | null>(null);
  const [isFlexible, setIsFlexible] = useState<boolean | null>(null);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100000]);
  const [postedWithin, setPostedWithin] = useState<number | null>(null);
  const [keyword, setKeyword] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<Array<{key: string, value: string}>>([]);
  
  // Initialize filters from URL
  useEffect(() => {
    const jobTypeParam = searchParams.get('jobType') as JobType | 'all';
    const expLevelParam = searchParams.get('experienceLevel') as ExperienceLevel | 'all';
    const remoteParam = searchParams.has('remote') ? searchParams.get('remote') === 'true' : null;
    const flexibleParam = searchParams.has('flexible') ? searchParams.get('flexible') === 'true' : null;
    const salaryMinParam = searchParams.get('salaryMin');
    const salaryMaxParam = searchParams.get('salaryMax');
    const postedWithinParam = searchParams.get('postedWithin');
    const keywordParam = searchParams.get('keyword') || '';
    
    if (jobTypeParam) setJobType(jobTypeParam);
    if (expLevelParam) setExperienceLevel(expLevelParam);
    setIsRemote(remoteParam);
    setIsFlexible(flexibleParam);
    
    if (salaryMinParam && salaryMaxParam) {
      setSalaryRange([parseInt(salaryMinParam), parseInt(salaryMaxParam)]);
    }
    
    if (postedWithinParam) {
      setPostedWithin(parseInt(postedWithinParam));
    }
    
    setKeyword(keywordParam);
    
    // Update applied filters for badge display
    const newAppliedFilters: Array<{key: string, value: string}> = [];
    
    if (jobTypeParam && jobTypeParam !== 'all') {
      newAppliedFilters.push({ 
        key: 'jobType', 
        value: jobTypeParam.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
      });
    }
    
    if (expLevelParam && expLevelParam !== 'all') {
      newAppliedFilters.push({ 
        key: 'experienceLevel', 
        value: expLevelParam.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
      });
    }
    
    if (remoteParam !== null) {
      newAppliedFilters.push({ key: 'remote', value: 'Remote' });
    }
    
    if (flexibleParam !== null) {
      newAppliedFilters.push({ key: 'flexible', value: 'Flexible Schedule' });
    }
    
    if (salaryMinParam && salaryMaxParam) {
      newAppliedFilters.push({ key: 'salary', value: `$${parseInt(salaryMinParam)/1000}k - $${parseInt(salaryMaxParam)/1000}k` });
    }
    
    if (postedWithinParam) {
      const POST_DATE_OPTIONS = [
        { value: 1, label: 'Last 24 hours' },
        { value: 7, label: 'Last week' },
        { value: 14, label: 'Last 2 weeks' },
        { value: 30, label: 'Last month' },
        { value: 90, label: 'Last 3 months' },
      ];
      const dateOption = POST_DATE_OPTIONS.find(option => option.value.toString() === postedWithinParam);
      if (dateOption) {
        newAppliedFilters.push({ key: 'postedWithin', value: dateOption.label });
      }
    }
    
    if (keywordParam) {
      newAppliedFilters.push({ key: 'keyword', value: `"${keywordParam}"` });
    }
    
    setAppliedFilters(newAppliedFilters);
  }, [searchParams]);
  
  return (
    <JobFilterProvider onFilterChange={onFilterChange}>
      <div className={cn("rounded-lg bg-white border p-4 shadow-sm", className)}>
        <FilterHeader title="Filters" />
        
        <AppliedFilters className="mb-4" />
        
        <KeywordFilter />
        
        <Accordion type="multiple" defaultValue={['job-type', 'experience', 'features']}>
          {/* Job Type Filter */}
          <AccordionItem value="job-type">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Job Type
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <JobTypeFilter 
                jobType={jobType} 
                setJobType={setJobType} 
              />
            </AccordionContent>
          </AccordionItem>
          
          {/* Experience Level Filter */}
          <AccordionItem value="experience">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center">
                <div className="h-4 w-4 mr-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                Experience Level
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ExperienceLevelFilter 
                experienceLevel={experienceLevel} 
                setExperienceLevel={setExperienceLevel} 
              />
            </AccordionContent>
          </AccordionItem>
          
          {/* Job Features */}
          <AccordionItem value="features">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center">
                <div className="h-4 w-4 mr-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m8 12 3 3 5-5" />
                  </svg>
                </div>
                Job Features
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <JobFeaturesFilter 
                isRemote={isRemote} 
                setIsRemote={setIsRemote}
                isFlexible={isFlexible}
                setIsFlexible={setIsFlexible}
              />
            </AccordionContent>
          </AccordionItem>
          
          {/* Salary Range */}
          <AccordionItem value="salary">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Salary Range
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <SalaryRangeFilter />
            </AccordionContent>
          </AccordionItem>
          
          {/* Date Posted */}
          <AccordionItem value="date-posted">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Date Posted
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <DatePostedFilter />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <FilterFooter />
      </div>
    </JobFilterProvider>
  );
};

export default JobFilter;
