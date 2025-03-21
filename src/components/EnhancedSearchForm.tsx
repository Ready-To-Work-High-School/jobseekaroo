
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { JobType, ExperienceLevel } from '@/types/job';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import LocationSelector from './LocationSelector';
import SavedSearches from './SavedSearches';
import { JobSearchFilters } from '@/lib/mock-data/search';
import { SavedSearch } from '@/types/user';
import FilterButton from './search/FilterButton';
import RadiusSelector from './search/RadiusSelector';

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
  const [searchParams] = useSearchParams();
  const [zipCode, setZipCode] = useState(initialZipCode);
  const [radius, setRadius] = useState(initialRadius);
  const [isValid, setIsValid] = useState(true);
  const [showRadius, setShowRadius] = useState(initialRadius > 0);
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Advanced filters state
  const [jobType, setJobType] = useState<JobType | 'all'>('all');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | 'all'>('all');
  const [isRemote, setIsRemote] = useState<boolean | null>(null);
  const [isFlexible, setIsFlexible] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'salary' | 'distance'>('relevance');
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);

  useEffect(() => {
    // Initialize filters from URL params
    const jobTypeParam = searchParams.get('jobType') as JobType | 'all';
    const expLevelParam = searchParams.get('experienceLevel') as ExperienceLevel | 'all';
    const remoteParam = searchParams.has('remote') ? searchParams.get('remote') === 'true' : null;
    const flexibleParam = searchParams.has('flexible') ? searchParams.get('flexible') === 'true' : null;
    const sortByParam = searchParams.get('sortBy') as 'relevance' | 'date' | 'salary' | 'distance' | null;
    
    if (jobTypeParam) setJobType(jobTypeParam || 'all');
    if (expLevelParam) setExperienceLevel(expLevelParam || 'all');
    setIsRemote(remoteParam);
    setIsFlexible(flexibleParam);
    if (sortByParam) setSortBy(sortByParam);
    
    // Count applied filters
    let count = 0;
    if (jobTypeParam && jobTypeParam !== 'all') count++;
    if (expLevelParam && expLevelParam !== 'all') count++;
    if (remoteParam !== null) count++;
    if (flexibleParam !== null) count++;
    if (sortByParam && sortByParam !== 'relevance') count++;
    setAppliedFiltersCount(count);
  }, [searchParams]);

  const validateZipCode = (zip: string) => {
    // Basic validation for US zip code (5 digits)
    return /^\d{5}$/.test(zip);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zipCode.trim()) {
      setIsValid(false);
      return;
    }
    
    const isZipValid = validateZipCode(zipCode);
    setIsValid(isZipValid);
    
    if (isZipValid) {
      const params = new URLSearchParams(searchParams);
      params.set('zipCode', zipCode);
      
      if (radius > 0) {
        params.set('radius', radius.toString());
      } else {
        params.delete('radius');
      }
      
      // Add advanced filters to URL
      if (jobType !== 'all') {
        params.set('jobType', jobType);
      } else {
        params.delete('jobType');
      }
      
      if (experienceLevel !== 'all') {
        params.set('experienceLevel', experienceLevel);
      } else {
        params.delete('experienceLevel');
      }
      
      if (isRemote !== null) {
        params.set('remote', isRemote.toString());
      } else {
        params.delete('remote');
      }
      
      if (isFlexible !== null) {
        params.set('flexible', isFlexible.toString());
      } else {
        params.delete('flexible');
      }
      
      if (sortBy !== 'relevance') {
        params.set('sortBy', sortBy);
      } else {
        params.delete('sortBy');
      }
      
      navigate(`/jobs?${params.toString()}`);
      toast({
        title: "Search updated",
        description: "Your job search has been updated with new filters"
      });
    }
  };

  const toggleRadius = () => {
    setShowRadius(!showRadius);
    if (!showRadius) {
      setRadius(10); // Default radius when toggled on
    } else {
      setRadius(0); // Reset radius when toggled off
    }
  };

  const resetFilters = () => {
    setJobType('all');
    setExperienceLevel('all');
    setIsRemote(null);
    setIsFlexible(null);
    setSortBy('relevance');
    setAppliedFiltersCount(0);
    setIsFilterOpen(false);
  };

  // Get current filters for saved searches
  const getCurrentFilters = (): JobSearchFilters => {
    return {
      type: jobType !== 'all' ? jobType : undefined,
      experienceLevel: experienceLevel !== 'all' ? experienceLevel : undefined,
      isRemote: isRemote !== null ? isRemote : undefined,
      isFlexible: isFlexible !== null ? isFlexible : undefined,
      sortBy: sortBy !== 'relevance' ? sortBy : undefined,
    };
  };

  const handleSavedSearchSelect = (search: SavedSearch) => {
    setZipCode(search.zipCode);
    setRadius(search.radius || 0);
    setShowRadius(!!search.radius);
    
    // Set other filters from the saved search
    if (search.filters.type) {
      setJobType(search.filters.type as JobType | 'all');
    }
    
    if (search.filters.experienceLevel) {
      setExperienceLevel(search.filters.experienceLevel as ExperienceLevel | 'all');
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
    
    // Automatically submit the form with the saved search parameters
    const isZipValid = validateZipCode(search.zipCode);
    if (isZipValid) {
      const params = new URLSearchParams();
      params.set('zipCode', search.zipCode);
      
      if (search.radius) {
        params.set('radius', search.radius.toString());
      }
      
      // Add other filters from the saved search
      Object.entries(search.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'object') {
            Object.entries(value).forEach(([subKey, subValue]) => {
              if (subValue !== undefined && subValue !== null) {
                params.set(`${key}.${subKey}`, subValue.toString());
              }
            });
          } else {
            params.set(key, value.toString());
          }
        }
      });
      
      navigate(`/jobs?${params.toString()}`);
      toast({
        title: "Saved search applied",
        description: "Your saved search has been applied"
      });
    }
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
