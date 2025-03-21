
import { Button } from '@/components/ui/button';
import { JobType } from '@/types/job';
import { useJobFilter } from './JobFilterContext';

const JobTypeFilter = () => {
  const { jobType, setJobType } = useJobFilter();
  
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Job Type</h4>
      <div className="grid grid-cols-2 gap-2">
        <Button 
          type="button" 
          variant={jobType === 'all' ? "default" : "outline"}
          size="sm"
          onClick={() => setJobType('all')}
          className="justify-start"
        >
          All Types
        </Button>
        <Button 
          type="button" 
          variant={jobType === 'full-time' ? "default" : "outline"}
          size="sm"
          onClick={() => setJobType('full-time')}
          className="justify-start"
        >
          Full Time
        </Button>
        <Button 
          type="button" 
          variant={jobType === 'part-time' ? "default" : "outline"}
          size="sm"
          onClick={() => setJobType('part-time')}
          className="justify-start"
        >
          Part Time
        </Button>
        <Button 
          type="button" 
          variant={jobType === 'contract' ? "default" : "outline"}
          size="sm"
          onClick={() => setJobType('contract')}
          className="justify-start"
        >
          Contract
        </Button>
      </div>
    </div>
  );
};

export default JobTypeFilter;
