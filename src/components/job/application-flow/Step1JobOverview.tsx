
import React from 'react';
import { Briefcase } from 'lucide-react';
import { Job } from '@/types/job';
import { Card, CardContent } from '@/components/ui/card';

interface Step1JobOverviewProps {
  job: Job;
}

const Step1JobOverview: React.FC<Step1JobOverviewProps> = ({ job }) => {
  return (
    <div className="space-y-4 py-2">
      <h3 className="text-lg font-medium">Job Overview</h3>
      <div className="grid gap-3">
        <Card className="overflow-hidden">
          <CardContent className="p-3 flex items-start gap-3">
            <Briefcase className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium">{job.title}</h4>
              <p className="text-sm text-muted-foreground">{job.company.name}</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Card>
            <CardContent className="p-3">
              <div className="text-muted-foreground">Pay Range</div>
              <div className="font-medium">${job.payRate.min} - ${job.payRate.max} {job.payRate.period}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="text-muted-foreground">Location</div>
              <div className="font-medium">{job.location.city}, {job.location.state}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Step1JobOverview;
