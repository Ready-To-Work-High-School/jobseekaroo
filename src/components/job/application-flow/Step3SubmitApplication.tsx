
import React from 'react';
import { FileCheck } from 'lucide-react';
import { Job } from '@/types/job';

interface Step3SubmitApplicationProps {
  job: Job;
}

const Step3SubmitApplication: React.FC<Step3SubmitApplicationProps> = ({ job }) => {
  return (
    <div className="space-y-4 py-2">
      <h3 className="text-lg font-medium">Submit Your Application</h3>
      <p className="text-sm text-muted-foreground">
        You're about to apply for {job.title} at {job.company.name}. 
        Once submitted, the employer will review your application and may contact you.
      </p>
      
      <div className="flex items-center justify-center py-4">
        <FileCheck className="h-16 w-16 text-primary" />
      </div>
      
      <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> After applying, follow up with the employer in 3-5 days if you haven't heard back.
        </p>
      </div>
    </div>
  );
};

export default Step3SubmitApplication;
