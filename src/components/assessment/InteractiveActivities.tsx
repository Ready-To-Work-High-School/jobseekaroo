
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, BookOpen, PlayCircle, FileText, Award } from 'lucide-react';

interface InteractiveActivitiesProps {
  onStartActivity: (activityId: string) => void;
}

const InteractiveActivities = ({ onStartActivity }: InteractiveActivitiesProps) => {
  const activities = [
    {
      id: 'activity-001',
      title: 'Customer Service Simulation',
      description: 'Practice handling customer inquiries and complaints through interactive scenarios',
      skillsGained: ['Communication', 'Problem Solving', 'Customer Service'],
      duration: '20 min',
      type: 'simulation',
      difficulty: 'Beginner'
    },
    {
      id: 'activity-002',
      title: 'Time Management Challenge',
      description: 'Complete tasks within time constraints to improve prioritization skills',
      skillsGained: ['Time Management', 'Organization', 'Decision Making'],
      duration: '15 min',
      type: 'challenge',
      difficulty: 'Intermediate'
    },
    {
      id: 'activity-003',
      title: 'Email Writing Workshop',
      description: 'Learn to write professional emails through guided examples and practice',
      skillsGained: ['Written Communication', 'Microsoft Office', 'Attention to Detail'],
      duration: '30 min',
      type: 'workshop',
      difficulty: 'Beginner'
    },
    {
      id: 'activity-004',
      title: 'Data Entry Assessment',
      description: 'Test your speed and accuracy with data entry tasks',
      skillsGained: ['Data Entry', 'Attention to Detail', 'Computer Skills'],
      duration: '25 min',
      type: 'assessment',
      difficulty: 'Intermediate'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'simulation':
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      case 'challenge':
        return <Award className="h-5 w-5 text-purple-500" />;
      case 'workshop':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      case 'assessment':
        return <FileText className="h-5 w-5 text-amber-500" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Interactive Activities</h2>
        <Button variant="outline" size="sm">
          Browse All Activities
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map(activity => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="capitalize">
                  {activity.type}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {activity.duration}
                </div>
              </div>
              <div className="flex items-start mt-2">
                <div className="mr-3 mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="text-sm font-semibold mb-1">Skills Gained:</h4>
              <div className="flex flex-wrap gap-1">
                {activity.skillsGained.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="mt-3 flex items-center text-sm">
                <Badge variant={
                  activity.difficulty === "Beginner" ? "outline" : 
                  activity.difficulty === "Intermediate" ? "secondary" : 
                  "default"
                }>
                  {activity.difficulty}
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => onStartActivity(activity.id)}
              >
                Start Activity
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InteractiveActivities;
