
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { BarChart3, Download, FileBarChart, FileSpreadsheet, Users, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Sample data for charts
const applicationsData = [
  { name: 'Jan', applications: 10, interviews: 4, hires: 1 },
  { name: 'Feb', applications: 15, interviews: 8, hires: 3 },
  { name: 'Mar', applications: 12, interviews: 6, hires: 2 },
  { name: 'Apr', applications: 18, interviews: 10, hires: 4 },
  { name: 'May', applications: 22, interviews: 12, hires: 5 },
  { name: 'Jun', applications: 25, interviews: 15, hires: 6 },
];

const sourcesData = [
  { name: 'Website', value: 45 },
  { name: 'School Referral', value: 25 },
  { name: 'Social Media', value: 20 },
  { name: 'Job Fair', value: 10 },
];

const skillsMatchData = [
  { name: 'Retail Associate', match: 85 },
  { name: 'Admin Assistant', match: 72 },
  { name: 'Customer Service', match: 90 },
  { name: 'Sales Associate', match: 65 },
  { name: 'Warehouse', match: 45 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PerformanceAnalyticsTab = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('6months');
  
  // Stats cards
  const stats = [
    { 
      title: "Total Applications", 
      value: 102, 
      change: "+15%", 
      trend: "up", 
      description: "from last month" 
    },
    { 
      title: "Interview Rate", 
      value: "48%", 
      change: "+5%", 
      trend: "up", 
      description: "from last month" 
    },
    { 
      title: "Hiring Rate", 
      value: "22%", 
      change: "-3%", 
      trend: "down", 
      description: "from last month" 
    },
    { 
      title: "Average Skill Match", 
      value: "72%", 
      change: "+2%", 
      trend: "up", 
      description: "from last month" 
    },
  ];

  return (
    <Card>
      <CardHeader className="bg-blue-50 border-b">
        <div className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
          <CardTitle>Performance Analytics</CardTitle>
        </div>
        <CardDescription>
          Access analytics on job posting performance and candidate engagement
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center space-x-2">
            <Select 
              defaultValue={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className={`rounded-full p-1 ${
                    stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    {stat.trend === 'up' ? 
                      <ArrowUpRight className="h-4 w-4 text-green-600" /> :
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    }
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Applications Over Time */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Application Funnel</CardTitle>
              <CardDescription>Applications, interviews and hires over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={applicationsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                    <Bar dataKey="interviews" fill="#82ca9d" name="Interviews" />
                    <Bar dataKey="hires" fill="#ffc658" name="Hires" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Application Sources */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Application Sources</CardTitle>
              <CardDescription>Where your applicants are coming from</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourcesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Skill Match By Position */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Skill Match by Position</CardTitle>
              <CardDescription>Average candidate skill match score</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={skillsMatchData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="match" fill="#8884d8" name="Skill Match %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Time to Hire */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Time to Hire Trend</CardTitle>
              <CardDescription>Average days from application to hire</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Jan', days: 22 },
                      { month: 'Feb', days: 20 },
                      { month: 'Mar', days: 18 },
                      { month: 'Apr', days: 15 },
                      { month: 'May', days: 12 },
                      { month: 'Jun', days: 10 },
                    ]}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="days" stroke="#8884d8" name="Days to Hire" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Data last updated: {new Date().toLocaleDateString()}
        </div>
        
        <div className="flex">
          <Button variant="outline" size="sm" className="mr-2">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button size="sm">
            <FileBarChart className="h-4 w-4 mr-2" />
            Full Analytics
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PerformanceAnalyticsTab;
