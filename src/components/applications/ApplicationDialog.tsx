
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ApplicationStatus, JobApplication } from '@/types/application';
import { Job } from '@/types/job';
import { getJobById } from '@/lib/mock-data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ApplicationForm from './ApplicationForm';

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showSavedJobs: boolean;
  setShowSavedJobs: (show: boolean) => void;
  onSuccess: () => void;
}

export const ApplicationDialog = ({
  open,
  onOpenChange,
  showSavedJobs,
  setShowSavedJobs,
  onSuccess
}: ApplicationDialogProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { getSavedJobs, createApplication } = useAuth();
  const { toast } = useToast();
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const loadSavedJobs = async () => {
    if (!open) return;
    
    try {
      const savedJobIds = await getSavedJobs();
      const jobDetails = savedJobIds.map(id => getJobById(id)).filter(Boolean) as Job[];
      setSavedJobs(jobDetails);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const handleSuccess = () => {
    onOpenChange(false);
    setSelectedJob(null);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>
            Track a new job application in your dashboard.
          </DialogDescription>
        </DialogHeader>

        {showSavedJobs ? (
          <>
            <div className="py-4">
              <h3 className="text-sm font-medium mb-2">Select from saved jobs:</h3>
              {savedJobs.length > 0 ? (
                <div className="max-h-[300px] overflow-y-auto space-y-2">
                  {savedJobs.map((job) => (
                    <div 
                      key={job.id}
                      className="p-3 border rounded-md cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => {
                        setSelectedJob(job);
                        setShowSavedJobs(false);
                      }}
                    >
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm text-muted-foreground">{job.company.name}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-muted-foreground">
                  <p>You don't have any saved jobs yet.</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSavedJobs(false)}>
                Enter Manually
              </Button>
            </DialogFooter>
          </>
        ) : (
          <ApplicationForm
            jobId={selectedJob?.id}
            jobTitle={selectedJob?.title}
            companyName={selectedJob?.company.name}
            onCancel={() => onOpenChange(false)}
            onSuccess={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
