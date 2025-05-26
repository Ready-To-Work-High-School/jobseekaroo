
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { InfoIcon, BarChart, PieChart, LineChart, Lock, LogIn, UserPlus, TrendingUp, Users, Target, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { useFadeIn } from '@/utils/animations';
import { Link } from 'react-router-dom';

// Sample analytics data
const sampleJobApplicationData = [
  { month: 'Jan', applications: 45, interviews: 12, hires: 4 },
  { month: 'Feb', applications: 52, interviews: 18, hires: 6 },
  { month: 'Mar', applications: 38, interviews: 15, hires: 5 },
  { month: 'Apr', applications: 61, interviews: 22, hires: 8 },
  { month: 'May', applications: 55, interviews: 20, hires: 7 },
  { month: 'Jun', applications: 67, interviews: 25, hires: 9 },
];

const sampleSkillsData = [
  { skill: 'Customer Service', demand: 85, yourLevel: 78 },
  { skill: 'Computer Science', demand: 92, yourLevel: 65 },
  { skill: 'Communication', demand: 88, yourLevel: 82 },
  { skill: 'Teamwork', demand: 75, yourLevel: 90 },
  { skill: 'Problem Solving', demand: 89, yourLevel: 70 },
];

const sampleIndustryData = [
  { name: 'Retail', value: 35, color: '#0088FE' },
  { name: 'Food Service', value: 25, color: '#00C49F' },
  { name: 'Healthcare', value: 20, color: '#FFBB28' },
  { name: 'Technology', value: 20, color: '#FF8042' },
];

const Analytics = () => {
  const { userProfile, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    userType: 'student' as 'student' | 'employer' 
  });
  const fadeInAnimation = useFadeIn(300);
  
  // Determine what features the user has access to based on their role
  const getUserAccess = () => {
    const userType = userProfile?.user_type || 'student';
    
    switch(userType) {
      case 'admin':
        return {
          overview: true,
          skills: true,
          jobMarket: true,
          performance: true,
          advanced: true
        };
      case 'employer':
        return {
          overview: true,
          skills: true,
          jobMarket: true,
          performance: true,
          advanced: false
        };
      case 'student':
      default:
        return {
          overview: true,
          skills: true,
          jobMarket: false,
          performance: false,
          advanced: false
        };
    }
  };
  
  const access = getUserAccess();

  // If user is not authenticated, show sample analytics with sign-in/sign-up
  if (!user) {
    return (
      <Layout>
        <div className={`container max-w-6xl mx-auto py-8 ${fadeInAnimation}`}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Gain insights into your job search, skill development, and market trends
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sample Analytics Preview */}
            <div className="lg:col-span-2 space-y-6">
              <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                <InfoIcon className="h-4 w-4 text-blue-500" />
                <AlertTitle>Sample Analytics Dashboard</AlertTitle>
                <AlertDescription>
                  This is a preview of the analytics you'll have access to after signing in. Track your progress, skills, and market insights.
                </AlertDescription>
              </Alert>

              {/* Sample Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Applications</p>
                        <h3 className="text-2xl font-bold">42</h3>
                      </div>
                      <Target className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="text-xs text-green-600 mt-1">+12% this month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Interviews</p>
                        <h3 className="text-2xl font-bold">8</h3>
                      </div>
                      <Users className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="text-xs text-green-600 mt-1">+25% this month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Skills Score</p>
                        <h3 className="text-2xl font-bold">78%</h3>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                    <p className="text-xs text-green-600 mt-1">+5% this month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                        <h3 className="text-2xl font-bold">19%</h3>
                      </div>
                      <Clock className="h-8 w-8 text-orange-500" />
                    </div>
                    <p className="text-xs text-green-600 mt-1">+3% this month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Sample Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Application Progress</CardTitle>
                    <CardDescription>Your job search activity over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={sampleJobApplicationData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                          <Bar dataKey="interviews" fill="#82ca9d" name="Interviews" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Industry Opportunities</CardTitle>
                    <CardDescription>Job market distribution by industry</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={sampleIndustryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {sampleIndustryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills vs Market Demand</CardTitle>
                  <CardDescription>Compare your skills with industry demand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={sampleSkillsData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="skill" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="demand" fill="#8884d8" name="Market Demand" />
                        <Bar dataKey="yourLevel" fill="#82ca9d" name="Your Level" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sign In/Sign Up Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Access Full Analytics</CardTitle>
                  <CardDescription>
                    Sign in to unlock personalized insights and track your real progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="signin">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="signin">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="signin" className="space-y-4">
                      <form className="space-y-4">
                        <div>
                          <Label htmlFor="signin-email">Email address</Label>
                          <Input
                            id="signin-email"
                            type="email"
                            value={signInData.email}
                            onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                            placeholder="your.email@example.com"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="signin-password">Password</Label>
                          <Input
                            id="signin-password"
                            type="password"
                            value={signInData.password}
                            onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                            placeholder="Enter your password"
                          />
                        </div>
                        
                        <Button asChild className="w-full">
                          <Link to="/sign-in">
                            <LogIn className="h-4 w-4 mr-2" />
                            Go to Sign In Page
                          </Link>
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="signup" className="space-y-4">
                      <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={signUpData.firstName}
                              onChange={(e) => setSignUpData({...signUpData, firstName: e.target.value})}
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={signUpData.lastName}
                              onChange={(e) => setSignUpData({...signUpData, lastName: e.target.value})}
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="signup-email">Email address</Label>
                          <Input
                            id="signup-email"
                            type="email"
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                            placeholder="your.email@example.com"
                          />
                        </div>
                        
                        <div>
                          <Label>Account Type</Label>
                          <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="userType"
                                value="student"
                                checked={signUpData.userType === 'student'}
                                onChange={(e) => setSignUpData({...signUpData, userType: 'student'})}
                              />
                              <Users className="h-4 w-4" />
                              Student
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="userType"
                                value="employer"
                                checked={signUpData.userType === 'employer'}
                                onChange={(e) => setSignUpData({...signUpData, userType: 'employer'})}
                              />
                              <BarChart className="h-4 w-4" />
                              Employer
                            </label>
                          </div>
                        </div>
                        
                        <Button asChild className="w-full">
                          <Link to="/sign-in">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Go to Sign Up Page
                          </Link>
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">What You'll Get</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Real-time application tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Personalized skill recommendations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Industry trend analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Performance insights</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Resume optimization tips</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className={`container max-w-6xl mx-auto py-8 ${fadeInAnimation}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Gain insights into your job search, skill development, and market trends
          </p>
        </div>
        
        <Alert className="mb-6 bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-900 dark:text-blue-300">
          <InfoIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          <AlertTitle>Access Information</AlertTitle>
          <AlertDescription>
            Your account type ({userProfile?.user_type || 'student'}) gives you access to specific analytics features.
            Some features may be restricted based on your account type.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills Analytics</TabsTrigger>
            <TabsTrigger value="jobMarket" disabled={!access.jobMarket}>
              Job Market
              {!access.jobMarket && <Lock className="h-3 w-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="performance" disabled={!access.performance}>
              Performance
              {!access.performance && <Lock className="h-3 w-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="advanced" disabled={!access.advanced}>
              Advanced
              {!access.advanced && <Lock className="h-3 w-3 ml-1" />}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    What You Have Access To
                  </CardTitle>
                  <CardDescription>
                    Based on your account type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Personal skills tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Career path analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Basic job market insights</span>
                    </li>
                    {access.jobMarket && (
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Industry trend analysis</span>
                      </li>
                    )}
                    {access.performance && (
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Performance metrics</span>
                      </li>
                    )}
                    {access.advanced && (
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Advanced data analysis</span>
                      </li>
                    )}
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                      <span>Premium features (upgrade required)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Skills Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-48 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    Skills visualization coming soon
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-48 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    Progress tracking coming soon
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills Analytics</CardTitle>
                <CardDescription>Track your skill development progress</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  Detailed skills analytics coming soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="jobMarket">
            <Card>
              <CardHeader>
                <CardTitle>Job Market Insights</CardTitle>
                <CardDescription>Analyze industry trends and demands</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  Job market insights coming soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Track application success rates and interview performance</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  Performance metrics coming soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>Access premium analytics features</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  Advanced analytics features coming soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
