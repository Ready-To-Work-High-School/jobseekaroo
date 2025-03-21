
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Mic, 
  User, 
  GraduationCap, 
  BookOpen, 
  Search, 
  ListChecks, 
  ThumbsUp 
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InterviewQuestion } from '@/types/skills';
import { useFadeIn, useSlideIn } from '@/utils/animations';

// Mock data for interview questions
const mockInterviewQuestions: InterviewQuestion[] = [
  // Behavioral Questions
  {
    id: '1',
    role: 'general',
    question: 'Tell me about a time when you faced a challenge and how you overcame it.',
    category: 'behavioral',
    difficulty: 'beginner',
  },
  {
    id: '2',
    role: 'general',
    question: 'Describe a situation where you had to work with a difficult team member.',
    category: 'behavioral',
    difficulty: 'intermediate',
  },
  {
    id: '3',
    role: 'general',
    question: 'Tell me about a time when you had to meet a tight deadline.',
    category: 'behavioral',
    difficulty: 'beginner',
  },
  {
    id: '4',
    role: 'customer-service',
    question: 'Describe a time when you dealt with an angry customer and how you resolved the situation.',
    category: 'behavioral',
    difficulty: 'intermediate',
  },
  {
    id: '5',
    role: 'retail',
    question: 'Tell me about a time when you went above and beyond for a customer.',
    category: 'behavioral',
    difficulty: 'beginner',
  },
  
  // Technical Questions
  {
    id: '6',
    role: 'tech',
    question: 'What programming languages are you familiar with and which do you prefer?',
    category: 'technical',
    difficulty: 'beginner',
  },
  {
    id: '7',
    role: 'tech',
    question: 'Explain how you would troubleshoot a computer that won't start.',
    category: 'technical',
    difficulty: 'intermediate',
  },
  {
    id: '8',
    role: 'healthcare',
    question: 'What experience do you have with electronic health record systems?',
    category: 'technical',
    difficulty: 'intermediate',
  },
  {
    id: '9',
    role: 'office',
    question: 'How proficient are you with Microsoft Office applications?',
    category: 'technical',
    difficulty: 'beginner',
  },
  {
    id: '10',
    role: 'office',
    question: 'Explain your experience with scheduling and calendar management.',
    category: 'technical',
    difficulty: 'beginner',
  },
  
  // Situational Questions
  {
    id: '11',
    role: 'general',
    question: 'How would you handle a situation where you're given multiple tasks with the same deadline?',
    category: 'situational',
    difficulty: 'intermediate',
  },
  {
    id: '12',
    role: 'general',
    question: 'What would you do if you made a mistake that no one noticed?',
    category: 'situational',
    difficulty: 'intermediate',
  },
  {
    id: '13',
    role: 'retail',
    question: 'How would you handle a situation where a customer wants to return an item without a receipt?',
    category: 'situational',
    difficulty: 'intermediate',
  },
  {
    id: '14',
    role: 'customer-service',
    question: 'What would you do if you don't know the answer to a customer's question?',
    category: 'situational',
    difficulty: 'beginner',
  },
  {
    id: '15',
    role: 'management',
    question: 'How would you handle a team member who consistently misses deadlines?',
    category: 'situational',
    difficulty: 'advanced',
  },
];

// Tips for each section
const interviewTips = [
  {
    id: '1',
    title: 'Be Specific with STAR Method',
    description: 'When answering behavioral questions, use the STAR method: Situation, Task, Action, Result.',
    icon: ListChecks,
  },
  {
    id: '2',
    title: 'Research the Company',
    description: 'Learn about the company's values, mission, and recent news before your interview.',
    icon: Search,
  },
  {
    id: '3',
    title: 'Prepare Questions',
    description: 'Have 3-5 thoughtful questions ready to ask the interviewer.',
    icon: MessageSquare,
  },
  {
    id: '4',
    title: 'Practice Out Loud',
    description: 'Rehearse your answers out loud to build confidence and improve delivery.',
    icon: Mic,
  },
  {
    id: '5',
    title: 'Review Your Resume',
    description: 'Be prepared to discuss anything on your resume in detail.',
    icon: BookOpen,
  },
];

// Mock practice session feedback
const mockFeedback = [
  {
    id: '1',
    question: 'Tell me about yourself.',
    feedback: 'Good introduction, but try to keep it more concise and focused on relevant experience.',
    strength: 'Friendly tone and clear communication',
    improvement: 'Be more concise and professional',
  },
  {
    id: '2',
    question: 'Why do you want to work here?',
    feedback: 'Excellent job connecting your skills to the company's needs. Very persuasive answer.',
    strength: 'Great research about the company',
    improvement: 'None - this was a strong answer',
  },
  {
    id: '3',
    question: 'Describe a challenge you faced at work.',
    feedback: 'Good example, but your answer lacked structure. Try using the STAR method.',
    strength: 'Authentic example with a positive outcome',
    improvement: 'Structure your answer better (Situation, Task, Action, Result)',
  },
];

const InterviewPrep = () => {
  const [selectedRole, setSelectedRole] = useState('general');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [activeTab, setActiveTab] = useState('questions');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const headerAnimation = useSlideIn(100);
  const contentAnimation = useFadeIn(300);
  
  // Filter questions based on selections
  const filteredQuestions = mockInterviewQuestions.filter(q => {
    const roleMatch = selectedRole === 'all' || q.role === selectedRole;
    const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return roleMatch && categoryMatch && difficultyMatch;
  });
  
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording and reset timer
      setIsRecording(false);
      setRecordingTime(0);
      // In a real app, this would save the recording and trigger feedback generation
    } else {
      // Start recording and timer
      setIsRecording(true);
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Cleanup interval when recording stops
      return () => clearInterval(interval);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <Layout>
      <div className={headerAnimation}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">
            Interview Preparation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice common interview questions, simulate interviews, and get feedback to help you perform your best.
          </p>
        </div>
      </div>
      
      <div className={contentAnimation}>
        <Tabs defaultValue="questions" className="max-w-5xl mx-auto mb-16" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-3xl mx-auto">
            <TabsTrigger value="questions">Common Questions</TabsTrigger>
            <TabsTrigger value="simulation">Practice Simulation</TabsTrigger>
            <TabsTrigger value="feedback">Feedback & Tips</TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
            {/* Common Questions Tab */}
            <TabsContent value="questions">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <h2 className="text-2xl font-bold">Interview Questions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="customer-service">Customer Service</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="office">Office Admin</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Question Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="behavioral">Behavioral</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="situational">Situational</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question) => (
                      <Card key={question.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl flex items-start gap-3">
                            <div className="p-2 rounded-full bg-blue-100 mt-1">
                              {question.category === 'behavioral' ? (
                                <User className="h-5 w-5 text-blue-700" />
                              ) : question.category === 'technical' ? (
                                <GraduationCap className="h-5 w-5 text-blue-700" />
                              ) : (
                                <MessageSquare className="h-5 w-5 text-blue-700" />
                              )}
                            </div>
                            {question.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{question.role.charAt(0).toUpperCase() + question.role.slice(1)}</Badge>
                            <Badge variant="outline" className="capitalize">{question.category}</Badge>
                            <Badge variant="outline" className="capitalize">{question.difficulty}</Badge>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm" className="ml-auto">
                            <Mic className="h-4 w-4 mr-2" />
                            Practice Answer
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium">No questions match your filters</p>
                        <p className="text-muted-foreground mt-1">Try changing your filter selections</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Practice Simulation Tab */}
            <TabsContent value="simulation">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold">Practice Interview Simulation</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Mock Interview Session</CardTitle>
                    <CardDescription>
                      Practice answering questions as if you were in a real interview. Record your responses to review later.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center gap-6 py-6">
                      {isRecording ? (
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 rounded-full bg-red-100 flex items-center justify-center mb-4 relative animate-pulse">
                            <Mic className="h-16 w-16 text-red-600" />
                            <div className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                              REC
                            </div>
                          </div>
                          <p className="text-2xl font-bold mb-2">{formatTime(recordingTime)}</p>
                          <p className="text-muted-foreground text-center max-w-md mb-8">
                            Answer the question below. Click "Stop Recording" when you're finished.
                          </p>
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <Mic className="h-16 w-16 text-blue-600" />
                        </div>
                      )}
                      
                      <div className="w-full max-w-2xl bg-muted/40 p-6 rounded-lg mb-6">
                        <h3 className="text-xl font-bold mb-2">Question:</h3>
                        <p className="text-lg">
                          {isRecording 
                            ? "Tell me about yourself and why you're interested in this position."
                            : "Click 'Start Recording' to begin the interview simulation. You'll be presented with interview questions to answer."}
                        </p>
                      </div>
                      
                      <Button 
                        onClick={toggleRecording} 
                        className={isRecording ? "bg-red-600 hover:bg-red-700" : ""}
                      >
                        {isRecording ? (
                          <>
                            <Mic className="h-4 w-4 mr-2" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic className="h-4 w-4 mr-2" />
                            Start Recording
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Interview Simulator Settings</CardTitle>
                    <CardDescription>
                      Customize your practice interview experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Job Role Focus</h3>
                        <Select defaultValue="general">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="tech">Technology</SelectItem>
                            <SelectItem value="customer-service">Customer Service</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="office">Office Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Question Types</h3>
                        <Select defaultValue="mixed">
                          <SelectTrigger>
                            <SelectValue placeholder="Question Types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mixed">Mixed (All Types)</SelectItem>
                            <SelectItem value="behavioral">Behavioral</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="situational">Situational</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Difficulty Level</h3>
                        <Select defaultValue="beginner">
                          <SelectTrigger>
                            <SelectValue placeholder="Difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="progressive">Progressive (Increasing)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Number of Questions</h3>
                        <Select defaultValue="5">
                          <SelectTrigger>
                            <SelectValue placeholder="Question Count" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 Questions</SelectItem>
                            <SelectItem value="5">5 Questions</SelectItem>
                            <SelectItem value="10">10 Questions</SelectItem>
                            <SelectItem value="15">15 Questions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" disabled={isRecording}>
                      Start New Simulation
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            {/* Feedback & Tips Tab */}
            <TabsContent value="feedback">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold">Feedback & Interview Tips</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Previous Session Feedback</CardTitle>
                    <CardDescription>
                      Review feedback from your most recent practice interviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockFeedback.map((item, index) => (
                      <div key={item.id} className="mb-6 last:mb-0">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-full bg-blue-100">
                            <MessageSquare className="h-5 w-5 text-blue-700" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.question}</h3>
                            <p className="text-muted-foreground mt-1 mb-2">{item.feedback}</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                              <div className="bg-green-50 p-3 rounded-md">
                                <p className="text-green-800 text-sm font-medium mb-1">Strengths</p>
                                <p className="text-green-700 text-sm">{item.strength}</p>
                              </div>
                              <div className="bg-amber-50 p-3 rounded-md">
                                <p className="text-amber-800 text-sm font-medium mb-1">Areas to Improve</p>
                                <p className="text-amber-700 text-sm">{item.improvement}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {index < mockFeedback.length - 1 && <Separator className="my-6" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <h3 className="text-xl font-bold mt-6">Interview Tips & Best Practices</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {interviewTips.map((tip) => (
                    <Card key={tip.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <div className="p-1.5 rounded-full bg-blue-100">
                            <tip.icon className="h-4 w-4 text-blue-700" />
                          </div>
                          {tip.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{tip.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Schedule Mock Interview</CardTitle>
                    <CardDescription>
                      Practice with a career counselor for personalized feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Ready to take your interview skills to the next level? Schedule a one-on-one mock interview with 
                      a career counselor who can provide personalized feedback and coaching.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Request Mock Interview
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InterviewPrep;
