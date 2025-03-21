
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { JobType, ExperienceLevel } from '@/types/job';
import { toast } from '@/components/ui/use-toast';

export function useJobFilterState(onFilterChange: (filters: any) => void) {
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
  
  // Sync with URL params on mount
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
    
    updateAppliedFilters(
      jobTypeParam, 
      expLevelParam, 
      remoteParam, 
      flexibleParam, 
      salaryMinParam, 
      salaryMaxParam, 
      postedWithinParam, 
      keywordParam
    );
  }, [searchParams]);
  
  // Update applied filters for badge display
  const updateAppliedFilters = (
    jobTypeParam: JobType | 'all' | null,
    expLevelParam: ExperienceLevel | 'all' | null,
    remoteParam: boolean | null,
    flexibleParam: boolean | null,
    salaryMinParam: string | null,
    salaryMaxParam: string | null,
    postedWithinParam: string | null,
    keywordParam: string
  ) => {
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
      const POST_DATE_OPTIONS = [
        { value: 1, label: 'Last 24 hours' },
        { value: 7, label: 'Last week' },
        { value: 14, label: 'Last 2 weeks' },
        { value: 30, label: 'Last month' },
        { value: 90, label: 'Last 3 months' },
      ];
      const dateOption = POST_DATE_OPTIONS.find(option => option.value.toString() === postedWithinParam);
      if (dateOption) {
        newAppliedFilters.push({ key: 'postedWithin', value: dateOption.label });
      }
    }
    
    if (keywordParam) {
      newAppliedFilters.push({ key: 'keyword', value: `"${keywordParam}"` });
    }
    
    setAppliedFilters(newAppliedFilters);
  };
  
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

  return {
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
  };
}
