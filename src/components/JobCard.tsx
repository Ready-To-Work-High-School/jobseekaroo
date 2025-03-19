
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Job } from '@/types/job';
import { useFadeIn } from '@/utils/animations';

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard = ({ job, index }: JobCardProps) => {
  const animation = useFadeIn(100 + index * 50);
  
  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };
  
  // Format pay range
  const formatPayRange = (min: number, max: number, period: string) => {
    return `$${min}${max > min ? `-$${max}` : ''} ${period}`;
  };

  return (
    <Link 
      to={`/jobs/${job.id}`}
      className={cn(
        "block p-6 rounded-xl border border-border bg-white",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:scale-[1.01] focus-ring",
        animation
      )}
    >
      <div className="flex items-start gap-4">
        {job.logoUrl ? (
          <div className="w-12 h-12 rounded-md border border-border overflow-hidden bg-muted flex-shrink-0">
            <img 
              src={job.logoUrl} 
              alt={`${job.company} logo`} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-md border border-border bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-medium text-lg">
              {job.company.substring(0, 1)}
            </span>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-lg truncate">{job.title}</h3>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatRelativeDate(job.postedDate)}
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm mt-1">{job.company}</p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
              {job.location.city}, {job.location.state}
            </span>
            
            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium">
              {formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}
            </span>
            
            <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium capitalize">
              {job.type.replace('-', ' ')}
            </span>
            
            {job.isRemote && (
              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                Remote
              </span>
            )}
            
            {job.isFlexible && (
              <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-medium">
                Flexible
              </span>
            )}
          </div>
          
          <p className="mt-3 text-sm text-foreground/80 line-clamp-2">
            {job.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
