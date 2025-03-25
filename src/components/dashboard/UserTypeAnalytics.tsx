import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Loader2 } from 'lucide-react';

interface AnalyticsProps {
  className?: string;
}

const UserTypeAnalytics: React.FC<AnalyticsProps> = ({ className }) => {
  const { userProfile } = useAuth();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getAnalyticsData = () => {
    switch (userProfile?.user_type) {
      case 'student':
        return {
          applicationData: [
            { month: 'Jan', count: 2 },
            { month: 'Feb', count: 4 },
            { month: 'Mar', count: 6 },
            { month: 'Apr', count: 5 },
            { month: 'May', count: 8 },
            { month: 'Jun', count: 10 },
          ],
          skillsData: [
            { name: 'Communication', value: 8 },
            { name: 'Teamwork', value: 7 },
            { name: 'Technical', value: 5 },
            { name: 'Problem Solving', value: 9 },
          ],
          interviewData: [
            { week: 'Week 1', score: 65 },
            { week: 'Week 2', score: 70 },
            { week: 'Week 3', score: 75 },
            { week: 'Week 4', score: 82 },
          ]
        };
      case 'employer':
        return {
          postingsData: [
            { month: 'Jan', count: 3 },
            { month: 'Feb', count: 5 },
            { month: 'Mar', count: 4 },
            { month: 'Apr', count: 7 },
            { month: 'May', count: 6 },
            { month: 'Jun', count: 9 },
          ],
          applicantsData: [
            { position: 'Developer', count: 12 },
            { position: 'Designer', count: 8 },
            { position: 'Manager', count: 6 },
            { position: 'Analyst', count: 9 },
          ],
          hiringData: [
            { month: 'Jan', hired: 1 },
            { month: 'Feb', hired: 2 },
            { month: 'Mar', hired: 1 },
            { month: 'Apr', hired: 3 },
            { month: 'May', hired: 2 },
            { month: 'Jun', hired: 4 },
          ]
        };
      case 'teacher':
        return {
          studentsData: [
            { month: 'Jan', count: 15 },
            { month: 'Feb', count: 18 },
            { month: 'Mar', count: 20 },
            { month: 'Apr', count: 22 },
            { month: 'May', count: 25 },
            { month: 'Jun', count: 30 },
          ],
          placementData: [
            { category: 'Employed', value: 65 },
            { category: 'Continuing Education', value: 20 },
            { category: 'Seeking', value: 15 },
          ],
          skillGrowthData: [
            { skill: 'Technical', initial: 4, current: 7 },
            { skill: 'Soft Skills', initial: 5, current: 8 },
            { skill: 'Industry Knowledge', initial: 3, current: 6 },
          ]
        };
      case 'admin':
        return {
          userGrowthData: [
            { month: 'Jan', students: 25, employers: 5, teachers: 2 },
            { month: 'Feb', students: 30, employers: 7, teachers: 3 },
            { month: 'Mar', students: 35, employers: 8, teachers: 3 },
            { month: 'Apr', students: 42, employers: 10, teachers: 4 },
            { month: 'May', students: 50, employers: 12, teachers: 5 },
            { month: 'Jun', students: 60, employers: 15, teachers: 6 },
          ],
          redemptionData: [
            { status: 'Used', value: 75 },
            { status: 'Unused', value: 25 },
          ],
          platformActivityData: [
            { day: 'Mon', logins: 120 },
            { day: 'Tue', logins: 145 },
            { day: 'Wed', logins: 132 },
            { day: 'Thu', logins: 148 },
            { day: 'Fri', logins: 130 },
            { day: 'Sat', logins: 90 },
            { day: 'Sun', logins: 85 },
          ]
        };
      default:
        return {
          generalData: [
            { month: 'Jan', activity: 20 },
            { month: 'Feb', activity: 25 },
            { month: 'Mar', activity: 30 },
            { month: 'Apr', activity: 35 },
            { month: 'May', activity: 40 },
            { month: 'Jun', activity: 45 },
          ]
        };
    }
  };

  const analyticsData = getAnalyticsData();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Dashboard Analytics</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  const renderAnalyticsContent = () => {
    switch (userProfile?.user_type) {
      case 'student':
        return (
          <Tabs defaultValue="applications" className="w-full">
            <TabsList className={`${isMobile ? 'grid grid-cols-3' : ''}`}>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.applicationData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#4f46e5" name="Applications" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Your application activity over the last 6 months.
              </p>
            </TabsContent>
            
            <TabsContent value="skills" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.skillsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.skillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Distribution of your skill proficiencies.
              </p>
            </TabsContent>
            
            <TabsContent value="interviews" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analyticsData.interviewData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#4f46e5" 
                      activeDot={{ r: 8 }} 
                      name="Interview Score" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Your interview performance scores over time.
              </p>
            </TabsContent>
          </Tabs>
        );
      
      case 'employer':
        return (
          <Tabs defaultValue="postings" className="w-full">
            <TabsList className={`${isMobile ? 'grid grid-cols-3' : ''}`}>
              <TabsTrigger value="postings">Job Postings</TabsTrigger>
              <TabsTrigger value="applicants">Applicants</TabsTrigger>
              <TabsTrigger value="hiring">Hiring</TabsTrigger>
            </TabsList>
            
            <TabsContent value="postings" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.postingsData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#10b981" name="Job Postings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Your job posting activity over the last 6 months.
              </p>
            </TabsContent>
            
            <TabsContent value="applicants" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.applicantsData}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="position" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#10b981" name="Applicants" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Number of applicants by position.
              </p>
            </TabsContent>
            
            <TabsContent value="hiring" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analyticsData.hiringData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="hired" 
                      stroke="#10b981" 
                      activeDot={{ r: 8 }} 
                      name="Hires"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Your hiring activity over the last 6 months.
              </p>
            </TabsContent>
          </Tabs>
        );
      
      case 'teacher':
        return (
          <Tabs defaultValue="students" className="w-full">
            <TabsList className={`${isMobile ? 'grid grid-cols-3' : ''}`}>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="placements">Placements</TabsTrigger>
              <TabsTrigger value="growth">Skill Growth</TabsTrigger>
            </TabsList>
            
            <TabsContent value="students" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={analyticsData.studentsData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#f59e0b" 
                      fillOpacity={1} 
                      fill="url(#colorStudents)"
                      name="Students" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Student enrollment over the last 6 months.
              </p>
            </TabsContent>
            
            <TabsContent value="placements" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.placementData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.placementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Student outcomes after completing your courses.
              </p>
            </TabsContent>
            
            <TabsContent value="growth" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.skillGrowthData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="initial" fill="#94a3b8" name="Initial Level" />
                    <Bar dataKey="current" fill="#f59e0b" name="Current Level" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Average student skill growth in your courses.
              </p>
            </TabsContent>
          </Tabs>
        );
      
      case 'admin':
        return (
          <Tabs defaultValue="users" className="w-full">
            <TabsList className={`${isMobile ? 'grid grid-cols-3' : ''}`}>
              <TabsTrigger value="users">User Growth</TabsTrigger>
              <TabsTrigger value="redemption">Redemption</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={analyticsData.userGrowthData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#3b82f6" name="Students" />
                    <Bar dataKey="employers" fill="#10b981" name="Employers" />
                    <Bar dataKey="teachers" fill="#f59e0b" name="Teachers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                User growth by type over the last 6 months.
              </p>
            </TabsContent>
            
            <TabsContent value="redemption" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.redemptionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.redemptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Redemption code usage statistics.
              </p>
            </TabsContent>
            
            <TabsContent value="activity" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={analyticsData.platformActivityData}
                    margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="logins" 
                      stroke="#3b82f6" 
                      activeDot={{ r: 8 }}
                      name="Logins" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Platform login activity over the last week.
              </p>
            </TabsContent>
          </Tabs>
        );
      
      default:
        return (
          <div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={analyticsData.generalData}
                  margin={{ top: 5, right: 20, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="activity" 
                    stroke="#3b82f6" 
                    activeDot={{ r: 8 }} 
                    name="Platform Activity"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Your platform activity over the last 6 months.
            </p>
          </div>
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          {userProfile?.user_type ? `${userProfile.user_type.charAt(0).toUpperCase() + userProfile.user_type.slice(1)} Analytics` : 'Dashboard Analytics'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderAnalyticsContent()}
      </CardContent>
    </Card>
  );
};

export default UserTypeAnalytics;
