
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import LocationSelector from './LocationSelector';
import SavedSearches from './SavedSearches';
import { SavedSearch } from '@/types/user';
import FilterButton from './search/FilterButton';
import RadiusSelector from './search/RadiusSelector';
import { useJobSearch } from '@/hooks/useJobSearch';

interface EnhancedSearchFormProps {
  className?: string;
  variant?: 'default' | 'minimal';
  initialZipCode?: string;
  initialRadius?: number;
}

const EnhancedSearchForm = ({ 
  className, 
  variant = 'default',
  initialZipCode = '',
  initialRadius = 0
}: EnhancedSearchFormProps) => {
  const { user } = useAuth();
  
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
    sortBy,
    setSortBy,
    appliedFiltersCount,
    handleSubmit,
    resetFilters,
    getCurrentFilters
  } = useJobSearch({ initialZipCode, initialRadius });

  const handleSavedSearchSelect = (search: SavedSearch) => {
    setZipCode(search.zipCode);
    setRadius(search.radius || 0);
    
    // Set other filters from the saved search
    if (search.filters.type) {
      setJobType(search.filters.type);
    }
    
    if (search.filters.experienceLevel) {
      setExperienceLevel(search.filters.experienceLevel);
    }
    
    if (search.filters.isRemote !== undefined) {
      setIsRemote(search.filters.isRemote);
    }
    
    if (search.filters.isFlexible !== undefined) {
      setIsFlexible(search.filters.isFlexible);
    }
    
    if (search.filters.sortBy) {
      setSortBy(search.filters.sortBy as 'relevance' | 'date' | 'salary' | 'distance');
    }
    
    // Submit form with search parameters
    setTimeout(() => {
      handleSubmit(new Event('submit') as any);
      toast({
        title: "Saved search applied",
        description: "Your saved search has been applied"
      });
    }, 100);
  };

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
          <LocationSelector 
            value={zipCode} 
            onChange={setZipCode}
            className="w-full"
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
          sortBy={sortBy}
          setSortBy={setSortBy}
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
      
      {/* Saved Searches Component */}
      {variant === 'default' && (
        <SavedSearches
          userId={user?.id}
          zipCode={zipCode}
          radius={radius > 0 ? radius : undefined}
          filters={getCurrentFilters()}
          className="mt-4"
          onSelectSearch={handleSavedSearchSelect}
        />
      )}
      
      {!isValid && (
        <p className="absolute -bottom-6 left-0 text-xs text-destructive">
          Please enter a valid 5-digit ZIP code
        </p>
      )}
    </form>
  );
};

export default EnhancedSearchForm;
