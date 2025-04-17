import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Clock, Star, Video, MessageSquare, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const INTERVIEW_QUESTIONS = {
  behavioral: [
    "Tell me about a time when you had to work on a team project.",
    "Describe a situation where you had to meet a tight deadline.",
    "Give an example of a goal you reached and how you achieved it.",
    "Describe a challenge you faced and how you overcame it.",
    "Tell me about a time when you had to adapt to a significant change."
  ],
  technical: [
    "How have you used Microsoft Office tools in your studies or projects?",
    "What experience do you have with customer service or working with the public?",
    "How would you organize a project with multiple deadlines?",
    "Describe your experience with any industry-specific software.",
    "How would you troubleshoot basic computer problems?"
  ],
  situational: [
    "How would you handle a conflict with a coworker?",
    "What would you do if you were asked to complete a task you've never done before?",
    "How would you prioritize multiple assignments with the same deadline?",
    "What would you do if you made a mistake at work that no one noticed?",
    "How would you handle an angry or upset customer?"
  ]
};

const InterviewPrepContent = () => {
  console.log('InterviewPrepContent rendering');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('behavioral');
  
  useEffect(() => {
    console.log('InterviewPrepContent mounted');
    return () => console.log('InterviewPrepContent unmounted');
  }, []);

  const handleStartPractice = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to access the full interview practice tools",
      });
      navigate('/sign-in');
    } else {
      navigate('/interview-practice');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Interview Preparation</h2>
        <p className="text-muted-foreground mb-8">Prepare for your interviews with our comprehensive tools and resources.</p>
        
        {user ? (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Premium Feature</Badge>
                <h3 className="font-medium">Your Interview Prep Tools</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <Video className="h-5 w-5 text-blue-600 mb-2" />
                  <h4 className="font-medium text-sm mb-1">Mock Interviews</h4>
                  <p className="text-xs text-muted-foreground">Practice with AI-simulated interviewers</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <MessageSquare className="h-5 w-5 text-green-600 mb-2" />
                  <h4 className="font-medium text-sm mb-1">Answer Feedback</h4>
                  <p className="text-xs text-muted-foreground">Get personalized feedback on your responses</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <FileText className="h-5 w-5 text-purple-600 mb-2" />
                  <h4 className="font-medium text-sm mb-1">Interview Scripts</h4>
                  <p className="text-xs text-muted-foreground">Access industry-specific interview templates</p>
                </div>
              </div>
              <Button onClick={handleStartPractice} className="w-full sm:w-auto">
                Start Practice Interview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8 bg-amber-50 border-amber-200">
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium mb-1">Access Full Interview Prep Tools</h3>
                  <p className="text-sm text-muted-foreground">Sign in to access mock interviews, personalized feedback, and more</p>
                </div>
                <Button onClick={() => navigate('/sign-in')} variant="default">
                  Sign in to Access
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Common Interview Questions</CardTitle>
            <CardDescription>Practice answering these frequently asked questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="behavioral" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="situational">Situational</TabsTrigger>
              </TabsList>
              
              {Object.entries(INTERVIEW_QUESTIONS).map(([category, questions]) => (
                <TabsContent key={category} value={category} className="space-y-4">
                  {questions.map((question, idx) => (
                    <div key={idx} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex gap-3 items-start">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium mb-1">{question}</p>
                          {user && (
                            <div className="flex items-center gap-2 mt-2">
                              <Button variant="outline" size="sm">Practice Answer</Button>
                              <Button variant="ghost" size="sm">See Example</Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3 border-t pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Most interviews last 30-45 minutes</p>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Prepare 2-3 questions to ask the interviewer</p>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Before the Interview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">• Research the company and position</p>
              <p className="text-sm">• Practice your responses to common questions</p>
              <p className="text-sm">• Prepare professional attire</p>
              <p className="text-sm">• Plan your route or test your video setup</p>
              <p className="text-sm">• Bring copies of your resume and references</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>During the Interview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">• Arrive 10-15 minutes early</p>
              <p className="text-sm">• Make eye contact and offer a firm handshake</p>
              <p className="text-sm">• Use the STAR method for behavioral questions</p>
              <p className="text-sm">• Ask thoughtful questions about the role</p>
              <p className="text-sm">• Thank the interviewer for their time</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepContent;
