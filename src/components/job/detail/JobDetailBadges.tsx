import React from 'react';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, GraduationCap, Clock } from 'lucide-react';

interface JobDetailBadgesProps {
  job: Job;
  className?: string;
}

const JobDetailBadges = ({ job, className = "" }: JobDetailBadgesProps) => {
  // Format location display
  const locationDisplay = job.location && 
    `${job.location.city}, ${job.location.state}${job.location.zip ? ` ${job.location.zip}` : ''}`;
  
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${className}`}>
      {locationDisplay && (
        <Badge variant="secondary">
          <MapPin className="mr-2 h-4 w-4" />
          {locationDisplay}
        </Badge>
      )}
      
      {job.type && (
        <Badge variant="secondary">
          <Briefcase className="mr-2 h-4 w-4" />
          {job.type}
        </Badge>
      )}
      
      {job.experienceLevel && (
        <Badge variant="secondary">
          <GraduationCap className="mr-2 h-4 w-4" />
          {job.experienceLevel}
        </Badge>
      )}
      
      {job.hours_per_week && (
        <Badge variant="secondary">
          <Clock className="mr-2 h-4 w-4" />
          {job.hours_per_week} hours/week
        </Badge>
      )}
    </div>
  );
};

export default JobDetailBadges;
