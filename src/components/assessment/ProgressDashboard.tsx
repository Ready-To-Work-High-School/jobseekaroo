
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Award, Book, BookOpen, CheckCircle, 
  Clock, GraduationCap, LineChart, Trophy 
} from 'lucide-react';

const ProgressDashboard = () => {
  // Mock data for the progress dashboard
  const completedSkills = [
    { name: "Communication", progress: 85 },
    { name: "Customer Service", progress: 70 },
    { name: "Time Management", progress: 60 },
    { name: "Microsoft Office", progress: 50 }
  ];
  
  const upcomingSkills = [
    { name: "Leadership", progress: 25 },
    { name: "Problem Solving", progress: 15 },
    { name: "Data Entry", progress: 10 }
  ];
  
  const completedActivities = [
    { name: "Customer Service Basics", date: "Apr 10, 2025" },
    { name: "Email Writing Workshop", date: "Apr 5, 2025" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-500" />
              Skill Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedSkills.map((skill, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between mb-1 text-sm">
                  <span>{skill.name}</span>
                  <span>{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 bg-green-50 p-3 rounded-md">
                <Trophy className="h-8 w-8 text-amber-500" />
                <div>
                  <h4 className="font-medium">Communication Badge</h4>
                  <p className="text-sm text-muted-foreground">Earned for completing 3 communication activities</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-md">
                <GraduationCap className="h-8 w-8 text-blue-500" />
                <div>
                  <h4 className="font-medium">Customer Service Certificate</h4>
                  <p className="text-sm text-muted-foreground">Successfully completed customer service simulation</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-purple-500" />
              Upcoming Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingSkills.map((skill, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between mb-1 text-sm">
                  <span>{skill.name}</span>
                  <span>{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
            <div className="mt-4 text-center">
              <Badge variant="outline" className="border-dashed">
                3 more skills recommended
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedActivities.map((activity, i) => (
              <div key={i} className="flex items-center justify-between mb-3 pb-3 border-b last:border-b-0">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{activity.name}</span>
                </div>
                <Badge variant="outline">{activity.date}</Badge>
              </div>
            ))}
            <div className="mt-4 p-3 rounded-md bg-gray-50">
              <h4 className="font-medium flex items-center gap-1 mb-1">
                <BookOpen className="h-4 w-4" /> 
                Recommended Next Activity
              </h4>
              <p className="text-sm text-muted-foreground">
                Data Entry Assessment
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressDashboard;
