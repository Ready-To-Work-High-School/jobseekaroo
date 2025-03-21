
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Briefcase, Clock, DollarSign } from 'lucide-react';

// Import our refactored filter components
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
              <JobTypeFilter />
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
              <ExperienceLevelFilter />
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
              <JobFeaturesFilter />
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
