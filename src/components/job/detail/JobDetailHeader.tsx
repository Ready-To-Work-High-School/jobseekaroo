
import { Link } from 'react-router-dom';
import { useSlideIn } from '@/utils/animations';
import ShareJobButton from '@/components/ShareJobButton';
import { Job } from '@/types/job';

interface JobDetailHeaderProps {
  job: Job;
}

export const JobDetailHeader = ({ job }: JobDetailHeaderProps) => {
  const headerAnimation = useSlideIn(100);
  
  return (
    <div className={`mb-8 ${headerAnimation}`}>
      <div className="flex items-center gap-4 mb-6">
        {job.logoUrl ? (
          <div className="w-16 h-16 rounded-lg border border-border overflow-hidden bg-white flex-shrink-0">
            <img 
              src={job.logoUrl} 
              alt={`${job.company.name} logo`} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-lg border border-border bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-semibold text-2xl">
              {job.company.name.substring(0, 1)}
            </span>
          </div>
        )}
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1">{job.title}</h1>
          <p className="text-lg text-muted-foreground">{job.company.name}</p>
        </div>
        
        <ShareJobButton 
          jobId={job.id} 
          jobTitle={job.title} 
          companyName={job.company.name} 
          className="self-start"
        />
      </div>
    </div>
  );
};

export default JobDetailHeader;
