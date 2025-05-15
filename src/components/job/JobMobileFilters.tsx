
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Filter as FilterIcon, RefreshCcw } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import JobFilter from '@/components/JobFilter';
import { JobSearchFilters } from '@/lib/mock-data/search';
import { useAuth } from '@/contexts/auth';

interface JobMobileFiltersProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  onFilterChange: (filters: JobSearchFilters) => void;
  onSyncMockData?: () => void;
  syncingData?: boolean;
  extraContent?: ReactNode;
}

const JobMobileFilters = ({
  showFilters,
  setShowFilters,
  onFilterChange,
  onSyncMockData,
  syncingData = false,
  extraContent
}: JobMobileFiltersProps) => {
  const { user } = useAuth();
  
  return (
    <div className="md:hidden mb-4">
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full gap-2">
            <FilterIcon className="h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85%] sm:w-[400px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Job Filters</SheetTitle>
            <SheetDescription>
              Refine your job search results
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <JobFilter 
              onFilterChange={(filters) => {
                onFilterChange(filters);
                setShowFilters(false);
              }}
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default JobMobileFilters;
