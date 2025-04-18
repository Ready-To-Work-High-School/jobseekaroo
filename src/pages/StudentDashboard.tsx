
import React from 'react';
import Layout from '../components/Layout';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import JobRecommendations from '@/components/JobRecommendations';
import { Calendar } from '@/components/ui/calendar';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle,
  Calendar as CalendarIcon,
  MessageSquare,
  ListTodo,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const StudentDashboard = () => {
  const fadeIn = useFadeIn(300);
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Fetch applications
  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ['applications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Fetch unread messages count
  const { data: unreadCount } = useQuery({
    queryKey: ['unread-messages', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', user.id)
        .eq('is_read', false);
      if (error) throw error;
      return count || 0;
    },
    enabled: !!user,
  });

  // Fetch upcoming interviews and related job information
  const { data: upcomingInterviews, isLoading: interviewsLoading } = useQuery({
    queryKey: ['interviews', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // First get the interviews
      const { data: interviewsData, error: interviewsError } = await supabase
        .from('interviews')
        .select('*')
        .eq('candidate_id', user.id)
        .gte('scheduled_time', new Date().toISOString())
        .order('scheduled_time', { ascending: true })
        .limit(5);
      
      if (interviewsError) throw interviewsError;
      if (!interviewsData || interviewsData.length === 0) return [];
      
      // For each interview, get the job information to display the job title
      const interviewsWithJobDetails = await Promise.all(
        interviewsData.map(async (interview) => {
          const { data: jobData, error: jobError } = await supabase
            .from('jobs')
            .select('title')
            .eq('id', interview.job_id)
            .single();
            
          return {
            ...interview,
            job_title: jobData?.title || 'Upcoming Interview'
          };
        })
      );
      
      return interviewsWithJobDetails;
    },
    enabled: !!user,
  });

  if (!user || !userProfile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              Please sign in to view your dashboard
            </p>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {userProfile.first_name}!</h1>
            <p className="text-muted-foreground mt-2">
              Track your progress and explore opportunities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="applications">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="recommendations">Job Matches</TabsTrigger>
                <TabsTrigger value="interviews">Interviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      Your Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {applicationsLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    ) : applications?.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          You haven't applied to any jobs yet
                        </p>
                        <Button asChild>
                          <Link to="/jobs">Browse Jobs</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {applications?.slice(0, 5).map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h3 className="font-medium">{app.job_title}</h3>
                              <p className="text-sm text-muted-foreground">{app.company}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{format(new Date(app.applied_date), 'MMM d, yyyy')}</span>
                              <Button variant="outline" size="sm" asChild>
                                <Link to="/applications">View</Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                        {(applications?.length || 0) > 5 && (
                          <Button variant="link" asChild className="w-full">
                            <Link to="/applications">View All Applications</Link>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <JobRecommendations limit={5} showReason={true} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Interviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {interviewsLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    ) : upcomingInterviews?.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">
                        No upcoming interviews scheduled
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {upcomingInterviews?.map((interview) => (
                          <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h3 className="font-medium">{interview.job_title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(interview.scheduled_time), 'MMM d, yyyy - h:mm a')}
                              </p>
                            </div>
                            {interview.meeting_link && (
                              <Button size="sm" asChild>
                                <a href={interview.meeting_link} target="_blank" rel="noopener noreferrer">
                                  Join Meeting
                                </a>
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                    Calendar
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to="/messages" className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                    {unreadCount ? (
                      <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                        {unreadCount}
                      </span>
                    ) : null}
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to="/applications" className="flex items-center">
                    <ListTodo className="mr-2 h-4 w-4" />
                    Track Applications
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to="/student-profile" className="flex items-center">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Update Profile
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to="/job-simulations" className="flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    Job Simulations
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
