
import { useState } from 'react';
import JobPostForm from './job/JobPostForm';
import JobPostSuccess from './job/JobPostSuccess';
import { useToast } from '@/hooks/use-toast';
import { createAdminNotification } from '@/lib/supabase/notifications';
import { useAuth } from '@/contexts/auth';

interface CreateJobTabProps {
  setActiveTab: (tab: string) => void;
}

const CreateJobTab = ({ setActiveTab }: CreateJobTabProps) => {
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);
  const { toast } = useToast();
  const { userProfile } = useAuth();

  const handleJobSubmitSuccess = async (jobId: string) => {
    console.log("Job created successfully with ID:", jobId);
    setCreatedJobId(jobId);
    
    const companyName = userProfile?.company_name || 'An employer';
    const employerName = userProfile?.first_name 
      ? `${userProfile.first_name} ${userProfile.last_name || ''}`
      : 'An employer';
    
    // Notify admins and CEOs about the new job post
    try {
      await createAdminNotification(
        'New Job Posted',
        `${companyName} (${employerName}) has posted a new job that requires review.`,
        'job',
        `/jobs/${jobId}`,
        { jobId, employerName, companyName }
      );
      
      console.log('Admin and CEO notifications sent for new job post');
    } catch (error) {
      console.error('Failed to send admin/CEO notifications:', error);
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
