
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Analytics = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("applications");
  
  // Sample data for charts
  const applicationData = [
    { month: 'Jan', count: 2 },
    { month: 'Feb', count: 4 },
    { month: 'Mar', count: 6 },
    { month: 'Apr', count: 5 },
    { month: 'May', count: 8 },
    { month: 'Jun', count: 10 },
  ];
  
  const statusData = [
    { name: 'Applied', value: 14 },
    { name: 'Interview', value: 7 },
    { name: 'Rejected', value: 4 },
    { name: 'Offer', value: 3 },
  ];
  
  const skillsData = [
    { name: 'Customer Service', level: 8 },
    { name: 'Communication', level: 7 },
    { name: 'MS Office', level: 9 },
    { name: 'Problem Solving', level: 6 },
    { name: 'Time Management', level: 7 },
  ];
  
  const interviewData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 70 },
    { month: 'Mar', score: 75 },
    { month: 'Apr', score: 78 },
    { month: 'May', score: 82 },
    { month: 'Jun', score: 88 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Your Career Analytics</h1>
          <p className="text-muted-foreground">
            Track your progress and identify areas for improvement
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Applications</CardTitle>
              <CardDescription>Total job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28</div>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Interviews</CardTitle>
              <CardDescription>Interview invitations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">10</div>
              <p className="text-sm text-muted-foreground">35% success rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Skills</CardTitle>
              <CardDescription>Skills in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-sm text-muted-foreground">3 at advanced level</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="applications" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Activity</CardTitle>
                <CardDescription>
                  Track your job application submission trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={applicationData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Application Status Breakdown</CardTitle>
                <CardDescription>
                  Current status of all your job applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-6`}>
                  <div className="flex flex-col justify-center">
                    {statusData.map((entry, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-sm font-medium">{entry.name}: </span>
                        <span className="text-sm ml-1">{entry.value}</span>
                      </div>
                    ))}
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        Your interview rate is higher than average among your peers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Proficiency</CardTitle>
                <CardDescription>
                  Your current skill levels and development progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm">{skill.level}/10</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${skill.level * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-md">
                  <h4 className="text-sm font-medium text-blue-800">Skill Gap Analysis</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Based on your target jobs, focus on improving your Problem Solving skills.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Most In-Demand Skills</CardTitle>
                <CardDescription>
                  Popular skills requested in your job search area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Customer Service</Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Communication</Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Microsoft Office</Badge>
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Time Management</Badge>
                  <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">Data Entry</Badge>
                  <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Social Media</Badge>
                  <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">Team Collaboration</Badge>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Sales</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="interviews" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Interview Performance</CardTitle>
                <CardDescription>
                  Track your improvement in mock interviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={interviewData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Performance Insights</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your interview performance has improved by 23 points over the last 6 months.
                    Continue practicing common behavioral questions.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interview Question Practice</CardTitle>
                <CardDescription>
                  Questions you've practiced and areas for improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Behavioral Questions</span>
                      <Badge>16 Practiced</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Strong in discussing teamwork and problem-solving examples.
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Technical Questions</span>
                      <Badge>8 Practiced</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Focus more on MS Excel and data entry scenarios.
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Situational Questions</span>
                      <Badge>12 Practiced</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Good at customer service scenarios, improve on conflict resolution.
                    </p>
                  </div>
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
