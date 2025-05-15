
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { useFadeIn } from '@/utils/animations';
import { Clock } from 'lucide-react';
import { isJacksonvilleCompany, formatRelativeDate, formatPayRange } from './job/JobCardUtils';
import JobCardLogo from './job/JobCardLogo';
import JobCardHeader from './job/JobCardHeader';
import JobCardDetails from './job/JobCardDetails';
import JobCardFeatures from './job/JobCardFeatures';
import { normalizeJob } from '@/utils/jobAdapter';

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard = ({ job, index }: JobCardProps) => {
  const normalizedJob = normalizeJob(job);
  const animation = useFadeIn(100 + index * 50);
  const useAmberStyling = isJacksonvilleCompany(normalizedJob.company.name);
  
  return (
    <Link 
      to={`/jobs/${normalizedJob.id}`} 
      className={animation}
      aria-label={`${normalizedJob.title} at ${normalizedJob.company.name}, ${normalizedJob.payRate ? formatPayRange(normalizedJob.payRate.min, normalizedJob.payRate.max, normalizedJob.payRate.period) : ''}`}
    >
      <div 
        className={`flex flex-col space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-lg ${useAmberStyling ? 'border-amber-400 border-2' : 'border border-border'} bg-white hover:shadow-md transition-all duration-200`}
        role="article"
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <JobCardLogo 
            logoUrl={normalizedJob.logoUrl} 
            companyName={normalizedJob.company.name}
            useAmberStyling={useAmberStyling}
          />
          
          <JobCardHeader 
            title={normalizedJob.title}
            companyName={normalizedJob.company.name}
            postedDate={normalizedJob.postedDate}
            jobId={normalizedJob.id}
            useAmberStyling={useAmberStyling}
            formatRelativeDate={formatRelativeDate}
          />
        </div>

        <div className="sm:hidden flex items-center gap-2 text-xs text-black">
          <Clock className="h-3 w-3" aria-hidden="true" />
          <span>{formatRelativeDate(normalizedJob.postedDate)}</span>
        </div>

        <JobCardDetails 
          location={normalizedJob.location}
          payRange={formatPayRange(normalizedJob.payRate.min, normalizedJob.payRate.max, normalizedJob.payRate.period)}
          jobType={normalizedJob.type}
          useAmberStyling={useAmberStyling}
        />

        <JobCardFeatures 
          isRemote={normalizedJob.isRemote}
          isFlexible={normalizedJob.isFlexible}
          experienceLevel={normalizedJob.experienceLevel}
          useAmberStyling={useAmberStyling}
        />

        <p className="text-xs sm:text-sm text-black line-clamp-2">
          {normalizedJob.description}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
