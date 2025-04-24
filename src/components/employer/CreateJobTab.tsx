
import { useState } from 'react';
import JobPostForm from './job/JobPostForm';
import JobPostSuccess from './job/JobPostSuccess';

const CreateJobTab = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);

  if (createdJobId) {
    return (
      <JobPostSuccess 
        jobId={createdJobId}
        onContinue={() => {
          setCreatedJobId(null);
          setActiveTab("postings");
        }}
      />
    );
  }

  return (
    <JobPostForm
      onSuccess={setCreatedJobId}
      onCancel={() => setActiveTab("postings")}
    />
  );
};

export default CreateJobTab;
