
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, BarChart, PieChart, LineChart, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFadeIn } from '@/utils/animations';

const Analytics = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
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
