
import { Job } from '@/types/job';

interface BadgeProps {
  children: React.ReactNode;
  icon: string;
  className?: string;
}

const Badge = ({ children, icon, className }: BadgeProps) => (
  <div className={`inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-sm font-medium ${className}`}>
    <span className="mr-1.5 text-current opacity-70">
      {icon === 'location' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )}
      {icon === 'dollar' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="2" y2="22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )}
      {icon === 'clock' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      {icon === 'laptop' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
        </svg>
      )}
      {icon === 'calendar' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
      )}
    </span>
    {children}
  </div>
);

interface JobDetailBadgesProps {
  job: Job;
  formatPayRange: (min: number, max: number, period: string) => string;
}

export const JobDetailBadges = ({ job, formatPayRange }: JobDetailBadgesProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge icon="location">
        {job.location.city}, {job.location.state} {job.location.zipCode}
      </Badge>
      
      <Badge icon="dollar">
        {formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}
      </Badge>
      
      <Badge icon="clock" className="capitalize">
        {job.type.replace('-', ' ')}
      </Badge>
      
      {job.isRemote && (
        <Badge icon="laptop" className="bg-primary/10 text-primary">
          Remote
        </Badge>
      )}
      
      {job.isFlexible && (
        <Badge icon="calendar" className="bg-emerald-100 text-emerald-800">
          Flexible Schedule
        </Badge>
      )}
    </div>
  );
};

export default JobDetailBadges;
