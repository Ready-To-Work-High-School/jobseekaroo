
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchFilters from './SearchFilters';
import { JobType, ExperienceLevel } from '@/types/job';

interface FilterButtonProps {
  variant?: 'default' | 'minimal';
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  appliedFiltersCount: number;
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
  resetFilters: () => void;
}

const FilterButton = ({
  variant = 'default',
  isFilterOpen,
  setIsFilterOpen,
  appliedFiltersCount,
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
  resetFilters
}: FilterButtonProps) => {
  return (
    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size={variant === 'minimal' ? "sm" : "default"}
          className={cn(
            "rounded-full relative",
            appliedFiltersCount > 0 && "border-primary text-primary"
          )}
        >
          <Filter className="h-4 w-4" />
          {appliedFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
              {appliedFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <SearchFilters
          jobType={jobType}
          setJobType={setJobType}
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
          isRemote={isRemote}
          setIsRemote={setIsRemote}
          isFlexible={isFlexible}
          setIsFlexible={setIsFlexible}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onResetFilters={resetFilters}
          onApplyFilters={() => setIsFilterOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
