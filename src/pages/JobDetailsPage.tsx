import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock, DollarSign, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getJobById } from '@/lib/supabase/jobs';

const JobDetailsPage = () => {
  const { id } = useParams(); // Fixed: use 'id' instead of 'jobId'
  const { toast } = useToast();
  const { user } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        console.log('Fetching job with ID:', id);
        const jobData = await getJobById(id);
        console.log('Job data received:', jobData);
        
        if (jobData) {
          setJob(jobData);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        toast({
          title: "Error",
          description: "Failed to load job details",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Add a small delay to show loading state
    setTimeout(() => {
      fetchJob();
    }, 500);
  }, [id, toast]);

  // If user is not authenticated, show sign-in prompt
  if (!user) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="pt-6 pb-6 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Sign In Required</h2>
                <p className="text-muted-foreground mb-6">
                  Please sign in or create an account to view job details and apply for positions.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild>
                    <Link to="/sign-in">Sign In</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }
  
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
                  <Link to="/jobs">Browse Other Jobs</Link>
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
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4"
            asChild
          >
            <Link to="/jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Link>
          </Button>

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
                  {job.job_type}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  ${job.pay_rate_min} - ${job.pay_rate_max}/{job.pay_rate_period}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <p>{job.description}</p>
              </div>
              
              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.requirements.map((req: string, index: number) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.is_remote && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900">Remote Work Available</h4>
                  <p className="text-blue-700 text-sm">This position offers remote work options.</p>
                </div>
              )}

              {job.is_flexible && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900">Flexible Schedule</h4>
                  <p className="text-purple-700 text-sm">This position offers flexible scheduling options.</p>
                </div>
              )}
              
              <Button className="w-full" size="lg">Apply Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetailsPage;
