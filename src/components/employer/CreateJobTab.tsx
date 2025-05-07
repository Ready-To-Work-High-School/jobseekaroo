
import { useState } from 'react';
import JobPostForm from './job/JobPostForm';
import JobPostSuccess from './job/JobPostSuccess';
import { useToast } from '@/hooks/use-toast';

interface CreateJobTabProps {
  setActiveTab: (tab: string) => void;
}

const CreateJobTab = ({ setActiveTab }: CreateJobTabProps) => {
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleJobSubmitSuccess = (jobId: string) => {
    console.log("Job created successfully with ID:", jobId);
    setCreatedJobId(jobId);
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
