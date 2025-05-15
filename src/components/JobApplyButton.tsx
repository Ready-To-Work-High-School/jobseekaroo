
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQualificationMatch } from '@/hooks/useQualificationMatch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Clipboard, ListTodo } from 'lucide-react';

interface JobApplyButtonProps {
  job: Job;
}

export const JobApplyButton = ({ job }: JobApplyButtonProps) => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, userProfile, createApplication } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { matchClass } = useQualificationMatch(job);
  
  const handleApplyAndTrack = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your applications",
        variant: "destructive",
      });
      
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      navigate('/sign-in');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await createApplication({
        job_id: job.id,
        job_title: job.title,
        company: job.company.name,
        status: 'applied',
        applied_date: new Date().toISOString().substring(0, 10),
        notes: `Applied for ${job.title} at ${job.company.name}. Pay range: $${job.payRate.min}-$${job.payRate.max} ${job.payRate.period}.`
      });
      
      setShowSuccessDialog(true);
      
    } catch (error) {
      console.error('Error creating application:', error);
      toast({
        title: "Error",
        description: "Failed to track your application",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onExternalApply = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to apply for jobs",
        variant: "destructive",
      });
      
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      navigate('/sign-in');
      return;
    }
    
    setShowSuccessDialog(true);
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={`w-full md:w-auto px-6 py-3 gap-1 ${matchClass}`}>
            Apply Now
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white w-56">
          <DropdownMenuItem onClick={handleApplyAndTrack} disabled={isLoading}>
            <ListTodo className="mr-2 h-4 w-4" />
            <span>Apply & Track Application</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExternalApply} disabled={isLoading}>
            <Clipboard className="mr-2 h-4 w-4" />
            <span>Apply on Company Website</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Application Submitted!</DialogTitle>
            <DialogDescription>
              Your application for the {job.title} position at {job.company.name} has been successfully submitted.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              {user
                ? "Your application has been added to your tracking dashboard."
                : "Create an account to track the status of your applications."}
            </p>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowSuccessDialog(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={() => {
                setShowSuccessDialog(false);
                navigate('/applications');
              }}
            >
              View Your Applications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
