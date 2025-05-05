import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/auth';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { getUserSimulationCredentials } from '@/lib/supabase/simulations';

const UserCredentials = () => {
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();

  // Fetch user's simulation credentials
  const { data: credentials, isLoading } = useQuery({
    queryKey: ['userCredentials', user?.id],
    queryFn: () => (user?.id ? getUserSimulationCredentials(user.id) : []),
    enabled: !!user?.id,
  });

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Credentials & Badges</h1>
          <p className="text-muted-foreground mt-2">
            View and share your earned certifications and badges
          </p>
        </div>

        {/* Simulation Credentials Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-6 w-6 text-amber-500" />
            <h2 className="text-2xl font-semibold">Simulation Credentials</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-7 w-48 bg-gray-200 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-20 bg-gray-200 rounded"></div>
                      <div className="h-6 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : credentials && credentials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {credentials.map((credential) => (
                <Card key={credential.id} className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <Badge variant="outline" className="w-fit mb-1 text-xs bg-amber-50 text-amber-800 border-amber-200">
                      <Award className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                    <CardTitle>{credential.job_simulations?.title || 'Simulation'} Credential</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Issued {new Date(credential.issue_date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      You've successfully demonstrated skills in {credential.job_simulations?.category || 'this field'} 
                      by completing all required tasks.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {credential.job_simulations?.skills_gained?.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Certificate
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center p-8">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-amber-500" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">No Credentials Yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Complete job simulations to earn credentials that showcase your skills to potential employers.
              </p>
              <Button onClick={() => window.location.href = '/job-simulations'}>
                Browse Simulations
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          )}
        </div>

        {/* Badges Section */}
        {user?.id && (
          <div>
            <UserBadges 
              badges={[]} 
              showTitle={true} 
              className="mt-10"
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserCredentials;
