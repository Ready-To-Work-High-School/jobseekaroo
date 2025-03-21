
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { JobType, ExperienceLevel } from '@/types/job';
import { JobSearchFilters } from '@/lib/mock-data/search';

interface UseJobSearchProps {
  initialZipCode?: string;
  initialRadius?: number;
}

export const useJobSearch = ({ initialZipCode = '', initialRadius = 0 }: UseJobSearchProps) => {
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

  return {
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
  };
};
