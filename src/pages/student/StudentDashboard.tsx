
import React from 'react';
import { useAuth } from '@/contexts/auth/useAuth';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Star, Clock, Medal } from 'lucide-react';
import { ApplicationsTab } from '@/components/dashboard/ApplicationsTab';

const StudentDashboard: React.FC = () => {
  const { user, userProfile } = useAuth();
  
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

  const initials = userProfile.first_name && userProfile.last_name 
    ? `${userProfile.first_name.charAt(0)}${userProfile.last_name.charAt(0)}`
    : user.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userProfile.avatar_url || undefined} alt={userProfile.first_name || 'User'} />
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold">
                    {userProfile.first_name} {userProfile.last_name}
                  </h3>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {userProfile.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                
                <Button asChild className="w-full mt-2">
                  <Link to="/student-profile">View Full Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Main Dashboard Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="applications">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>
              
              <TabsContent value="applications" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-blue-500" />
                      Job Applications
                    </CardTitle>
                    <CardDescription>
                      Track your current job applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ApplicationsTab />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="badges" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Medal className="h-5 w-5 text-amber-500" />
                      My Badges
                    </CardTitle>
                    <CardDescription>
                      Achievements and certifications you've earned
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userProfile.badges && userProfile.badges.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {userProfile.badges.map((badge, index) => (
                          <div key={index} className="flex flex-col items-center p-4 border rounded-lg">
                            <div className="p-3 bg-amber-100 rounded-full mb-2">
                              <Star className="h-6 w-6 text-amber-500" />
                            </div>
                            <h4 className="font-medium text-center">{badge.name}</h4>
                            <p className="text-xs text-muted-foreground text-center">
                              Earned: {new Date(badge.earned_at || '').toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Medal className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                        <p className="text-muted-foreground">You haven't earned any badges yet</p>
                        <Button asChild variant="outline" className="mt-4">
                          <Link to="/job-simulations">Complete Simulations</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recommended" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Recommended Jobs
                    </CardTitle>
                    <CardDescription>
                      Jobs that match your skills and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                          <h3 className="font-medium">Front-end Developer</h3>
                          <p className="text-sm text-muted-foreground">TechCorp</p>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/jobs/job-001">View</Link>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                          <h3 className="font-medium">Restaurant Host/Hostess</h3>
                          <p className="text-sm text-muted-foreground">Local Bistro</p>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/jobs/job-002">View</Link>
                        </Button>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/jobs">View All Jobs</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Find Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/jobs">Browse Job Listings</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview Prep</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/interview-prep">Practice Interviews</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Simulations</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/job-simulations">Try Simulations</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
