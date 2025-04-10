
import React from 'react';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { Job } from '@/types/job';
import { 
  DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface ApplicationCompletionScreenProps {
  job: Job;
  onClose: () => void;
}

const ApplicationCompletionScreen: React.FC<ApplicationCompletionScreenProps> = ({ job, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center flex flex-col items-center gap-2">
          <div className="bg-green-100 p-3 rounded-full">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          Application Submitted!
        </DialogTitle>
        <DialogDescription className="text-center max-w-sm mx-auto">
          Your application for <span className="font-medium">{job.title}</span> at{" "}
          <span className="font-medium">{job.company.name}</span> has been submitted successfully.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-6 py-6">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Next Steps
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <div className="bg-primary/20 rounded-full h-5 w-5 flex items-center justify-center shrink-0">
                  <span className="text-xs font-medium text-primary">1</span>
                </div>
                <span>The employer will review your application</span>
              </li>
              <li className="flex gap-2">
                <div className="bg-primary/20 rounded-full h-5 w-5 flex items-center justify-center shrink-0">
                  <span className="text-xs font-medium text-primary">2</span>
                </div>
                <span>You'll receive an email when there are updates</span>
              </li>
              <li className="flex gap-2">
                <div className="bg-primary/20 rounded-full h-5 w-5 flex items-center justify-center shrink-0">
                  <span className="text-xs font-medium text-primary">3</span>
                </div>
                <span>Track your application status in your dashboard</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <DialogFooter className="flex sm:justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => navigate('/applications')} className="gap-1">
          View Applications
          <ArrowRight className="h-4 w-4" />
        </Button>
      </DialogFooter>
    </>
  );
};

export default ApplicationCompletionScreen;
