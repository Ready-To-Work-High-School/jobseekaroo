
import { useState } from 'react';
import JobPostForm from './job/JobPostForm';
import JobPostSuccess from './job/JobPostSuccess';
import { useToast } from '@/hooks/use-toast';
import { createAdminNotification } from '@/lib/supabase/notifications';

interface CreateJobTabProps {
  setActiveTab: (tab: string) => void;
}

const CreateJobTab = ({ setActiveTab }: CreateJobTabProps) => {
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleJobSubmitSuccess = async (jobId: string) => {
    console.log("Job created successfully with ID:", jobId);
    setCreatedJobId(jobId);
    
    // Notify admins and CEOs about the new job post
    try {
      await createAdminNotification(
        'New Job Posted',
        'A new job has been posted and requires review.',
        'job',
        `/jobs/${jobId}`,
        { jobId }
      );
      
      console.log('Admin notification sent for new job post');
    } catch (error) {
      console.error('Failed to send admin notification:', error);
    }
    
    toast({
      title: "Job Posted Successfully",
      description: "Your job posting is now live and visible to potential candidates."
    });
  };

  const handleCancel = () => {
    setActiveTab("postings");
  };

  const handleContinue = () => {
    setCreatedJobId(null);
    setActiveTab("postings");
  };

  if (createdJobId) {
    return (
      <JobPostSuccess 
        jobId={createdJobId}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <JobPostForm
      onSuccess={handleJobSubmitSuccess}
      onCancel={handleCancel}
    />
  );
};

export default CreateJobTab;
