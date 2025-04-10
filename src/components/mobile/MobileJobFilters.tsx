
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ArrowRight, ListFilter, CheckCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { JobSearchFilters } from '@/lib/mock-data/search';
import JobFilter from '@/components/JobFilter';

interface MobileJobFiltersProps {
  onFilterChange: (filters: JobSearchFilters) => void;
  appliedFiltersCount?: number;
  className?: string;
}

const MobileJobFilters = ({
  onFilterChange,
  appliedFiltersCount = 0,
  className
}: MobileJobFiltersProps) => {
  const [open, setOpen] = React.useState(false);
  
  const handleFilterApply = (filters: JobSearchFilters) => {
    onFilterChange(filters);
    setOpen(false);
  };
  
  return (
    <div className={className}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-between relative shadow-sm"
          >
            <div className="flex items-center gap-2">
              <ListFilter className="h-4 w-4" />
              <span>Filter Jobs</span>
            </div>
            {appliedFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-primary text-white">
                {appliedFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Job Filters</span>
              <Badge variant="outline" className="font-normal">
                {appliedFiltersCount} active
              </Badge>
            </SheetTitle>
            <SheetDescription>
              Tailor your job search to find the perfect match
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 overflow-y-auto max-h-[calc(85vh-110px)]">
            <JobFilter onFilterChange={handleFilterApply} className="border-0 shadow-none p-0" />
          </div>
          <div className="pt-3 pb-2 border-t sticky bottom-0 bg-white">
            <Button 
              className="w-full gap-2" 
              size="lg"
              onClick={() => setOpen(false)}
            >
              <span>View Results</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Tap above to see jobs matching your filters
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileJobFilters;
