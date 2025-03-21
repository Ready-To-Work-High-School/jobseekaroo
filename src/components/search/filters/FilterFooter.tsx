
import { Button } from '@/components/ui/button';
import { Info, Filter } from 'lucide-react';
import { useJobFilter } from './JobFilterContext';

const FilterFooter = () => {
  const { applyFilters, appliedFilters } = useJobFilter();
  
  return (
    <>
      <Button 
        className="w-full mt-4 gap-2" 
        onClick={applyFilters}
      >
        <Filter className="h-4 w-4" />
        Apply Filters
        {appliedFilters.length > 0 && (
          <span className="ml-1 bg-white text-primary rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
            {appliedFilters.length}
          </span>
        )}
      </Button>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="h-3 w-3 flex-shrink-0 mt-0.5" />
          <p>
            Looking for more filters? Try the advanced search form at the top of the page.
          </p>
        </div>
      </div>
    </>
  );
};

export default FilterFooter;
