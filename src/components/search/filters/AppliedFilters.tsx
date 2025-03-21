
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useJobFilter } from './JobFilterContext';

interface AppliedFiltersProps {
  className?: string;
}

const AppliedFilters = ({ className }: AppliedFiltersProps) => {
  const { appliedFilters, removeFilter } = useJobFilter();
  
  if (appliedFilters.length === 0) {
    return null;
  }
  
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {appliedFilters.map((filter, index) => (
          <Badge 
            key={index} 
            variant="secondary"
            className="px-2 py-1 rounded-md flex gap-1 items-center"
          >
            {filter.value}
            <button 
              className="ml-1 text-muted-foreground hover:text-foreground" 
              onClick={() => removeFilter(filter.key)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default AppliedFilters;
