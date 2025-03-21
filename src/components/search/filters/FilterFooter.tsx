
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useJobFilter } from './JobFilterContext';

const FilterFooter = () => {
  const { applyFilters } = useJobFilter();
  
  return (
    <>
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
    </>
  );
};

export default FilterFooter;
