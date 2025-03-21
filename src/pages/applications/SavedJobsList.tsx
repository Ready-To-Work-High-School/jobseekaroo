
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface SavedJobsListProps {
  savedJobs: Job[];
  onSelectJob: (job: Job) => void;
  onCancel: () => void;
}

export const SavedJobsList = ({ savedJobs, onSelectJob, onCancel }: SavedJobsListProps) => {
  return (
    <>
      <div className="py-4">
        <h3 className="text-sm font-medium mb-2">Select from saved jobs:</h3>
        {savedJobs.length > 0 ? (
          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {savedJobs.map((job) => (
              <div 
                key={job.id}
                className="p-3 border rounded-md cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => onSelectJob(job)}
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
        <Button variant="outline" onClick={onCancel}>
          Enter Manually
        </Button>
      </DialogFooter>
    </>
  );
};
