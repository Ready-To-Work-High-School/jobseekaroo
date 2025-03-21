
import { Button } from '@/components/ui/button';

interface SortByFilterProps {
  sortBy: 'relevance' | 'date' | 'salary' | 'distance';
  setSortBy: (sort: 'relevance' | 'date' | 'salary' | 'distance') => void;
}

const SortByFilter = ({ sortBy, setSortBy }: SortByFilterProps) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Sort Results By</h4>
      <div className="grid grid-cols-2 gap-2">
        <Button 
          type="button" 
          variant={sortBy === 'relevance' ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy('relevance')}
          className="justify-start"
        >
          Relevance
        </Button>
        <Button 
          type="button" 
          variant={sortBy === 'date' ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy('date')}
          className="justify-start"
        >
          Date Posted
        </Button>
        <Button 
          type="button" 
          variant={sortBy === 'salary' ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy('salary')}
          className="justify-start"
        >
          Salary
        </Button>
        <Button 
          type="button" 
          variant={sortBy === 'distance' ? "default" : "outline"}
          size="sm"
          onClick={() => setSortBy('distance')}
          className="justify-start"
        >
          Distance
        </Button>
      </div>
    </div>
  );
};

export default SortByFilter;
