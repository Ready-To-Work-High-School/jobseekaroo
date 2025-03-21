
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { useFadeIn } from '@/utils/animations';
import { Clock } from 'lucide-react';
import { isJacksonvilleCompany, formatRelativeDate, formatPayRange } from './job/JobCardUtils';
import JobCardLogo from './job/JobCardLogo';
import JobCardHeader from './job/JobCardHeader';
import JobCardDetails from './job/JobCardDetails';
import JobCardFeatures from './job/JobCardFeatures';

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard = ({ job, index }: JobCardProps) => {
  const animation = useFadeIn(100 + index * 50);
  const useAmberStyling = isJacksonvilleCompany(job.company.name);
  
  return (
    <Link 
      to={`/jobs/${job.id}`} 
      className={animation}
      aria-label={`${job.title} at ${job.company.name}, ${job.payRate ? formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period) : ''}`}
    >
      <div 
        className={`flex flex-col space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-lg ${useAmberStyling ? 'border-amber-400 border-2' : 'border border-border'} bg-white hover:shadow-md transition-all duration-200`}
        role="article"
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <JobCardLogo 
            logoUrl={job.logoUrl} 
            companyName={job.company.name}
            useAmberStyling={useAmberStyling}
          />
          
          <JobCardHeader 
            title={job.title}
            companyName={job.company.name}
            postedDate={job.postedDate}
            jobId={job.id}
            useAmberStyling={useAmberStyling}
            formatRelativeDate={formatRelativeDate}
          />
        </div>

        <div className="sm:hidden flex items-center gap-2 text-xs text-black">
          <Clock className="h-3 w-3" aria-hidden="true" />
          <span>{formatRelativeDate(job.postedDate)}</span>
        </div>

        <JobCardDetails 
          location={job.location}
          payRange={formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}
          jobType={job.type}
          useAmberStyling={useAmberStyling}
        />

        <JobCardFeatures 
          isRemote={job.isRemote}
          isFlexible={job.isFlexible}
          experienceLevel={job.experienceLevel}
          useAmberStyling={useAmberStyling}
        />

        <p className="text-xs sm:text-sm text-black line-clamp-2">
          {job.description}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
