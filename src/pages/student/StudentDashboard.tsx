
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth/useAuth';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Star, Clock, Medal, TrendingUp, Calendar, Bell, ArrowRight } from 'lucide-react';
import { ApplicationsTab } from '@/components/dashboard/ApplicationsTab';
import { format } from 'date-fns';

const StudentDashboard: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [progress, setProgress] = useState(65);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
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
    
  // Upcoming events - mock data
  const upcomingEvents = [
    { id: 1, title: "Interview with TechCorp", date: "2025-05-10T14:00:00", type: "interview" },
    { id: 2, title: "Resume Review Session", date: "2025-05-08T11:30:00", type: "session" },
    { id: 3, title: "Application Deadline: Developer Role", date: "2025-05-15T23:59:59", type: "deadline" }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-lg border border-purple-100 dark:border-purple-900/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Welcome back, {userProfile.first_name}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Your career journey dashboard • {format(new Date(), 'MMMM d, yyyy')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline" className="border-purple-200 hover:border-purple-300">
                <Link to="/student-profile">View Profile</Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/jobs">Find Jobs</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden mb-6 border-purple-100 dark:border-purple-900/20">
              <div className="h-24 bg-gradient-to-r from-purple-500 to-blue-600 relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              </div>
              <CardContent className="pt-0 -mt-12">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 border-4 border-background ring-2 ring-purple-500/20">
                    <AvatarImage src={userProfile.avatar_url || undefined} alt={userProfile.first_name || 'User'} />
                    <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-semibold mt-4">
                    {userProfile.first_name} {userProfile.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  
                  {/* Profile completion */}
                  <div className="w-full mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Profile Completion</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="progress-lavender-gold-purple h-2" />
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {userProfile.skills && userProfile.skills.length > 0 ? (
                      userProfile.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <div className="text-center text-sm text-muted-foreground">
                        Add skills to your profile
                      </div>
                    )}
                    {userProfile.skills && userProfile.skills.length > 3 && (
                      <Badge variant="outline">+{userProfile.skills.length - 3} more</Badge>
                    )}
                  </div>
                  
                  <Button asChild variant="outline" className="w-full mt-6" size="sm">
                    <Link to="/student-profile">Edit Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Badges Card */}
            <Card className="border-purple-100 dark:border-purple-900/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-amber-500" />
                  Recent Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userProfile.badges && userProfile.badges.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {userProfile.badges.slice(0, 4).map((badge, index) => (
                      <div key={index} className="flex flex-col items-center p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-full mb-2">
                          <Star className="h-5 w-5 text-amber-500" />
                        </div>
                        <h4 className="font-medium text-sm text-center">{badge.name}</h4>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Medal className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-30" />
                    <p className="text-sm text-muted-foreground">Complete activities to earn badges</p>
                    <Button asChild variant="ghost" size="sm" className="mt-2">
                      <Link to="/job-simulations">Try Simulations</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" size="sm" className="w-full gap-1">
                  <Link to="/student-profile?tab=badges">
                    View All Badges <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="applications" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
              
              <TabsContent value="applications" className="space-y-6">
                <Card className="border-purple-100 dark:border-purple-900/20">
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
                  <CardFooter>
                    <Button asChild variant="outline" size="sm" className="w-full gap-1">
                      <Link to="/jobs">
                        Browse New Jobs <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Application Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">12</div>
                        <Briefcase className="h-4 w-4 text-blue-500" />
                      </div>
                      <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">4 in the last 7 days</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Interviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">3</div>
                        <Calendar className="h-4 w-4 text-emerald-500" />
                      </div>
                      <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-1">Next one in 2 days</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">Response Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">42%</div>
                        <TrendingUp className="h-4 w-4 text-amber-500" />
                      </div>
                      <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">+12% from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="recommended">
                <Card className="border-purple-100 dark:border-purple-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      Recommended Jobs
                    </CardTitle>
                    <CardDescription>
                      Jobs that match your skills and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors group">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Front-end Developer</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            TechCorp
                            <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
                            Remote
                          </p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">React</Badge>
                            <Badge variant="outline" className="text-xs">TypeScript</Badge>
                          </div>
                        </div>
                        <Button asChild size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to="/jobs/job-001">View</Link>
                        </Button>
                      </div>
                    
                      <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors group">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Restaurant Host/Hostess</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            Local Bistro
                            <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
                            San Francisco, CA
                          </p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">Customer Service</Badge>
                            <Badge variant="outline" className="text-xs">Part-time</Badge>
                          </div>
                        </div>
                        <Button asChild size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to="/jobs/job-002">View</Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors group">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Marketing Assistant</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            Creative Co
                            <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
                            Hybrid
                          </p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">Social Media</Badge>
                            <Badge variant="outline" className="text-xs">Content</Badge>
                          </div>
                        </div>
                        <Button asChild size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to="/jobs/job-003">View</Link>
                        </Button>
                      </div>
                      
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/jobs">View All Jobs</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="upcoming">
                <Card className="border-purple-100 dark:border-purple-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      Upcoming Events
                    </CardTitle>
                    <CardDescription>
                      Interviews, deadlines and scheduled activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex gap-4 p-4 border rounded-lg">
                          <div className={`p-2 rounded ${
                            event.type === 'interview' 
                              ? 'bg-blue-100 dark:bg-blue-900/20' 
                              : event.type === 'session' 
                              ? 'bg-purple-100 dark:bg-purple-900/20' 
                              : 'bg-amber-100 dark:bg-amber-900/20'
                          }`}>
                            {event.type === 'interview' && <Calendar className="h-5 w-5 text-blue-600" />}
                            {event.type === 'session' && <GraduationCap className="h-5 w-5 text-purple-600" />}
                            {event.type === 'deadline' && <Clock className="h-5 w-5 text-amber-600" />}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(event.date), 'MMMM d, yyyy • h:mm a')}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">Prepare</Button>
                        </div>
                      ))}
                      
                      <Button asChild variant="outline" className="w-full gap-1">
                        <Link to="/calendar">
                          View Full Calendar <ArrowRight className="h-4 w-4" />
                        </Link>
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
          <Card className="border-purple-100 dark:border-purple-900/20 transition-all hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Find Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/jobs">Browse Job Listings</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-purple-100 dark:border-purple-900/20 transition-all hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interview Prep</CardTitle>
              <Clock className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/interview-prep">Practice Interviews</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-purple-100 dark:border-purple-900/20 transition-all hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Job Simulations</CardTitle>
              <GraduationCap className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
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
