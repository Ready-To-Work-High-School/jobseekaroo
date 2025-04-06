
import React, { ReactNode } from 'react';
import JobFilter from '@/components/JobFilter';
import { JobSearchFilters } from '@/lib/mock-data/search';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

interface JobFilterSidebarProps {
  onFilterChange: (filters: JobSearchFilters) => void;
  className?: string;
  onSyncMockData?: () => void;
  syncingData?: boolean;
  extraContent?: ReactNode;
}

const JobFilterSidebar = ({ 
  onFilterChange, 
  className,
  onSyncMockData,
  syncingData = false,
  extraContent
}: JobFilterSidebarProps) => {
  const { user } = useAuth();
  
  return (
    <div className="hidden md:block md:col-span-1">
      <div className={`sticky top-24 space-y-4 w-full max-w-[280px] ${className}`}>
        <JobFilter 
          onFilterChange={onFilterChange} 
          className="max-h-[calc(100vh-180px)] overflow-y-auto w-full"
        />
        
        {user && onSyncMockData && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4" 
            onClick={onSyncMockData}
            disabled={syncingData}
          >
            <RefreshCcw className={`h-4 w-4 mr-2 ${syncingData ? 'animate-spin' : ''}`} />
            {syncingData ? 'Syncing...' : 'Sync Mock Data'}
          </Button>
        )}
        
        {extraContent}
      </div>
    </div>
  );
};

export default JobFilterSidebar;
