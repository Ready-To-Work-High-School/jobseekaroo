
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { Check, Award, BookOpen, Target, Sparkles } from 'lucide-react';
import SkillAssessmentForm from '@/components/assessment/SkillAssessmentForm';
import LearningPathView from '@/components/assessment/LearningPathView';
import InteractiveActivities from '@/components/assessment/InteractiveActivities';
import ProgressDashboard from '@/components/assessment/ProgressDashboard';

const PersonalizedAssessment = () => {
  const fadeIn = useFadeIn(300);
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [currentTab, setCurrentTab] = useState('assessment');
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  
  const handleAssessmentComplete = () => {
    setAssessmentComplete(true);
    toast.success('Assessment completed!', {
      description: 'Your personalized learning path is now available.'
    });
    setCurrentTab('learning-path');
  };
  
  const handleStartActivity = (activityId: string) => {
    toast.info('Starting activity...', {
      description: 'This feature will be available soon!'
    });
  };

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Personalized Skill Development</h1>
          <p className="text-muted-foreground">
            Build the skills you need for your career through personalized assessment and guided learning.
          </p>
        </div>
        
        {!user ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-2">Sign in to access personalized assessments</h3>
                <p className="text-muted-foreground mb-4">
                  Create an account or sign in to track your progress and receive a customized learning path.
                </p>
                <Button onClick={() => navigate('/login')}>
                  Sign In to Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className={`border-l-4 ${currentTab === 'assessment' ? 'border-l-blue-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Assessment
                  </CardTitle>
                  <CardDescription>Identify your skills and goals</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className={`border-l-4 ${currentTab === 'learning-path' ? 'border-l-green-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-500" />
                    Learning Path
                  </CardTitle>
                  <CardDescription>Your customized development plan</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className={`border-l-4 ${currentTab === 'activities' ? 'border-l-purple-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    Activities
                  </CardTitle>
                  <CardDescription>Interactive skill-building tasks</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className={`border-l-4 ${currentTab === 'progress' ? 'border-l-amber-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    Progress
                  </CardTitle>
                  <CardDescription>Track your development journey</CardDescription>
                </CardHeader>
              </Card>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Your Development Journey</CardTitle>
                <CardDescription>
                  Track your progress through the skill development process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Progress value={
                    currentTab === 'assessment' ? 25 : 
                    currentTab === 'learning-path' ? 50 : 
                    currentTab === 'activities' ? 75 : 100
                  } className="h-2 mb-2" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Assessment</span>
                    <span>Learning Path</span>
                    <span>Activities</span>
                    <span>Progress</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-6">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="learning-path" disabled={!assessmentComplete}>Learning Path</TabsTrigger>
                <TabsTrigger value="activities" disabled={!assessmentComplete}>Activities</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
              </TabsList>
              
              <TabsContent value="assessment">
                <SkillAssessmentForm onComplete={handleAssessmentComplete} />
              </TabsContent>
              
              <TabsContent value="learning-path">
                <LearningPathView />
              </TabsContent>
              
              <TabsContent value="activities">
                <InteractiveActivities onStartActivity={handleStartActivity} />
              </TabsContent>
              
              <TabsContent value="progress">
                <ProgressDashboard />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PersonalizedAssessment;
