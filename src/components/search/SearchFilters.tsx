
import { JobType, ExperienceLevel } from '@/types/job';
import JobTypeFilter from './filters/JobTypeFilter';
import ExperienceLevelFilter from './filters/ExperienceLevelFilter';
import JobFeaturesFilter from './filters/JobFeaturesFilter';
import SortByFilter from './filters/SortByFilter';
import FilterActions from './filters/FilterActions';

interface SearchFiltersProps {
  jobType: JobType | 'all';
  setJobType: (type: JobType | 'all') => void;
  experienceLevel: ExperienceLevel | 'all';
  setExperienceLevel: (level: ExperienceLevel | 'all') => void;
  isRemote: boolean | null;
  setIsRemote: (remote: boolean | null) => void;
  isFlexible: boolean | null;
  setIsFlexible: (flexible: boolean | null) => void;
  sortBy?: 'relevance' | 'date' | 'salary' | 'distance';
  setSortBy?: (sort: 'relevance' | 'date' | 'salary' | 'distance') => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
}

const SearchFilters = ({
  jobType,
  setJobType,
  experienceLevel,
  setExperienceLevel,
  isRemote,
  setIsRemote,
  isFlexible,
  setIsFlexible,
  sortBy,
  setSortBy,
  onResetFilters,
  onApplyFilters
}: SearchFiltersProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Advanced Filters</h3>
      
      <JobTypeFilter 
        jobType={jobType} 
        setJobType={setJobType} 
      />
      
      <ExperienceLevelFilter 
        experienceLevel={experienceLevel} 
        setExperienceLevel={setExperienceLevel} 
      />
      
      <JobFeaturesFilter 
        isRemote={isRemote} 
        setIsRemote={setIsRemote} 
        isFlexible={isFlexible} 
        setIsFlexible={setIsFlexible} 
      />
      
      {setSortBy && sortBy && (
        <SortByFilter 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
        />
      )}
      
      <FilterActions 
        onResetFilters={onResetFilters} 
        onApplyFilters={onApplyFilters} 
      />
    </div>
  );
};

export default SearchFilters;
