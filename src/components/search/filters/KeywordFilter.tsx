
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import { useJobFilter } from './JobFilterContext';

const KeywordFilter = () => {
  const { keyword, setKeyword } = useJobFilter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This could trigger an immediate search if needed
  };
  
  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search job titles, companies..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-10 pr-10"
          />
          <Button 
            className="absolute right-1 top-1 h-6 w-6 p-0" 
            variant="ghost" 
            onClick={() => setKeyword('')}
            disabled={!keyword}
            type="button"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default KeywordFilter;
