
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { useFadeIn } from '@/utils/animations';
import { MapPin, Clock, BriefcaseIcon, CalendarIcon } from 'lucide-react';

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard = ({
  job,
  index
}: JobCardProps) => {
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
    <Link to={`/jobs/${job.id}`} className={animation}>
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          {job.logoUrl ? (
            <div className="w-12 h-12 rounded-md border border-border overflow-hidden bg-muted flex-shrink-0">
              <img src={job.logoUrl} alt={`${job.company} logo`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-md border border-border bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-medium text-lg">
                {job.company.substring(0, 1)}
              </span>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{job.title}</h3>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
            <Clock className="h-3 w-3" />
            {formatRelativeDate(job.postedDate)}
          </div>
        </div>

        {/* Location and Details */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location.city}, {job.location.state}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <BriefcaseIcon className="h-4 w-4" />
            <span>{formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span className="capitalize">{job.type.replace('-', ' ')}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
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
          
          <span className="px-2 py-1 rounded-md bg-secondary text-xs font-medium capitalize">
            {job.experienceLevel.replace('-', ' ')}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
