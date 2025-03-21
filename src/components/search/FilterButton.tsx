
import { useState, useRef, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchFilters from './SearchFilters';
import { JobType, ExperienceLevel } from '@/types/job';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();
  const [animating, setAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prevFiltersCount = useRef(appliedFiltersCount);

  // Handle filter count change animation
  useEffect(() => {
    if (appliedFiltersCount !== prevFiltersCount.current) {
      setAnimating(true);
      const timer = setTimeout(() => setAnimating(false), 300);
      prevFiltersCount.current = appliedFiltersCount;
      return () => clearTimeout(timer);
    }
  }, [appliedFiltersCount]);

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    if (appliedFiltersCount > 0) {
      toast({
        title: "Filters applied",
        description: `${appliedFiltersCount} filter${appliedFiltersCount !== 1 ? 's' : ''} applied to your search`,
        duration: 3000
      });
    }
  };

  const handleResetFilters = () => {
    resetFilters();
    toast({
      title: "Filters reset",
      description: "All filters have been cleared",
      duration: 3000
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFilterOpen(false);
    }
  };

  return (
    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          type="button"
          variant="outline"
          size={variant === 'minimal' ? "sm" : "default"}
          className={cn(
            "rounded-full relative transition-all duration-200",
            appliedFiltersCount > 0 ? "border-primary text-primary bg-primary/5 hover:bg-primary/10" : "hover:bg-secondary/80",
            animating && "scale-105"
          )}
          aria-label={`${isFilterOpen ? 'Close' : 'Open'} filter menu, ${appliedFiltersCount} filters active`}
          onKeyDown={handleKeyDown}
        >
          <span className="flex items-center gap-1.5">
            <Filter className="h-4 w-4" />
            {variant === 'default' && appliedFiltersCount > 0 && (
              <span className="text-sm">Filters</span>
            )}
          </span>

          {appliedFiltersCount > 0 && (
            <Badge 
              className={cn(
                "absolute -top-2 -right-2 h-5 min-w-5 p-0 flex items-center justify-center",
                "bg-primary text-primary-foreground",
                animating && "animate-pulse"
              )}
              aria-label={`${appliedFiltersCount} filters applied`}
            >
              {appliedFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-4 rounded-lg shadow-lg border-primary/20 bg-gradient-to-b from-white to-slate-50"
        align="end"
        side="bottom"
        sideOffset={8}
        alignOffset={8}
        onEscapeKeyDown={() => setIsFilterOpen(false)}
        onInteractOutside={() => setIsFilterOpen(false)}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium flex items-center gap-1.5">
            <Filter className="h-4 w-4 text-primary" />
            <span>Filters</span>
            {appliedFiltersCount > 0 && (
              <Badge 
                variant="outline" 
                className="ml-2 bg-primary/5 text-primary border-primary/20"
              >
                {appliedFiltersCount}
              </Badge>
            )}
          </h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => setIsFilterOpen(false)}
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto pr-1 -mr-1">
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
            onResetFilters={handleResetFilters}
            onApplyFilters={handleApplyFilters}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterButton;
