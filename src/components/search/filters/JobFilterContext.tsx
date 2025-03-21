
import { createContext, useContext, ReactNode } from 'react';
import { useJobFilterState } from './useJobFilterState';
import { JobFilterContextType } from './jobFilterTypes';

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
  // Use the extracted hook for all filter state logic
  const filterState = useJobFilterState(onFilterChange);
  
  return (
    <JobFilterContext.Provider value={filterState}>
      {children}
    </JobFilterContext.Provider>
  );
};
