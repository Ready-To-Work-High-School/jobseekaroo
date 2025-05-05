
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, Download, ExternalLink } from 'lucide-react';
import { getUserCredentials } from '@/lib/supabase/simulations';
import { toast } from 'sonner';

const UserCredentials = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch user credentials with proper caching
  const { data: credentials, isLoading } = useQuery({
    queryKey: ['userCredentials', user?.id],
    queryFn: () => user ? getUserCredentials(user.id) : Promise.reject('Not authenticated'),
    enabled: !!user,
    staleTime: 60000, // Cache for 1 minute to prevent constant refetching
  });
  
  const handleDownload = (credentialId: string) => {
    // This would typically generate a PDF certificate
    toast.success("Your certificate is being generated", {
      description: "The download will start momentarily"
    });
  };
  
  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in to view your credentials</h1>
          <p className="mb-8">You need to be signed in to view your earned credentials.</p>
          <Button onClick={() => navigate('/sign-in')}>Sign In</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your Credentials</h1>
              <p className="text-muted-foreground">
                Certificates and credentials earned through job simulations
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/6"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : credentials && credentials.length > 0 ? (
            <div className="space-y-6">
              {credentials.map((credential) => (
                <Card key={credential.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100">
                          <Award className="h-5 w-5 text-blue-700" />
                        </div>
                        <CardTitle>{credential.job_simulations?.title || 'Job Simulation'}</CardTitle>
                      </div>
                      <Badge>
                        Certificate #{credential.certificate_id.split('-')[1]}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span>Issued on {format(new Date(credential.issue_date), 'MMM dd, yyyy')}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      This certifies that you have successfully completed the {credential.job_simulations?.title || 'job simulation'} simulation
                      and demonstrated proficiency in the required skills.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {credential.job_simulations?.skills_gained?.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      )) || (
                        <Badge variant="secondary">Simulation Skills</Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(credential.id)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download PDF
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/job-simulations/${credential.simulation_id}`)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Simulation
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Award className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Credentials Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Complete job simulations to earn certificates that showcase your skills.
                </p>
                <Button onClick={() => navigate('/job-simulations')}>
                  Browse Job Simulations
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserCredentials;
