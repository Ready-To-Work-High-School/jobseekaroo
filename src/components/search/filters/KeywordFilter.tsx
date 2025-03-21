
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useJobFilter } from './JobFilterContext';

const KeywordFilter = () => {
  const { keyword, setKeyword } = useJobFilter();
  
  return (
    <div className="mb-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search job titles, companies..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="pr-10"
        />
        <Button 
          className="absolute right-1 top-1 h-6 w-6 p-0" 
          variant="ghost" 
          onClick={() => setKeyword('')}
          disabled={!keyword}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default KeywordFilter;
