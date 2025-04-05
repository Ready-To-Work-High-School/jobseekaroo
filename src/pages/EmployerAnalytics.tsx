
import React from 'react';
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  Pie, 
  Cell,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

const EmployerAnalytics = () => {
  const isMobile = useIsMobile();
  const { userProfile } = useAuth();
  
  const applicationData = [
    { name: 'Applied', value: 42 },
    { name: 'Viewed', value: 78 },
    { name: 'Interviewed', value: 18 },
    { name: 'Hired', value: 5 }
  ];
  
  const demographicData = [
    { name: '16 years', students: 24 },
    { name: '17 years', students: 37 },
    { name: '18 years', students: 29 },
  ];
  
  const skillsData = [
    { name: 'Customer Service', value: 65 },
    { name: 'Communication', value: 58 },
    { name: 'Computer Skills', value: 42 },
    { name: 'Time Management', value: 38 },
    { name: 'Problem Solving', value: 35 }
  ];
  
  const timelineData = [
    { month: 'Jan', applications: 18, interviews: 5 },
    { month: 'Feb', applications: 22, interviews: 7 },
    { month: 'Mar', applications: 28, interviews: 10 },
    { month: 'Apr', applications: 32, interviews: 12 },
    { month: 'May', applications: 37, interviews: 15 },
    { month: 'Jun', applications: 42, interviews: 18 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <ProtectedRoute requiredRoles={['employer', 'admin']}>
      <Layout>
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Employer Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Track performance metrics and understand your applicant pool
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Job Views</h3>
              <p className="text-3xl font-bold">238</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Applications Received</h3>
              <p className="text-3xl font-bold">42</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
            </Card>
            <Card className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Avg. Time to Apply</h3>
              <p className="text-3xl font-bold">3.2 days</p>
              <p className="text-xs text-amber-600 mt-1">↓ 0.5 days from last month</p>
            </Card>
          </div>
          
          <Tabs defaultValue="applications" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="skills">Skills Distribution</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Application Status Distribution</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    {isMobile ? (
                      <BarChart
                        width={500}
                        height={300}
                        data={applicationData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" name="Applicants" />
                      </BarChart>
                    ) : (
                      <PieChart width={400} height={400}>
                        <Pie
                          data={applicationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {applicationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="demographics">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Age Distribution of Applicants</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={demographicData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students" fill="#82ca9d" name="Number of Students" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="skills">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Top Skills Among Applicants</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={skillsData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name="Percentage of Applicants" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="timeline">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Applications Over Time</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={500}
                      height={300}
                      data={timelineData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="applications" stroke="#8884d8" activeDot={{ r: 8 }} name="Applications" />
                      <Line type="monotone" dataKey="interviews" stroke="#82ca9d" name="Interviews" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-md">
            <h3 className="font-medium text-lg mb-2">Premium Analytics Features</h3>
            <p className="text-muted-foreground mb-4">
              Unlock additional insights with our premium analytics package:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li>Detailed applicant skill mapping</li>
              <li>Student performance predictions</li>
              <li>Competitor job posting analysis</li>
              <li>Custom report generation</li>
              <li>Interactive data visualization tools</li>
            </ul>
            <Button>Upgrade to Premium</Button>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default EmployerAnalytics;
