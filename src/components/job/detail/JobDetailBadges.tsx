
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  CreditCard, 
  Calendar, 
  Zap, 
  Laptop,
  Building
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Job } from "@/types/job";

interface JobDetailBadgesProps {
  job: Job;
  className?: string;
}

const JobDetailBadges = ({ job, className }: JobDetailBadgesProps) => {
  const { job_type, experience_level, location, is_remote, pay_rate_min, pay_rate_max, pay_rate_period, hours_per_week, is_flexible } = job;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {/* Job Type Badge */}
      <Badge variant="outline" className="flex gap-1 items-center py-1.5 pl-1 pr-3">
        <span className="bg-primary/10 p-1 rounded-md">
          <Briefcase className="h-3.5 w-3.5 text-primary" />
        </span>
        <span className="text-xs capitalize">{job_type}</span>
      </Badge>

      {/* Experience Level Badge */}
      {experience_level && (
        <Badge variant="outline" className="flex gap-1 items-center py-1.5 pl-1 pr-3">
          <span className="bg-primary/10 p-1 rounded-md">
            <Calendar className="h-3.5 w-3.5 text-primary" />
          </span>
          <span className="text-xs capitalize">{experience_level}</span>
        </Badge>
      )}

      {/* Location Badge */}
      {location && (
        <Badge variant="outline" className="flex gap-1 items-center py-1.5 pl-1 pr-3">
          <span className="bg-primary/10 p-1 rounded-md">
            <MapPin className="h-3.5 w-3.5 text-primary" />
          </span>
          <span className="text-xs">
            {is_remote ? "Remote" : `${location.city}, ${location.state}`}
          </span>
        </Badge>
      )}

      {/* Pay Rate Badge */}
      {pay_rate_min && pay_rate_max && (
        <Badge variant="outline" className="flex gap-1 items-center py-1.5 pl-1 pr-3">
          <span className="bg-primary/10 p-1 rounded-md">
            <CreditCard className="h-3.5 w-3.5 text-primary" />
          </span>
          <span className="text-xs">
            ${pay_rate_min} - ${pay_rate_max}/{pay_rate_period}
          </span>
        </Badge>
      )}

      {/* Hours Badge */}
      {hours_per_week && (
        <Badge variant="outline" className="flex gap-1 items-center py-1.5 pl-1 pr-3">
          <span className="bg-primary/10 p-1 rounded-md">
            <Clock className="h-3.5 w-3.5 text-primary" />
          </span>
          <span className="text-xs">{hours_per_week} hrs/week</span>
        </Badge>
      )}
      
      {/* Flexible Schedule Badge */}
      {is_flexible && (
        <Badge variant="outline" className="flex gap-1 items-center py-1.5 pl-1 pr-3">
          <span className="bg-primary/10 p-1 rounded-md">
            <Zap className="h-3.5 w-3.5 text-primary" />
          </span>
          <span className="text-xs">Flexible Schedule</span>
        </Badge>
      )}
      
      {/* Remote Badge */}
      {is_remote && (
        <Badge variant="outline" className="flex gap-1 items-center py-1.5 pl-1 pr-3">
          <span className="bg-primary/10 p-1 rounded-md">
            <Laptop className="h-3.5 w-3.5 text-primary" />
          </span>
          <span className="text-xs">Remote</span>
        </Badge>
      )}

      {/* Company Badge */}
      {job.company_name && (
        <Badge variant="outline" className="flex gap-1 items-center py-1.5 pl-1 pr-3">
          <span className="bg-primary/10 p-1 rounded-md">
            <Building className="h-3.5 w-3.5 text-primary" />
          </span>
          <span className="text-xs">{job.company_name}</span>
        </Badge>
      )}
    </div>
  );
};

export default JobDetailBadges;
