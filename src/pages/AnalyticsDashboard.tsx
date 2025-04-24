
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, PieChart, Users, Calendar, TrendingUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFadeIn } from '@/utils/animations';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const fadeIn = useFadeIn(300);

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-6 ${fadeIn}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild className="p-0 mr-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline">Export Report</Button>
            <Button variant="outline">Print View</Button>
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">6 closing soon</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.3%</div>
                  <p className="text-xs text-muted-foreground">+2.1% from last week</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Applications by Department</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <PieChart className="h-48 w-48 text-muted-foreground/60" />
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Monthly Activity</CardTitle>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <BarChart className="h-48 w-48 text-muted-foreground/60" />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Applications Over Time</CardTitle>
                <CardDescription>Daily application submissions for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <LineChart className="h-72 w-72 text-muted-foreground/60" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications" className="h-96 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <BarChart className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Application Data</h3>
              <p>Detailed application statistics will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="h-96 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Users className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium">User Engagement</h3>
              <p>User engagement metrics will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="h-96 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Market Trends</h3>
              <p>Industry and hiring trends will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AnalyticsDashboard;
