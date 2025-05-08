
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const { toast } = useToast();
  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch the job by ID from your API
    setIsLoading(true);
    
    // Mock data for now
    setTimeout(() => {
      setJob({
        id: jobId,
        title: 'Mock Job Position',
        company_name: 'Example Company',
        location_city: 'Springfield',
        location_state: 'IL',
        description: 'This is a placeholder job description since the API is not yet implemented.',
        pay_rate_min: 15,
        pay_rate_max: 25,
        hours_per_week: 20,
        requirements: ['Teamwork', 'Good communication', 'Punctuality'],
        posted_at: new Date().toISOString()
      });
      
      setIsLoading(false);
      
      toast({
        title: 'Job Details Loaded',
        description: 'Viewing details for job ID: ' + jobId
      });
    }, 1000);
  }, [jobId]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="max-w-3xl mx-auto">
            <p className="text-center py-12">Loading job details...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!job) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="pt-6 pb-6 text-center">
                <h2 className="text-xl font-bold mb-2">Job Not Found</h2>
                <p className="text-muted-foreground">
                  We couldn't find the job you're looking for.
                </p>
                <Button className="mt-4" asChild>
                  <a href="/jobs">Browse Other Jobs</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{job.title}</CardTitle>
              <div className="text-lg font-medium">{job.company_name}</div>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location_city}, {job.location_state}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {job.hours_per_week} hrs/week
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  ${job.pay_rate_min} - ${job.pay_rate_max}/hr
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <p>{job.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements.map((req: string) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <Button className="w-full">Apply Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetailsPage;
