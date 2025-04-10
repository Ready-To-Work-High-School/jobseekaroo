
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Job } from '@/types/job';

interface ApplicationCompletionScreenProps {
  job: Job;
  onClose: () => void;
}

const ApplicationCompletionScreen: React.FC<ApplicationCompletionScreenProps> = ({ job, onClose }) => {
  return (
    <div className="flex flex-col items-center text-center py-6 space-y-6">
      <div className="rounded-full bg-green-100 p-3">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Application Submitted!</h2>
        <p className="text-sm text-muted-foreground">
          You've successfully applied for:
        </p>
        <div className="font-medium">
          {job.title}
          <span className="text-sm text-muted-foreground block">
            at {job.company.name}
          </span>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 w-full">
        <div className="flex items-center gap-2 text-blue-700 mb-2">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">What's next?</span>
        </div>
        <p className="text-sm text-blue-700">
          Keep an eye on your email for updates from the employer. You can track this application in your dashboard.
        </p>
      </div>
      
      <Button onClick={onClose} className="w-full">
        Close
      </Button>
    </div>
  );
};

export default ApplicationCompletionScreen;
