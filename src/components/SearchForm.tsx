
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { MapPin, Filter, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { JobType, ExperienceLevel } from '@/types/job';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

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
  
  // New state for advanced filters
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
        
        {/* Advanced filters popover */}
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
            <div className="space-y-4">
              <h3 className="font-medium">Advanced Filters</h3>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Job Type</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    type="button" 
                    variant={jobType === 'all' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setJobType('all')}
                    className="justify-start"
                  >
                    <Briefcase className="mr-2 h-3.5 w-3.5" />
                    All Types
                  </Button>
                  <Button 
                    type="button" 
                    variant={jobType === 'part-time' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setJobType('part-time')}
                    className="justify-start"
                  >
                    <Briefcase className="mr-2 h-3.5 w-3.5" />
                    Part Time
                  </Button>
                  <Button 
                    type="button" 
                    variant={jobType === 'full-time' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setJobType('full-time')}
                    className="justify-start"
                  >
                    <Briefcase className="mr-2 h-3.5 w-3.5" />
                    Full Time
                  </Button>
                  <Button 
                    type="button" 
                    variant={jobType === 'internship' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setJobType('internship')}
                    className="justify-start"
                  >
                    <Briefcase className="mr-2 h-3.5 w-3.5" />
                    Internship
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Experience Level</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    type="button" 
                    variant={experienceLevel === 'all' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setExperienceLevel('all')}
                    className="justify-start"
                  >
                    All Levels
                  </Button>
                  <Button 
                    type="button" 
                    variant={experienceLevel === 'no-experience' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setExperienceLevel('no-experience')}
                    className="justify-start"
                  >
                    No Experience
                  </Button>
                  <Button 
                    type="button" 
                    variant={experienceLevel === 'entry-level' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setExperienceLevel('entry-level')}
                    className="justify-start"
                  >
                    Entry Level
                  </Button>
                  <Button 
                    type="button" 
                    variant={experienceLevel === 'some-experience' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setExperienceLevel('some-experience')}
                    className="justify-start"
                  >
                    Some Experience
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Job Features</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remote"
                      checked={isRemote === true}
                      onCheckedChange={(checked) => {
                        if (checked === 'indeterminate') return;
                        setIsRemote(checked ? true : null);
                      }}
                    />
                    <Label htmlFor="remote">Remote Work</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="flexible"
                      checked={isFlexible === true} 
                      onCheckedChange={(checked) => {
                        if (checked === 'indeterminate') return;
                        setIsFlexible(checked ? true : null);
                      }}
                    />
                    <Label htmlFor="flexible">Flexible Schedule</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
                <Button 
                  type="button" 
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
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
      
      <div className="mt-2 flex items-center">
        <button 
          type="button" 
          onClick={toggleRadius}
          className={cn(
            "text-xs bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full",
            "hover:bg-blue-200 transition-colors font-medium border border-blue-200"
          )}
        >
          {showRadius ? "Remove radius" : "Add radius filter"}
        </button>
        
        {showRadius && (
          <div className="flex-1 flex flex-col gap-1 px-2">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-xs flex items-center font-medium flex-1">
                <MapPin size={12} className="flex-shrink-0 mr-1.5" />
                <span className="mr-3">Search Radius:</span>
                <div className="flex-1 flex items-center gap-2">
                  <Slider
                    value={[radius]}
                    min={1}
                    max={50}
                    step={1}
                    onValueChange={(values) => setRadius(values[0])}
                    className="flex-1"
                  />
                  <span className="text-xs font-medium min-w-[45px] ml-2">
                    {radius} mile{radius !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
            <Progress value={(radius / 50) * 100} className="h-1" />
          </div>
        )}
      </div>
      
      {!isValid && (
        <p className="absolute -bottom-6 left-0 text-xs text-destructive">
          Please enter a valid 5-digit ZIP code
        </p>
      )}
    </form>
  );
};

export default SearchForm;
