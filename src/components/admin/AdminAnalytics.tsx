
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Clock, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Sample data - would be replaced with real data from analytics service
const sampleData = [
  { date: 'Mon', visitors: 120, sessions: 140, newUsers: 25, avgTime: 8.2 },
  { date: 'Tue', visitors: 160, sessions: 180, newUsers: 30, avgTime: 9.5 },
  { date: 'Wed', visitors: 180, sessions: 200, newUsers: 40, avgTime: 7.8 },
  { date: 'Thu', visitors: 190, sessions: 220, newUsers: 35, avgTime: 10.2 },
  { date: 'Fri', visitors: 210, sessions: 240, newUsers: 45, avgTime: 8.9 },
  { date: 'Sat', visitors: 150, sessions: 160, newUsers: 20, avgTime: 6.5 },
  { date: 'Sun', visitors: 130, sessions: 140, newUsers: 18, avgTime: 7.1 }
];

// Sample user data with session times
const sampleUserSessions = [
  { id: 1, name: 'John Doe', email: 'john@example.com', lastVisit: '2023-09-01', timeSpent: '12m 34s', sessions: 8 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', lastVisit: '2023-09-02', timeSpent: '24m 12s', sessions: 15 },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', lastVisit: '2023-09-01', timeSpent: '8m 45s', sessions: 5 },
  { id: 4, name: 'Emily Brown', email: 'emily@example.com', lastVisit: '2023-09-03', timeSpent: '32m 18s', sessions: 20 },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', lastVisit: '2023-09-02', timeSpent: '15m 50s', sessions: 12 }
];

const AdminAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userMetrics, setUserMetrics] = useState({
    totalUsers: 325,
    activeUsers: 215,
    newUsers: 42,
    retentionRate: 78
  });

  useEffect(() => {
    // In a real implementation, this would fetch data from your analytics service
    console.log('Fetching analytics data');
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Website Analytics</h2>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Visitors</p>
                <h3 className="text-2xl font-bold mt-1">1,240</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>12% from last week</span>
                </p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Session Duration</p>
                <h3 className="text-2xl font-bold mt-1">8.2 min</h3>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>3% from last week</span>
                </p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Users</p>
                <h3 className="text-2xl font-bold mt-1">{userMetrics.newUsers}</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>8% from last week</span>
                </p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
                <h3 className="text-2xl font-bold mt-1">{userMetrics.retentionRate}%</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>5% from last week</span>
                </p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Website Traffic</CardTitle>
              <CardDescription>Visitor trends over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sampleData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="#8884d8" name="Visitors" />
                    <Bar dataKey="sessions" fill="#82ca9d" name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Top users by time spent on site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-2 border-b">User</th>
                      <th className="text-left p-2 border-b">Email</th>
                      <th className="text-left p-2 border-b">Last Visit</th>
                      <th className="text-left p-2 border-b">Time Spent</th>
                      <th className="text-left p-2 border-b">Sessions</th>
                      <th className="text-left p-2 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleUserSessions.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="p-2 border-b">{user.name}</td>
                        <td className="p-2 border-b">{user.email}</td>
                        <td className="p-2 border-b">{user.lastVisit}</td>
                        <td className="p-2 border-b">{user.timeSpent}</td>
                        <td className="p-2 border-b">{user.sessions}</td>
                        <td className="p-2 border-b">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Average time spent on site per day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={sampleData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgTime" stroke="#8884d8" activeDot={{ r: 8 }} name="Avg. Minutes" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;
