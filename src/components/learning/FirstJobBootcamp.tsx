
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  Star, 
  Clock, 
  Video, 
  FileQuestion, 
  Dumbbell, 
  Circle, 
  Users, 
  FileText 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  completed: boolean;
  points: number;
  badgeIcon: React.ReactNode;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'quiz' | 'exercise' | 'reading';
  duration: string;
  completed: boolean;
  points: number;
}

const FirstJobBootcamp = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('modules');
  const [userPoints, setUserPoints] = useState(125);
  const [userLevel, setUserLevel] = useState(2);
  const [userProgress, setUserProgress] = useState(35);
  
  const modules: Module[] = [
    {
      id: '1',
      title: 'Job Search Fundamentals',
      description: 'Learn how to find appropriate job opportunities for teens and understand job requirements.',
      duration: '2 hours',
      completed: true,
      points: 100,
      badgeIcon: <Briefcase className="h-4 w-4" />,
      lessons: [
        {
          id: '1-1',
          title: 'Finding Age-Appropriate Jobs',
          description: 'Learn where and how to find jobs that are suitable for high school students.',
          type: 'video',
          duration: '15 min',
          completed: true,
          points: 25
        },
        {
          id: '1-2',
          title: 'Understanding Work Permits',
          description: 'Learn about work permits requirements for minors in different states.',
          type: 'reading',
          duration: '20 min',
          completed: true,
          points: 30
        },
        {
          id: '1-3',
          title: 'Job Requirements Quiz',
          description: 'Test your knowledge about job requirements and restrictions for minors.',
          type: 'quiz',
          duration: '15 min',
          completed: true,
          points: 45
        }
      ]
    },
    {
      id: '2',
      title: 'Resume & Application Skills',
      description: 'Learn how to create an impressive resume and fill out job applications effectively.',
      duration: '3 hours',
      completed: false,
      points: 150,
      badgeIcon: <FileText className="h-4 w-4" />,
      lessons: [
        {
          id: '2-1',
          title: 'Creating Your First Resume',
          description: 'Learn how to build a resume that stands out, even without work experience.',
          type: 'video',
          duration: '25 min',
          completed: true,
          points: 35
        },
        {
          id: '2-2',
          title: 'Application Form Exercises',
          description: 'Practice filling out common job application forms correctly.',
          type: 'exercise',
          duration: '30 min',
          completed: false,
          points: 40
        },
        {
          id: '2-3',
          title: 'References & Recommendations',
          description: 'Learn who to ask and how to ask for job references.',
          type: 'reading',
          duration: '15 min',
          completed: false,
          points: 25
        },
        {
          id: '2-4',
          title: 'Application Skills Assessment',
          description: 'Test your knowledge about effective job applications.',
          type: 'quiz',
          duration: '20 min',
          completed: false,
          points: 50
        }
      ]
    },
    {
      id: '3',
      title: 'Interview Preparation',
      description: 'Master interview techniques and learn how to make a great first impression.',
      duration: '4 hours',
      completed: false,
      points: 200,
      badgeIcon: <Users className="h-4 w-4" />,
      lessons: [
        {
          id: '3-1',
          title: 'Common Interview Questions',
          description: 'Learn how to answer typical first job interview questions with confidence.',
          type: 'video',
          duration: '30 min',
          completed: false,
          points: 45
        },
        {
          id: '3-2',
          title: 'Professional Appearance',
          description: 'Learn what to wear and how to present yourself for different types of interviews.',
          type: 'reading',
          duration: '15 min',
          completed: false,
          points: 30
        },
        {
          id: '3-3',
          title: 'Mock Interview Practice',
          description: 'Record and review your answers to interview questions.',
          type: 'exercise',
          duration: '45 min',
          completed: false,
          points: 75
        },
        {
          id: '3-4',
          title: 'Interview Etiquette Quiz',
          description: 'Test your knowledge about proper interview behavior.',
          type: 'quiz',
          duration: '20 min',
          completed: false,
          points: 50
        }
      ]
    },
    {
      id: '4',
      title: 'Workplace Success',
      description: 'Learn critical skills for succeeding in your first job environment.',
      duration: '3 hours',
      completed: false,
      points: 175,
      badgeIcon: <Award className="h-4 w-4" />,
      lessons: [
        {
          id: '4-1',
          title: 'Workplace Communication',
          description: 'Learn effective communication skills for the workplace.',
          type: 'video',
          duration: '25 min',
          completed: false,
          points: 40
        },
        {
          id: '4-2',
          title: 'Time Management',
          description: 'Learn how to balance school, work, and personal life.',
          type: 'reading',
          duration: '20 min',
          completed: false,
          points: 35
        },
        {
          id: '4-3',
          title: 'Problem Solving Scenarios',
          description: 'Practice handling common workplace challenges.',
          type: 'exercise',
          duration: '30 min',
          completed: false,
          points: 50
        },
        {
          id: '4-4',
          title: 'Workplace Rights Quiz',
          description: 'Test your knowledge about your rights as a teenage employee.',
          type: 'quiz',
          duration: '15 min',
          completed: false,
          points: 50
        }
      ]
    }
  ];
  
  // Module component
  const ModuleCard = ({ module }: { module: Module }) => {
    return (
      <Card className="mb-4 overflow-hidden">
        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg">{module.title}</h3>
            <Badge variant={module.completed ? "success" : "outline"}>
              {module.completed ? 
                <><CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Completed</> : 
                <>In Progress</>
              }
            </Badge>
          </div>
          <p className="text-muted-foreground mb-3">{module.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {module.duration}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-500" />
              {module.points} points
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              {module.badgeIcon}
              {module.title.split(' ')[0]} Badge
            </Badge>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {module.lessons.filter(l => l.completed).length}/{module.lessons.length} lessons
              </span>
            </div>
            <Progress 
              value={(module.lessons.filter(l => l.completed).length / module.lessons.length) * 100} 
              className="h-2"
            />
          </div>
          
          <Button className="w-full mt-4">
            {module.completed ? 'Review Module' : 'Continue Learning'}
          </Button>
        </div>
        
        <div className="border-t">
          <div className="p-4">
            <h4 className="font-medium mb-2">Lessons</h4>
            <div className="space-y-2">
              {module.lessons.map((lesson) => (
                <div 
                  key={lesson.id} 
                  className="flex items-center justify-between py-1 px-2 rounded-md hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center">
                    {lesson.completed && <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />}
                    {!lesson.completed && getLessonTypeIcon(lesson.type)}
                    <span className={`${lesson.completed ? 'text-muted-foreground line-through' : ''}`}>
                      {lesson.title}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {lesson.duration}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  };
  
  // Helper function for lesson icons
  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4 text-blue-500 mr-2" />;
      case 'quiz':
        return <FileQuestion className="h-4 w-4 text-purple-500 mr-2" />;
      case 'exercise':
        return <Dumbbell className="h-4 w-4 text-amber-500 mr-2" />;
      case 'reading':
        return <BookOpen className="h-4 w-4 text-green-500 mr-2" />;
      default:
        return <Circle className="h-4 w-4 mr-2" />;
    }
  };
  
  // Progress and achievements
  const badgesEarned = [
    {
      id: '1',
      title: 'Job Search Expert',
      description: 'Completed the Job Search Fundamentals module',
      icon: <Briefcase className="h-6 w-6 text-blue-500" />
    }
  ];
  
  const badgesInProgress = [
    {
      id: '2',
      title: 'Resume Master',
      description: 'Complete the Resume & Application Skills module',
      icon: <FileText className="h-6 w-6 text-gray-400" />
    },
    {
      id: '3',
      title: 'Interview Pro',
      description: 'Complete the Interview Preparation module',
      icon: <Users className="h-6 w-6 text-gray-400" />
    },
    {
      id: '4',
      title: 'Workplace Star',
      description: 'Complete the Workplace Success module',
      icon: <Award className="h-6 w-6 text-gray-400" />
    }
  ];
  
  return (
    <div className={`max-w-4xl mx-auto ${isMobile ? 'px-4' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">First Job Bootcamp</h2>
          <p className="text-muted-foreground">Master the skills you need to get and succeed in your first job</p>
        </div>
        <Card className={`${isMobile ? 'w-full mt-4' : 'shrink-0'} p-4 flex items-center gap-3`}>
          <div className="bg-primary/10 rounded-full p-2">
            <Star className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Your points</div>
            <div className="font-bold text-xl">{userPoints}</div>
          </div>
          <div className="border-l pl-3">
            <div className="text-sm text-muted-foreground">Level</div>
            <div className="font-bold text-xl">{userLevel}</div>
          </div>
        </Card>
      </div>
      
      <div className="bg-muted p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Overall Progress</h3>
          </div>
          <Badge variant="outline">
            {userProgress}% Complete
          </Badge>
        </div>
        <Progress value={userProgress} className="h-2" />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="modules">Learning Modules</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="modules" className="mt-0">
          <div className="space-y-6">
            {modules.map(module => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-0">
          <Card>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-4">Your Badges</h3>
              
              <div className="mb-6">
                <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-3">
                  Earned Badges
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {badgesEarned.map(badge => (
                    <div key={badge.id} className="flex items-start gap-3 p-3 border rounded-md bg-muted/50">
                      <div className="bg-white p-2 rounded-full border">
                        {badge.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold">{badge.title}</h5>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-3">
                  Badges In Progress
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {badgesInProgress.map(badge => (
                    <div key={badge.id} className="flex items-start gap-3 p-3 border border-dashed rounded-md">
                      <div className="bg-muted p-2 rounded-full border">
                        {badge.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold">{badge.title}</h5>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FirstJobBootcamp;
