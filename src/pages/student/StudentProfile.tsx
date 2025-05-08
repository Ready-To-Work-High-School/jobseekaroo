
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, GraduationCap, Briefcase, MapPin, Clock, CheckCircle, BookOpen, Star, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import ProfileForm from '@/components/profile/ProfileForm';
import EnhancedSeparator from '@/components/shared/EnhancedSeparator';
import UserBadges from '@/components/badges/UserBadges';
import { useUserBadges } from '@/hooks/use-user-badges';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const StudentProfile = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const { badges, isLoading: badgesLoading } = useUserBadges();

  // Fetch job applications for the current user
  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ['jobApplications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  // Fetch completed simulations
  const { data: completedSimulations, isLoading: simulationsLoading } = useQuery({
    queryKey: ['completedSimulations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_simulation_progress')
        .select('*, job_simulations(*)')
        .eq('user_id', user.id)
        .eq('completed', true);
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  // Fetch earned credentials
  const { data: credentials, isLoading: credentialsLoading } = useQuery({
    queryKey: ['credentials', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('simulation_credentials')
        .select('*, job_simulations(*)')
        .eq('user_id', user.id);
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  if (!user || !userProfile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              Please sign in to view your profile
            </p>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="animate-fade-in user-profile">
          <Card className="overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-purple-500 via-blue-500 to-blue-600">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="absolute -bottom-12 left-6">
                <Avatar className="h-24 w-24 border-4 border-background ring-2 ring-purple-500/20 animate-scale-in">
                  <AvatarImage src={userProfile.avatar_url || ''} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-xl">
                    {userProfile.first_name?.[0]}{userProfile.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {/* Enhanced Inception Member badge if applicable */}
              {userProfile.created_at && new Date(userProfile.created_at) >= new Date('2025-01-01') && 
               new Date(userProfile.created_at) <= new Date('2026-12-31') && (
                <div className="absolute -right-5 top-0 rotate-45 z-10">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm py-1.5 px-10 shadow-lg font-bold">
                    FOUNDING MEMBER
                  </div>
                </div>
              )}
            </div>
            
            <div className="pt-16 px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                    {userProfile.first_name} {userProfile.last_name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <GraduationCap className="h-4 w-4 text-purple-500" />
                    <span>Student</span>
                    {userProfile.location && (
                      <>
                        <span>•</span>
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>{userProfile.location}</span>
                      </>
                    )}
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 transition-all duration-300">
                  Edit Profile
                </Button>
              </div>

              {userProfile.bio && (
                <p className="mt-4 text-muted-foreground">
                  {userProfile.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {userProfile.skills?.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className="bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-colors animate-fade-in"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              
              {/* Display badges */}
              {!badgesLoading && (
                <div className="mt-4">
                  <UserBadges badges={badges} />
                </div>
              )}
            </div>
          </Card>
        </div>

        <EnhancedSeparator />

        <div className="animate-fade-in">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="applications">Job Applications</TabsTrigger>
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              <TabsTrigger value="simulations">Simulations</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <ProfileForm 
                user={user}
                userProfile={userProfile}
                isEditing={false}
              />
            </TabsContent>
            
            {/* New Job Applications Tab */}
            <TabsContent value="applications">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="h-5 w-5 text-blue-500" />
                    <h2 className="text-xl font-semibold">Job Applications</h2>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  {applicationsLoading ? (
                    <p className="text-muted-foreground">Loading applications...</p>
                  ) : applications && applications.length > 0 ? (
                    <div className="space-y-4">
                      {applications.map((application) => (
                        <div key={application.id} className="border rounded-md p-4 hover:bg-slate-50 dark:hover:bg-slate-900/40">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{application.job_title}</h3>
                              <p className="text-sm text-muted-foreground">{application.company}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                Applied {new Date(application.applied_date).toLocaleDateString()}
                              </span>
                              <Badge 
                                variant={
                                  application.status === 'hired' ? 'success' : 
                                  application.status === 'interview' ? 'info' :
                                  application.status === 'rejected' ? 'destructive' : 'outline'
                                }
                              >
                                {application.status}
                              </Badge>
                            </div>
                          </div>
                          {application.next_step && (
                            <div className="mt-2 flex items-center text-sm">
                              <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
                              <span>Next: {application.next_step}</span>
                              {application.next_step_date && (
                                <span className="ml-1 text-muted-foreground">
                                  ({new Date(application.next_step_date).toLocaleDateString()})
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Job Applications Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start applying to jobs to track your application progress.
                      </p>
                      <Button asChild>
                        <Link to="/jobs">Browse Jobs</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* New Credentials Tab */}
            <TabsContent value="credentials">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-amber-500" />
                    <h2 className="text-xl font-semibold">Earned Credentials</h2>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  {credentialsLoading ? (
                    <p className="text-muted-foreground">Loading credentials...</p>
                  ) : credentials && credentials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {credentials.map((credential) => (
                        <div key={credential.id} className="border rounded-md p-4 bg-gradient-to-br from-amber-50 to-white hover:from-amber-100 hover:to-amber-50 dark:from-amber-900/10 dark:to-transparent">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-5 w-5 text-amber-500" />
                            <h3 className="font-medium">{credential.job_simulations?.title || 'Credential'}</h3>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Issued: {new Date(credential.issue_date).toLocaleDateString()}
                          </div>
                          <div className="text-sm mt-1">
                            <span className="font-medium text-amber-700 dark:text-amber-400">Certificate ID:</span> {credential.certificate_id.substring(0, 8)}...
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Credentials Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Complete job simulations to earn credentials you can showcase to employers.
                      </p>
                      <Button asChild>
                        <Link to="/job-simulations">Browse Simulations</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* New Simulations Tab */}
            <TabsContent value="simulations">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <h2 className="text-xl font-semibold">Completed Simulations</h2>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  {simulationsLoading ? (
                    <p className="text-muted-foreground">Loading simulations...</p>
                  ) : completedSimulations && completedSimulations.length > 0 ? (
                    <div className="space-y-4">
                      {completedSimulations.map((simulation) => (
                        <div key={simulation.id} className="border rounded-md p-4 hover:bg-slate-50 dark:hover:bg-slate-900/40">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{simulation.job_simulations?.title}</h3>
                              <p className="text-sm text-muted-foreground">{simulation.job_simulations?.category}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground flex items-center">
                                <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
                                Completed {new Date(simulation.completed_at || '').toLocaleDateString()}
                              </span>
                              <Badge variant="success">100%</Badge>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {simulation.job_simulations?.skills_gained?.map((skill, i) => (
                              <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Completed Simulations</h3>
                      <p className="text-muted-foreground mb-4">
                        Try our job simulations to gain practical experience and earn credentials.
                      </p>
                      <Button asChild>
                        <Link to="/job-simulations">Start a Simulation</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card className="p-6 transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-5 w-5 text-purple-500" />
                  <h2 className="text-xl font-semibold">Education & Certifications</h2>
                </div>
                <p className="text-muted-foreground">
                  Add your education history and certifications to showcase your qualifications.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
