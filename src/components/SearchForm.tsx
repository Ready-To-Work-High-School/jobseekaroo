
import { cn } from '@/lib/utils';
import FilterButton from './search/FilterButton';
import RadiusSelector from './search/RadiusSelector';
import { useJobSearch } from '@/hooks/useJobSearch';

interface SearchFormProps {
  className?: string;
  variant?: 'default' | 'minimal';
  initialZipCode?: string;
  initialRadius?: number;
}

const SearchForm = ({ 
  className, 
  variant = 'default',
  initialZipCode = '',
  initialRadius = 0
}: SearchFormProps) => {
  const {
    zipCode,
    setZipCode,
    radius,
    setRadius,
    isValid,
    showRadius,
    toggleRadius,
    isFilterOpen,
    setIsFilterOpen,
    jobType,
    setJobType,
    experienceLevel,
    setExperienceLevel,
    isRemote,
    setIsRemote,
    isFlexible,
    setIsFlexible,
    appliedFiltersCount,
    handleSubmit,
    resetFilters
  } = useJobSearch({ initialZipCode, initialRadius });

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "relative",
        variant === 'default' && "w-full max-w-md",
        variant === 'minimal' && "w-full max-w-xs",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter ZIP code"
            className={cn(
              "w-full pl-10 pr-20 py-3 rounded-full border focus-ring",
              "bg-white text-foreground placeholder:text-muted-foreground/60",
              "transition-all duration-200",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              variant === 'default' && "text-base",
              variant === 'minimal' && "text-sm py-2",
              !isValid && "border-destructive focus-visible:ring-destructive",
              isValid && zipCode ? "border-primary bg-blue-50/50" : ""
            )}
            aria-invalid={!isValid}
          />
        </div>
        
        <FilterButton
          variant={variant}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          appliedFiltersCount={appliedFiltersCount}
          jobType={jobType}
          setJobType={setJobType}
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
          isRemote={isRemote}
          setIsRemote={setIsRemote}
          isFlexible={isFlexible}
          setIsFlexible={setIsFlexible}
          resetFilters={resetFilters}
        />
        
        <button
          type="submit"
          className={cn(
            "rounded-full focus-ring",
            "text-white font-medium",
            "transition-all duration-200 hover:bg-primary/90",
            variant === 'default' ? (
              "bg-primary px-4 py-2"
            ) : (
              "bg-primary px-3 py-1 text-sm"
            )
          )}
        >
          {variant === 'default' ? 'Find Jobs' : 'Search'}
        </button>
      </div>
      
      <RadiusSelector
        showRadius={showRadius}
        toggleRadius={toggleRadius}
        radius={radius}
        setRadius={setRadius}
      />
      
      {!isValid && (
        <p className="absolute -bottom-6 left-0 text-xs text-destructive">
          Please enter a valid 5-digit ZIP code
        </p>
      )}
    </form>
  );
};

export default SearchForm;
