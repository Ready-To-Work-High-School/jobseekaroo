
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';
import { JobType } from '@/types/job';

interface JobTypeFilterProps {
  jobType: JobType | 'all';
  setJobType: (type: JobType | 'all') => void;
}

const JobTypeFilter = ({ jobType, setJobType }: JobTypeFilterProps) => {
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
          <Briefcase className="mr-2 h-3.5 w-3.5" />
          All Types
        </Button>
        <Button 
          type="button" 
          variant={jobType === 'part-time' ? "default" : "outline"}
          size="sm"
          onClick={() => setJobType('part-time')}
          className="justify-start"
        >
          <Briefcase className="mr-2 h-3.5 w-3.5" />
          Part Time
        </Button>
        <Button 
          type="button" 
          variant={jobType === 'full-time' ? "default" : "outline"}
          size="sm"
          onClick={() => setJobType('full-time')}
          className="justify-start"
        >
          <Briefcase className="mr-2 h-3.5 w-3.5" />
          Full Time
        </Button>
        <Button 
          type="button" 
          variant={jobType === 'internship' ? "default" : "outline"}
          size="sm"
          onClick={() => setJobType('internship')}
          className="justify-start"
        >
          <Briefcase className="mr-2 h-3.5 w-3.5" />
          Internship
        </Button>
      </div>
    </div>
  );
};

export default JobTypeFilter;
