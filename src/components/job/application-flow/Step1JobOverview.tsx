
import React from 'react';
import { Briefcase } from 'lucide-react';
import { Job } from '@/types/job';

interface Step1JobOverviewProps {
  job: Job;
}

const Step1JobOverview: React.FC<Step1JobOverviewProps> = ({ job }) => {
  return (
    <div className="space-y-4 py-2">
      <h3 className="text-lg font-medium">Job Overview</h3>
      <div className="grid gap-3">
        <div className="flex items-start gap-3 bg-muted/50 p-3 rounded-md">
          <Briefcase className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium">{job.title}</h4>
            <p className="text-sm text-muted-foreground">{job.company.name}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-muted-foreground">Pay Range</div>
            <div className="font-medium">${job.payRate.min} - ${job.payRate.max} {job.payRate.period}</div>
          </div>
          <div className="bg-muted/50 p-3 rounded-md">
            <div className="text-muted-foreground">Location</div>
            <div className="font-medium">{job.location.city}, {job.location.state}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1JobOverview;
