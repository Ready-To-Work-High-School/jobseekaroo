
import { Button } from '@/components/ui/button';

interface FilterActionsProps {
  onResetFilters: () => void;
  onApplyFilters: () => void;
}

const FilterActions = ({ onResetFilters, onApplyFilters }: FilterActionsProps) => {
  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onResetFilters}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Reset
      </Button>
      <Button 
        type="button"
        onClick={onApplyFilters}
        size="sm"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterActions;
