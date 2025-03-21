
import { Clock } from 'lucide-react';
import { JobCardShareSave } from './JobCardShareSave';

interface JobCardHeaderProps {
  title: string;
  companyName: string;
  postedDate: string;
  jobId: string;
  useAmberStyling: boolean;
  formatRelativeDate: (date: string) => string;
}

const JobCardHeader = ({ 
  title, 
  companyName, 
  postedDate, 
  jobId,
  useAmberStyling,
  formatRelativeDate
}: JobCardHeaderProps) => {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-base sm:text-lg truncate text-black`}>
          {title}
        </h3>
        <p className={`text-sm ${useAmberStyling ? 'text-amber-700' : 'text-black'}`}>
          {companyName}
        </p>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center gap-1 text-xs text-black whitespace-nowrap">
          <Clock className="h-3 w-3" aria-hidden="true" />
          <span aria-label={`Posted ${formatRelativeDate(postedDate)}`}>
            {formatRelativeDate(postedDate)}
          </span>
        </div>
        
        <JobCardShareSave 
          jobId={jobId} 
          jobTitle={title} 
          companyName={companyName}
          useAmberStyling={useAmberStyling}
        />
      </div>
    </div>
  );
};

export default JobCardHeader;
