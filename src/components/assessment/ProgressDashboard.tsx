
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Trophy, Medal, Certificate, Star, Calendar, ArrowUpRight } from 'lucide-react';

const ProgressDashboard = () => {
  // Sample data for demonstration
  const completedActivities = 8;
  const totalActivities = 20;
  const completionPercentage = (completedActivities / totalActivities) * 100;
  
  const skillProgress = [
    { name: 'Communication', progress: 75 },
    { name: 'Customer Service', progress: 60 },
    { name: 'Microsoft Office', progress: 50 },
    { name: 'Problem Solving', progress: 40 },
    { name: 'Time Management', progress: 30 },
  ];
  
  const achievements = [
    { id: 1, title: 'First Assessment Complete', description: 'Completed your first skill assessment', icon: <Medal className="h-5 w-5 text-amber-500" /> },
    { id: 2, title: 'Communication Basics', description: 'Achieved Level 2 in Communication Skills', icon: <Certificate className="h-5 w-5 text-blue-500" /> },
    { id: 3, title: 'Consistent Learner', description: 'Completed activities for 5 consecutive days', icon: <Trophy className="h-5 w-5 text-purple-500" /> },
  ];
  
  const pieData = [
    { name: 'Completed', value: completedActivities, color: '#3b82f6' },
    { name: 'Remaining', value: totalActivities - completedActivities, color: '#e2e8f0' },
  ];
  
  const barData = skillProgress.map(skill => ({
    name: skill.name,
    progress: skill.progress,
  }));
  
  const learningHistory = [
    { date: '2023-07-12', activity: 'Completed Customer Service Simulation', duration: '20 min' },
    { date: '2023-07-10', activity: 'Completed Time Management Challenge', duration: '15 min' },
    { date: '2023-07-05', activity: 'Started Email Writing Workshop', duration: '10 min' },
    { date: '2023-07-01', activity: 'Completed Skill Assessment', duration: '25 min' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Overall Progress</CardTitle>
            <CardDescription>Activity completion status</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <p className="text-2xl font-bold">{Math.round(completionPercentage)}%</p>
              <p className="text-sm text-muted-foreground">
                {completedActivities} of {totalActivities} activities completed
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Skill Development</CardTitle>
            <CardDescription>Your progress in key skill areas</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Badges and certificates you've earned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map(achievement => (
              <Card key={achievement.id} className="bg-muted/50">
                <CardContent className="p-4 flex items-start">
                  <div className="bg-background p-2 rounded-full mr-3">
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm">
              View All Achievements
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Learning History</CardTitle>
          <CardDescription>Your recent learning activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningHistory.map((item, i) => (
              <div key={i} className="flex items-start pb-3 border-b last:border-0">
                <div className="bg-muted p-2 rounded-full mr-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.activity}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                    <Badge variant="outline" className="text-xs">
                      {item.duration}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>Recommended actions to continue your progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">Complete Data Entry Assessment</h4>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Build your technical skills with hands-on practice
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">Review Communication Resources</h4>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Access articles and videos to enhance your communication skills
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">Update Your Skill Assessment</h4>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Refresh your assessment to see how you've progressed
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressDashboard;
