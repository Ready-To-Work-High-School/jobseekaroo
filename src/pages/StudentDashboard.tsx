
import React from 'react';
import Layout from '../components/Layout';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, CalendarIcon } from 'lucide-react';
import JobRecommendations from '@/components/JobRecommendations';
import { Calendar } from '@/components/ui/calendar';
import { ApplicationsTab } from '@/components/dashboard/ApplicationsTab';
import { InterviewsTab } from '@/components/dashboard/InterviewsTab';
import { QuickActionsCard } from '@/components/dashboard/QuickActionsCard';

const StudentDashboard = () => {
  const fadeIn = useFadeIn(300);
  const { user, userProfile } = useAuth();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

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
                    <ApplicationsTab />
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
                    <InterviewsTab />
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

            <QuickActionsCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
