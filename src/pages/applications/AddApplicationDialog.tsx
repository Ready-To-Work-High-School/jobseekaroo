
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Job } from '@/types/job';
import { getJobById } from '@/lib/mock-data';
import { ApplicationForm } from './ApplicationForm';
import { SavedJobsList } from './SavedJobsList';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddApplicationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onApplicationAdded: () => void;
}

export const AddApplicationDialog = ({ 
  isOpen, 
  onOpenChange, 
  onApplicationAdded 
}: AddApplicationDialogProps) => {
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const { getSavedJobs } = useAuth();
  const { toast } = useToast();

  const loadSavedJobs = async () => {
    try {
      const savedJobIds = await getSavedJobs();
      const jobDetails = savedJobIds.map(id => getJobById(id)).filter(Boolean) as Job[];
      setSavedJobs(jobDetails);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const handleDialogOpen = (open: boolean) => {
    if (open && !savedJobs.length) {
      loadSavedJobs();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>
            Track a new job application in your dashboard.
          </DialogDescription>
        </DialogHeader>

        {showSavedJobs ? (
          <SavedJobsList 
            savedJobs={savedJobs}
            onSelectJob={(job) => {
              setSelectedJob(job);
              setShowSavedJobs(false);
            }}
            onCancel={() => setShowSavedJobs(false)}
          />
        ) : (
          <ApplicationForm
            selectedJob={selectedJob}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            onShowSavedJobs={() => setShowSavedJobs(true)}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onApplicationAdded();
              onOpenChange(false);
              setSelectedJob(null);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
