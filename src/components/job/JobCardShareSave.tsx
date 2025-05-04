
import { useState, useEffect } from 'react';
import { BookmarkIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ShareButton from '../ShareButton';

interface JobCardShareSaveProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  useAmberStyling: boolean;
}

export const JobCardShareSave = ({ 
  jobId, 
  jobTitle, 
  companyName, 
  useAmberStyling 
}: JobCardShareSaveProps) => {
  const { user, saveJob, unsaveJob, isSavedJob } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (user && isSavedJob) {
      const checkSaved = async () => {
        try {
          const saved = await isSavedJob(jobId);
          setIsSaved(saved);
        } catch (error) {
          console.error("Error checking if job is saved:", error);
        }
      };
      checkSaved();
    } else {
      setIsSaved(false);
    }
  }, [user, jobId, isSavedJob]);

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save jobs",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (isSaved) {
        await unsaveJob?.(jobId);
        setIsSaved(false);
        toast({
          title: "Job removed",
          description: "Job removed from your saved jobs",
        });
      } else {
        await saveJob?.(jobId);
        setIsSaved(true);
        toast({
          title: "Job saved",
          description: "Job added to your saved jobs",
        });
      }
    } catch (error) {
      console.error("Error toggling job save status:", error);
      toast({
        title: "Error",
        description: "There was an error updating your saved jobs",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-1">
      <ShareButton
        jobId={jobId}
        jobTitle={jobTitle}
        companyName={companyName}
        className={`${useAmberStyling ? 'text-amber-600 hover:text-amber-800' : 'text-black hover:text-primary'}`}
      />
      
      <button 
        onClick={handleSaveToggle}
        className={`${useAmberStyling ? 'text-amber-600 hover:text-amber-800' : 'text-black hover:text-primary'} transition-colors p-1 sm:p-0 focus-visible:ring`}
        aria-label={isSaved ? `Unsave ${jobTitle} job` : `Save ${jobTitle} job`}
        aria-pressed={isSaved}
      >
        <BookmarkIcon 
          className={`h-5 w-5 ${isSaved ? (useAmberStyling ? 'fill-amber-500 text-amber-600' : 'fill-primary text-primary') : 'fill-none'}`} 
          aria-hidden="true"
        />
      </button>
    </div>
  );
};
