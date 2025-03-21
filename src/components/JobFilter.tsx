
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { jobTypes, experienceLevels } from '@/lib/mock-data/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { JobType, ExperienceLevel } from '@/types/job';
import { Briefcase, Clock, DollarSign, Info, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface JobFilterProps {
  className?: string;
  onFilterChange: (filters: any) => void;
}

// Mock salary ranges in $10k intervals
const SALARY_RANGES = [
  { min: 0, max: 20000, label: 'Under $20k' },
  { min: 20000, max: 30000, label: '$20k - $30k' },
  { min: 30000, max: 40000, label: '$30k - $40k' },
  { min: 40000, max: 50000, label: '$40k - $50k' },
  { min: 50000, max: 60000, label: '$50k - $60k' },
  { min: 60000, max: 70000, label: '$60k - $70k' },
  { min: 70000, max: 80000, label: '$70k - $80k' },
  { min: 80000, max: 90000, label: '$80k - $90k' },
  { min: 90000, max: 100000, label: '$90k - $100k' },
  { min: 100000, max: null, label: '$100k+' },
];

// Post date options
const POST_DATE_OPTIONS = [
  { value: 1, label: 'Last 24 hours' },
  { value: 7, label: 'Last week' },
  { value: 14, label: 'Last 2 weeks' },
  { value: 30, label: 'Last month' },
  { value: 90, label: 'Last 3 months' },
];

const JobFilter = ({ className, onFilterChange }: JobFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filter states
  const [jobType, setJobType] = useState<JobType | 'all'>('all');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | 'all'>('all');
  const [isRemote, setIsRemote] = useState<boolean | null>(null);
  const [isFlexible, setIsFlexible] = useState<boolean | null>(null);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100000]);
  const [postedWithin, setPostedWithin] = useState<number | null>(null);
  const [keyword, setKeyword] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<Array<{key: string, value: string}>>([]);
  
  // Initialize filters from URL
  useEffect(() => {
    const jobTypeParam = searchParams.get('jobType') as JobType | 'all';
    const expLevelParam = searchParams.get('experienceLevel') as ExperienceLevel | 'all';
    const remoteParam = searchParams.has('remote') ? searchParams.get('remote') === 'true' : null;
    const flexibleParam = searchParams.has('flexible') ? searchParams.get('flexible') === 'true' : null;
    const salaryMinParam = searchParams.get('salaryMin');
    const salaryMaxParam = searchParams.get('salaryMax');
    const postedWithinParam = searchParams.get('postedWithin');
    const keywordParam = searchParams.get('keyword') || '';
    
    if (jobTypeParam) setJobType(jobTypeParam);
    if (expLevelParam) setExperienceLevel(expLevelParam);
    setIsRemote(remoteParam);
    setIsFlexible(flexibleParam);
    
    if (salaryMinParam && salaryMaxParam) {
      setSalaryRange([parseInt(salaryMinParam), parseInt(salaryMaxParam)]);
    }
    
    if (postedWithinParam) {
      setPostedWithin(parseInt(postedWithinParam));
    }
    
    setKeyword(keywordParam);
    
    // Update applied filters for badge display
    const newAppliedFilters: Array<{key: string, value: string}> = [];
    
    if (jobTypeParam && jobTypeParam !== 'all') {
      newAppliedFilters.push({ 
        key: 'jobType', 
        value: jobTypeParam.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
      });
    }
    
    if (expLevelParam && expLevelParam !== 'all') {
      newAppliedFilters.push({ 
        key: 'experienceLevel', 
        value: expLevelParam.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
      });
    }
    
    if (remoteParam !== null) {
      newAppliedFilters.push({ key: 'remote', value: 'Remote' });
    }
    
    if (flexibleParam !== null) {
      newAppliedFilters.push({ key: 'flexible', value: 'Flexible Schedule' });
    }
    
    if (salaryMinParam && salaryMaxParam) {
      newAppliedFilters.push({ key: 'salary', value: `$${parseInt(salaryMinParam)/1000}k - $${parseInt(salaryMaxParam)/1000}k` });
    }
    
    if (postedWithinParam) {
      const dateOption = POST_DATE_OPTIONS.find(option => option.value.toString() === postedWithinParam);
      if (dateOption) {
        newAppliedFilters.push({ key: 'postedWithin', value: dateOption.label });
      }
    }
    
    if (keywordParam) {
      newAppliedFilters.push({ key: 'keyword', value: `"${keywordParam}"` });
    }
    
    setAppliedFilters(newAppliedFilters);
  }, [searchParams]);
  
  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    // Update URL params
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
    
    if (salaryRange[0] > 0 || salaryRange[1] < 100000) {
      params.set('salaryMin', salaryRange[0].toString());
      params.set('salaryMax', salaryRange[1].toString());
    } else {
      params.delete('salaryMin');
      params.delete('salaryMax');
    }
    
    if (postedWithin !== null) {
      params.set('postedWithin', postedWithin.toString());
    } else {
      params.delete('postedWithin');
    }
    
    if (keyword.trim()) {
      params.set('keyword', keyword.trim());
    } else {
      params.delete('keyword');
    }
    
    setSearchParams(params);
    
    // Call the parent filter change handler
    onFilterChange({
      type: jobType !== 'all' ? jobType : undefined,
      experienceLevel: experienceLevel !== 'all' ? experienceLevel : undefined,
      isRemote: isRemote !== null ? isRemote : undefined,
      isFlexible: isFlexible !== null ? isFlexible : undefined,
      salary: {
        min: salaryRange[0] > 0 ? salaryRange[0] : undefined,
        max: salaryRange[1] < 100000 ? salaryRange[1] : undefined,
      },
      keywords: keyword.trim() ? [keyword.trim()] : undefined,
      postedWithin: postedWithin !== null ? postedWithin : undefined,
    });
    
    toast({
      title: "Filters applied",
      description: "Job listings have been updated with your filters"
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setJobType('all');
    setExperienceLevel('all');
    setIsRemote(null);
    setIsFlexible(null);
    setSalaryRange([0, 100000]);
    setPostedWithin(null);
    setKeyword('');
    setAppliedFilters([]);
    
    // Reset URL params except for zipCode and radius
    const zipCode = searchParams.get('zipCode');
    const radius = searchParams.get('radius');
    const params = new URLSearchParams();
    
    if (zipCode) params.set('zipCode', zipCode);
    if (radius) params.set('radius', radius);
    
    setSearchParams(params);
    
    // Call the parent filter change handler with reset filters
    onFilterChange({});
    
    toast({
      title: "Filters reset",
      description: "All job filters have been reset"
    });
  };
  
  // Remove a single filter
  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams);
    
    params.delete(key);
    
    if (key === 'jobType') setJobType('all');
    if (key === 'experienceLevel') setExperienceLevel('all');
    if (key === 'remote') setIsRemote(null);
    if (key === 'flexible') setIsFlexible(null);
    if (key === 'salary' || key === 'salaryMin' || key === 'salaryMax') {
      setSalaryRange([0, 100000]);
      params.delete('salaryMin');
      params.delete('salaryMax');
    }
    if (key === 'postedWithin') setPostedWithin(null);
    if (key === 'keyword') setKeyword('');
    
    setSearchParams(params);
    
    // Update applied filters
    setAppliedFilters(prevFilters => prevFilters.filter(filter => filter.key !== key));
    
    // Call the parent filter change handler with updated filters
    onFilterChange({
      type: key !== 'jobType' && jobType !== 'all' ? jobType : undefined,
      experienceLevel: key !== 'experienceLevel' && experienceLevel !== 'all' ? experienceLevel : undefined,
      isRemote: key !== 'remote' && isRemote !== null ? isRemote : undefined,
      isFlexible: key !== 'flexible' && isFlexible !== null ? isFlexible : undefined,
      salary: key !== 'salary' && key !== 'salaryMin' && key !== 'salaryMax' ? {
        min: salaryRange[0] > 0 ? salaryRange[0] : undefined,
        max: salaryRange[1] < 100000 ? salaryRange[1] : undefined,
      } : undefined,
      keywords: key !== 'keyword' && keyword.trim() ? [keyword.trim()] : undefined,
      postedWithin: key !== 'postedWithin' && postedWithin !== null ? postedWithin : undefined,
    });
  };
  
  return (
    <div className={cn("rounded-lg bg-white border p-4 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          disabled={appliedFilters.length === 0}
        >
          Reset All
        </Button>
      </div>
      
      {/* Applied filters display */}
      {appliedFilters.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {appliedFilters.map((filter, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="px-2 py-1 rounded-md flex gap-1 items-center"
              >
                {filter.value}
                <button 
                  className="ml-1 text-muted-foreground hover:text-foreground" 
                  onClick={() => removeFilter(filter.key)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {/* Keyword search */}
      <div className="mb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search job titles, companies..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pr-10"
          />
          <Button 
            className="absolute right-1 top-1 h-6 w-6 p-0" 
            variant="ghost" 
            onClick={() => setKeyword('')}
            disabled={!keyword}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
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
            <div className="space-y-2 pt-1">
              <button
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
                  jobType === 'all'
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                )}
                onClick={() => setJobType('all')}
              >
                All Types
              </button>
              <button
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
                  jobType === 'full-time'
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                )}
                onClick={() => setJobType('full-time')}
              >
                Full Time
              </button>
              <button
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
                  jobType === 'part-time'
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                )}
                onClick={() => setJobType('part-time')}
              >
                Part Time
              </button>
              <button
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
                  jobType === 'internship'
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                )}
                onClick={() => setJobType('internship')}
              >
                Internship
              </button>
              <button
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
                  jobType === 'summer'
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                )}
                onClick={() => setJobType('summer')}
              >
                Summer
              </button>
              <button
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
                  jobType === 'weekend'
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                )}
                onClick={() => setJobType('weekend')}
              >
                Weekend
              </button>
            </div>
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
            <div className="space-y-2 pt-1">
              <button
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
                  experienceLevel === 'all'
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                )}
                onClick={() => setExperienceLevel('all')}
              >
                All Levels
              </button>
              <button
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
                  experienceLevel === 'no-experience'
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                )}
                onClick={() => setExperienceLevel('no-experience')}
              >
                No Experience
              </button>
              <button
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
                  experienceLevel === 'entry-level'
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                )}
                onClick={() => setExperienceLevel('entry-level')}
              >
                Entry Level
              </button>
              <button
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 focus-ring",
                  experienceLevel === 'some-experience'
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary"
                )}
                onClick={() => setExperienceLevel('some-experience')}
              >
                Some Experience
              </button>
            </div>
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
            <div className="space-y-3 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remote"
                  checked={isRemote === true}
                  onCheckedChange={(checked) => {
                    if (checked === 'indeterminate') return;
                    setIsRemote(checked ? true : null);
                  }}
                />
                <Label htmlFor="remote" className="text-sm">Remote Work</Label>
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
                <Label htmlFor="flexible" className="text-sm">Flexible Schedule</Label>
              </div>
            </div>
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
            <div className="space-y-3 pt-1">
              <div className="px-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">${salaryRange[0]/1000}k</span>
                  <span className="text-sm font-medium">${salaryRange[1]/1000}k+</span>
                </div>
                <Slider
                  defaultValue={[0, 100000]}
                  value={salaryRange}
                  min={0}
                  max={100000}
                  step={10000}
                  onValueChange={(values) => setSalaryRange([values[0], values[1]])}
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {SALARY_RANGES.map((range, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "text-xs justify-start",
                      salaryRange[0] === range.min && 
                      salaryRange[1] === (range.max || 100000) &&
                      "bg-primary/10 border-primary text-primary"
                    )}
                    onClick={() => setSalaryRange([range.min, range.max || 100000])}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
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
            <div className="space-y-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-full justify-start text-sm",
                  postedWithin === null && "bg-primary/10 border-primary text-primary"
                )}
                onClick={() => setPostedWithin(null)}
              >
                Any time
              </Button>
              {POST_DATE_OPTIONS.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-full justify-start text-sm",
                    postedWithin === option.value && "bg-primary/10 border-primary text-primary"
                  )}
                  onClick={() => setPostedWithin(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button 
        className="w-full mt-4" 
        onClick={applyFilters}
      >
        Apply Filters
      </Button>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="h-3 w-3 flex-shrink-0 mt-0.5" />
          <p>
            Looking for more filters? Try the advanced search form at the top of the page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
