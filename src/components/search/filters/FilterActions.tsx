
import { Button } from '@/components/ui/button';

interface FilterActionsProps {
  onResetFilters: () => void;
  onApplyFilters: () => void;
}

const FilterActions = ({ onResetFilters, onApplyFilters }: FilterActionsProps) => {
  return (
    <div className="flex justify-between pt-2">
      <Button 
        type="button" 
        variant="ghost" 
        size="sm"
        onClick={onResetFilters}
      >
        Reset
      </Button>
      <Button 
        type="button" 
        size="sm"
        onClick={onApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterActions;
