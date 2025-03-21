
import { createContext, useContext, useState, ReactNode } from 'react';
import { JobType, ExperienceLevel } from '@/types/job';
import { useSearchParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface SalaryRange {
  min: number;
  max: number;
}

export interface JobFilterContextType {
  jobType: JobType | 'all';
  setJobType: (type: JobType | 'all') => void;
  experienceLevel: ExperienceLevel | 'all';
  setExperienceLevel: (level: ExperienceLevel | 'all') => void;
  isRemote: boolean | null;
  setIsRemote: (remote: boolean | null) => void;
  isFlexible: boolean | null;
  setIsFlexible: (flexible: boolean | null) => void;
  salaryRange: [number, number];
  setSalaryRange: (range: [number, number]) => void;
  postedWithin: number | null;
  setPostedWithin: (days: number | null) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
  appliedFilters: Array<{key: string, value: string}>;
  setAppliedFilters: (filters: Array<{key: string, value: string}>) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  removeFilter: (key: string) => void;
}

const JobFilterContext = createContext<JobFilterContextType | null>(null);

export const useJobFilter = () => {
  const context = useContext(JobFilterContext);
  if (!context) {
    throw new Error('useJobFilter must be used within a JobFilterProvider');
  }
  return context;
};

interface JobFilterProviderProps {
  children: ReactNode;
  onFilterChange: (filters: any) => void;
}

export const JobFilterProvider = ({ children, onFilterChange }: JobFilterProviderProps) => {
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
    <JobFilterContext.Provider value={{
      jobType,
      setJobType,
      experienceLevel,
      setExperienceLevel,
      isRemote,
      setIsRemote,
      isFlexible,
      setIsFlexible,
      salaryRange,
      setSalaryRange,
      postedWithin,
      setPostedWithin,
      keyword,
      setKeyword,
      appliedFilters,
      setAppliedFilters,
      applyFilters,
      resetFilters,
      removeFilter
    }}>
      {children}
    </JobFilterContext.Provider>
  );
};
