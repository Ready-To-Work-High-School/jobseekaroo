
import React from 'react';
import { FileCheck } from 'lucide-react';
import { Job } from '@/types/job';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
        <div className="bg-primary/10 p-4 rounded-full">
          <FileCheck className="h-16 w-16 text-primary" />
        </div>
      </div>
      
      <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-100">
        <AlertDescription>
          <strong>Tip:</strong> After applying, follow up with the employer in 3-5 days if you haven't heard back.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Step3SubmitApplication;
