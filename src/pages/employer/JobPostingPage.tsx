
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobPostForm from '@/components/employer/job/JobPostForm';
import JobPostSuccess from '@/components/employer/job/JobPostSuccess';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const JobPostingPage = () => {
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleJobSubmitSuccess = (jobId: string) => {
    console.log("Job created successfully with ID:", jobId);
    setCreatedJobId(jobId);
    
    toast({
      title: "Job Posted Successfully",
      description: "Your job posting is now live and visible to potential candidates."
    });
  };

  const handleCancel = () => {
    navigate("/employer/dashboard");
  };

  const handleContinue = () => {
    navigate("/employer/dashboard");
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Job | JobSeeker4HS</title>
      </Helmet>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
        
        {createdJobId ? (
          <JobPostSuccess 
            jobId={createdJobId}
            onContinue={handleContinue}
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <JobPostForm
                onSuccess={handleJobSubmitSuccess}
                onCancel={handleCancel}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default JobPostingPage;
