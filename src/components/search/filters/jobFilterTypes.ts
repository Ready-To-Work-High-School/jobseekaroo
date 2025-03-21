
import { JobType, ExperienceLevel } from '@/types/job';

export interface SalaryRange {
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
