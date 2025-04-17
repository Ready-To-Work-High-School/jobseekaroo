
import React from 'react';
import Layout from '../components/Layout';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import JobRecommendations from '@/components/JobRecommendations';
import { Briefcase, GraduationCap, Award, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const StudentDashboard = () => {
  const fadeIn = useFadeIn(300);
  const { user, userProfile } = useAuth();

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {userProfile?.first_name || 'Student'}! Track your progress and explore opportunities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="recommendations">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="progress">My Progress</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommendations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      Recommended Jobs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <JobRecommendations limit={5} showReason={true} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="progress">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                      Your Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Start a job simulation or skill course to track your progress here.
                      </p>
                      <div className="mt-4 flex gap-4 justify-center">
                        <Button asChild variant="outline">
                          <Link to="/job-simulations">Explore Job Simulations</Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link to="/skill-development">Build Skills</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 hover:border-blue-200 transition-colors">
                        <h3 className="font-medium mb-2">Resume Building</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Create a standout resume with our templates and AI assistance.
                        </p>
                        <Button asChild size="sm" variant="outline">
                          <Link to="/resume-builder">Build Resume</Link>
                        </Button>
                      </div>
                      <div className="border rounded-md p-4 hover:border-blue-200 transition-colors">
                        <h3 className="font-medium mb-2">Interview Prep</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Practice with our AI-powered interview simulator.
                        </p>
                        <Button asChild size="sm" variant="outline">
                          <Link to="/interview-prep">Practice Now</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">
                    Complete job simulations and skill courses to earn badges.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/job-simulations">Start Earning Badges</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to="/jobs" className="flex items-center">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Browse All Jobs
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to="/job-simulations" className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Try a Job Simulation
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link to="/applications" className="flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    Track Applications
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
