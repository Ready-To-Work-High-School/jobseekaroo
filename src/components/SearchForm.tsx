
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { JobType, ExperienceLevel } from '@/types/job';
import { toast } from '@/components/ui/use-toast';
import FilterButton from './search/FilterButton';
import RadiusSelector from './search/RadiusSelector';

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
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);

  useEffect(() => {
    // Initialize filters from URL params
    const jobTypeParam = searchParams.get('jobType') as JobType | 'all';
    const expLevelParam = searchParams.get('experienceLevel') as ExperienceLevel | 'all';
    const remoteParam = searchParams.has('remote') ? searchParams.get('remote') === 'true' : null;
    const flexibleParam = searchParams.has('flexible') ? searchParams.get('flexible') === 'true' : null;
    
    if (jobTypeParam) setJobType(jobTypeParam || 'all');
    if (expLevelParam) setExperienceLevel(expLevelParam || 'all');
    setIsRemote(remoteParam);
    setIsFlexible(flexibleParam);
    
    // Count applied filters
    let count = 0;
    if (jobTypeParam && jobTypeParam !== 'all') count++;
    if (expLevelParam && expLevelParam !== 'all') count++;
    if (remoteParam !== null) count++;
    if (flexibleParam !== null) count++;
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
    setAppliedFiltersCount(0);
    setIsFilterOpen(false);
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
