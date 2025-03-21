
import { MapPin, BriefcaseIcon, CalendarIcon } from 'lucide-react';

interface JobCardDetailsProps {
  location: {
    city: string;
    state: string;
  };
  payRange: string;
  jobType: string;
  useAmberStyling: boolean;
}

const JobCardDetails = ({ location, payRange, jobType, useAmberStyling }: JobCardDetailsProps) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-black">
      <div className="flex items-center gap-1" aria-label={`Location: ${location.city}, ${location.state}`}>
        <MapPin className={`h-3 w-3 sm:h-4 sm:w-4 ${useAmberStyling ? "text-amber-600" : ""}`} aria-hidden="true" />
        <span>{location.city}, {location.state}</span>
      </div>
      
      <div className="flex items-center gap-1" aria-label={`Salary: ${payRange}`}>
        <BriefcaseIcon className={`h-3 w-3 sm:h-4 sm:w-4 ${useAmberStyling ? "text-amber-600" : ""}`} aria-hidden="true" />
        <span>{payRange}</span>
      </div>
      
      <div className="flex items-center gap-1" aria-label={`Job type: ${jobType.replace('-', ' ')}`}>
        <CalendarIcon className={`h-3 w-3 sm:h-4 sm:w-4 ${useAmberStyling ? "text-amber-600" : ""}`} aria-hidden="true" />
        <span className="capitalize">{jobType.replace('-', ' ')}</span>
      </div>
    </div>
  );
};

export default JobCardDetails;
