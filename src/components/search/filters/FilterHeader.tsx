
import { Button } from '@/components/ui/button';
import { useJobFilter } from './JobFilterContext';
import { RefreshCw } from 'lucide-react';

interface FilterHeaderProps {
  title: string;
}

const FilterHeader = ({ title }: FilterHeaderProps) => {
  const { resetFilters, appliedFilters } = useJobFilter();
  
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-medium">{title}</h2>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={resetFilters}
        disabled={appliedFilters.length === 0}
        className="gap-1"
      >
        <RefreshCw className="h-3 w-3" />
        Reset All
      </Button>
    </div>
  );
};

export default FilterHeader;
