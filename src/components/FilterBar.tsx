
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { JobType, ExperienceLevel } from '@/types/job';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  jobType: JobType | 'all';
  experienceLevel: ExperienceLevel | 'all';
  isRemote: boolean | null;
  isFlexible: boolean | null;
}

const FilterBar = ({ onFilterChange, className }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    jobType: 'all',
    experienceLevel: 'all',
    isRemote: null,
    isFlexible: null,
  });

  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className={cn("p-5 rounded-xl border border-border bg-white", className)}>
      <h3 className="text-lg font-medium mb-4">Filter Results</h3>
      
      <div className="space-y-6">
        {/* Job Type Filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Job Type</h4>
          <div className="space-y-2">
            <FilterButton 
              label="All Types" 
              isActive={filters.jobType === 'all'} 
              onClick={() => handleFilterChange('jobType', 'all')} 
            />
            <FilterButton 
              label="Part Time" 
              isActive={filters.jobType === 'part-time'} 
              onClick={() => handleFilterChange('jobType', 'part-time')} 
            />
            <FilterButton 
              label="Full Time" 
              isActive={filters.jobType === 'full-time'} 
              onClick={() => handleFilterChange('jobType', 'full-time')} 
            />
            <FilterButton 
              label="Internship" 
              isActive={filters.jobType === 'internship'} 
              onClick={() => handleFilterChange('jobType', 'internship')} 
            />
            <FilterButton 
              label="Weekend" 
              isActive={filters.jobType === 'weekend'} 
              onClick={() => handleFilterChange('jobType', 'weekend')} 
            />
            <FilterButton 
              label="Summer" 
              isActive={filters.jobType === 'summer'} 
              onClick={() => handleFilterChange('jobType', 'summer')} 
            />
          </div>
        </div>
        
        {/* Experience Level Filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Experience Level</h4>
          <div className="space-y-2">
            <FilterButton 
              label="All Levels" 
              isActive={filters.experienceLevel === 'all'} 
              onClick={() => handleFilterChange('experienceLevel', 'all')} 
            />
            <FilterButton 
              label="No Experience" 
              isActive={filters.experienceLevel === 'no-experience'} 
              onClick={() => handleFilterChange('experienceLevel', 'no-experience')} 
            />
            <FilterButton 
              label="Entry Level" 
              isActive={filters.experienceLevel === 'entry-level'} 
              onClick={() => handleFilterChange('experienceLevel', 'entry-level')} 
            />
            <FilterButton 
              label="Some Experience" 
              isActive={filters.experienceLevel === 'some-experience'} 
              onClick={() => handleFilterChange('experienceLevel', 'some-experience')} 
            />
          </div>
        </div>
        
        {/* Job Features */}
        <div>
          <h4 className="text-sm font-medium mb-2">Job Features</h4>
          <div className="space-y-2">
            <ToggleButton 
              label="Remote" 
              value={filters.isRemote} 
              onChange={(val) => handleFilterChange('isRemote', val)} 
            />
            <ToggleButton 
              label="Flexible Schedule" 
              value={filters.isFlexible} 
              onChange={(val) => handleFilterChange('isFlexible', val)} 
            />
          </div>
        </div>
        
        {/* Reset Filters */}
        <button
          onClick={() => {
            const resetFilters = {
              jobType: 'all' as const,
              experienceLevel: 'all' as const,
              isRemote: null,
              isFlexible: null,
            };
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
          className="text-sm text-primary hover:text-primary/80 focus-ring"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton = ({ label, isActive, onClick }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
      isActive
        ? "bg-primary/10 text-primary font-medium"
        : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
    )}
  >
    {label}
  </button>
);

interface ToggleButtonProps {
  label: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
}

const ToggleButton = ({ label, value, onChange }: ToggleButtonProps) => {
  const handleClick = () => {
    // Cycle through: null -> true -> false -> null
    if (value === null) onChange(true);
    else if (value === true) onChange(false);
    else onChange(null);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
        value === true
          ? "bg-primary/10 text-primary font-medium"
          : value === false
          ? "bg-muted/50 text-foreground/40"
          : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
      )}
    >
      <span>{label}</span>
      <span>
        {value === null && "Any"}
        {value === true && "Yes"}
        {value === false && "No"}
      </span>
    </button>
  );
};

export default FilterBar;
