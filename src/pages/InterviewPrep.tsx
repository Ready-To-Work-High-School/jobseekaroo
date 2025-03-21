
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { InterviewQuestion, PracticeSession } from '@/types/skills';
import { 
  Mic, 
  Play, 
  Pause, 
  BookOpen, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Video, 
  MessageCircle, 
  Filter, 
  Search,
  CheckCircle,
  XCircle,
  Save,
  ArrowRight,
  FileAudio,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for interview questions and practice sessions
const mockInterviewQuestions: InterviewQuestion[] = [
  {
    id: "q1",
    role: "Customer Service",
    question: "Tell me about a time when you had to deal with a difficult customer.",
    category: "behavioral",
    difficulty: "intermediate"
  },
  {
    id: "q2",
    role: "Customer Service",
    question: "How would you handle a situation where a customer is asking for something that's against company policy?",
    category: "situational",
    difficulty: "intermediate"
  },
  {
    id: "q3",
    role: "Customer Service",
    question: "What does good customer service mean to you?",
    category: "behavioral",
    difficulty: "beginner"
  },
  {
    id: "q4",
    role: "Customer Service",
    question: "How do you stay calm when dealing with an angry customer?",
    category: "behavioral",
    difficulty: "intermediate"
  },
  {
    id: "q5",
    role: "Customer Service",
    question: "Explain how you would use our CRM system to track customer interactions.",
    category: "technical",
    difficulty: "advanced"
  },
  {
    id: "q6",
    role: "Retail Sales",
    question: "How do you approach a customer who has just entered the store?",
    category: "behavioral",
    difficulty: "beginner"
  },
  {
    id: "q7",
    role: "Retail Sales",
    question: "Tell me about a time you exceeded a sales target.",
    category: "behavioral",
    difficulty: "intermediate"
  },
  {
    id: "q8",
    role: "Retail Sales",
    question: "How would you handle a situation where a customer wants to return an item without a receipt?",
    category: "situational",
    difficulty: "intermediate"
  },
  {
    id: "q9",
    role: "Administrative Assistant",
    question: "How do you prioritize tasks when everything seems urgent?",
    category: "behavioral",
    difficulty: "intermediate"
  },
  {
    id: "q10",
    role: "Administrative Assistant",
    question: "Tell me about your experience with Microsoft Office suite.",
    category: "technical",
    difficulty: "beginner"
  },
  {
    id: "q11",
    role: "Administrative Assistant",
    question: "How would you handle confidential information?",
    category: "behavioral",
    difficulty: "intermediate"
  },
  {
    id: "q12",
    role: "Information Technology",
    question: "Explain the difference between HTTP and HTTPS.",
    category: "technical",
    difficulty: "intermediate"
  },
  {
    id: "q13",
    role: "Information Technology",
    question: "How would you explain a technical issue to a non-technical person?",
    category: "behavioral",
    difficulty: "intermediate"
  },
  {
    id: "q14",
    role: "Information Technology",
    question: "What steps would you take to troubleshoot a computer that won't turn on?",
    category: "technical",
    difficulty: "beginner"
  },
  {
    id: "q15",
    role: "Healthcare Support",
    question: "How do you ensure patient confidentiality?",
    category: "behavioral",
    difficulty: "intermediate"
  }
];

const mockPracticeSessions: PracticeSession[] = [
  {
    id: "session1",
    user_id: "user123",
    date: "2023-04-15",
    duration: 15,
    questions_attempted: 5,
    feedback: "Good eye contact. Work on answering more concisely. Try using the STAR method for behavioral questions.",
    recording_url: "https://example.com/recording1"
  },
  {
    id: "session2",
    user_id: "user123",
    date: "2023-04-10",
    duration: 20,
    questions_attempted: 7,
    feedback: "Improved confidence. Some technical answers could be more detailed. Overall good progress."
  }
];

// Helper function to get category badge color
const getCategoryBadgeColor = (category: 'behavioral' | 'technical' | 'situational') => {
  switch (category) {
    case 'behavioral':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'technical':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'situational':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

// Helper function to get difficulty badge color
const getDifficultyBadgeColor = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'advanced':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const InterviewPrep = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<InterviewQuestion[]>(mockInterviewQuestions);
  const [filteredQuestions, setFilteredQuestions] = useState<InterviewQuestion[]>(mockInterviewQuestions);
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showQuestionDialog, setShowQuestionDialog] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>(mockPracticeSessions);
  const [answer, setAnswer] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');
  const [feedback, setFeedback] = useState<{
    strengths: string[];
    improvements: string[];
    overall: string;
    score: number;
  }>({
    strengths: [],
    improvements: [],
    overall: '',
    score: 0
  });
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [interviewMode, setInterviewMode] = useState<'practice' | 'simulation'>('practice');
  
  // Get unique roles for filter
  const uniqueRoles = ['all', ...Array.from(new Set(questions.map(q => q.role)))];
  
  useEffect(() => {
    // Filter questions based on selected filters
    let results = questions;
    
    if (selectedRole !== 'all') {
      results = results.filter(q => q.role === selectedRole);
    }
    
    if (selectedCategory !== 'all') {
      results = results.filter(q => q.category === selectedCategory);
    }
    
    if (selectedDifficulty !== 'all') {
      results = results.filter(q => q.difficulty === selectedDifficulty);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(q => 
        q.question.toLowerCase().includes(query) || 
        q.role.toLowerCase().includes(query)
      );
    }
    
    setFilteredQuestions(results);
  }, [selectedRole, selectedCategory, selectedDifficulty, searchQuery, questions]);
  
  const handleStartSession = () => {
    // Randomly select a question
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const question = filteredQuestions[randomIndex];
    
    if (question) {
      setCurrentQuestion(question);
      setShowQuestionDialog(true);
      setAnswer('');
      setTranscript('');
      setShowFeedback(false);
    } else {
      toast.error("No questions match your current filters. Please adjust filters and try again.");
    }
  };
  
  const handleNextQuestion = () => {
    // Filter out the current question
    const remainingQuestions = filteredQuestions.filter(q => q.id !== currentQuestion?.id);
    
    if (remainingQuestions.length > 0) {
      // Randomly select another question
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const question = remainingQuestions[randomIndex];
      
      setCurrentQuestion(question);
      setAnswer('');
      setTranscript('');
      setShowFeedback(false);
    } else {
      toast.info("You've gone through all available questions! You can adjust filters for more questions.");
      setShowQuestionDialog(false);
    }
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      
      // In a real app, we would have actual transcription and audio data
      // For demo purposes, generate a mock transcript
      if (currentQuestion) {
        const mockTranscript = `I would address this by first understanding the situation completely. For example, when I was working at my previous job, I encountered a similar challenge and I approached it by analyzing the root cause before taking action. This helped me to develop an effective solution.`;
        setTranscript(mockTranscript);
      }
      
      toast.success("Recording saved successfully!");
      
      // Generate AI feedback (mocked for demo)
      generateFeedback();
      
    } else {
      // Start recording
      setIsRecording(true);
      setTranscript('');
      toast.info("Recording started... Speak clearly into your microphone.");
      
      // Request microphone permission
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function(stream) {
            // Successfully got audio stream, but we won't actually use it in this demo
            toast.success("Microphone access granted");
          })
          .catch(function(err) {
            toast.error("Microphone access denied. Please enable microphone access to record your answer.");
            setIsRecording(false);
          });
      } else {
        toast.error("Your browser doesn't support audio recording");
        setIsRecording(false);
      }
    }
  };
  
  const handlePlayRecording = () => {
    if (isPlaying) {
      setIsPlaying(false);
      toast.info("Playback paused");
    } else {
      setIsPlaying(true);
      toast.info("Playing recording...");
      
      // Simulate playback ending after 5 seconds
      setTimeout(() => {
        setIsPlaying(false);
        toast.info("Playback finished");
      }, 5000);
    }
  };
  
  const handleSubmitAnswer = () => {
    if (!answer.trim() && !transcript) {
      toast.error("Please provide an answer before submitting");
      return;
    }
    
    // Generate AI feedback (mocked for demo)
    generateFeedback();
    
    // In a real app, we'd submit the answer to the backend for analysis
    toast.success("Answer submitted for review!");
  };
  
  const generateFeedback = () => {
    // In a real app, this would be generated by an AI based on the actual answer
    // For demo purposes, generate mock feedback
    
    const mockFeedback = {
      strengths: [
        "You provided a clear structure to your answer",
        "You included a relevant example from your experience",
        "Your communication was professional and articulate"
      ],
      improvements: [
        "Consider using the STAR method more explicitly",
        "You could provide more specific details about the outcome",
        "Try to connect your example more clearly to the question"
      ],
      overall: "Your answer demonstrates good communication skills and relevant experience. To improve, focus on providing more specific details and measurable outcomes from your examples.",
      score: Math.floor(Math.random() * 30) + 70 // Random score between 70-100
    };
    
    setFeedback(mockFeedback);
    setShowFeedback(true);
    
    // Create a new practice session
    const newSession: PracticeSession = {
      id: `session${new Date().getTime()}`,
      user_id: user?.id || "guest",
      date: new Date().toISOString().split('T')[0],
      duration: Math.floor(Math.random() * 10) + 3, // Random duration between 3-12 minutes
      questions_attempted: 1,
      feedback: mockFeedback.overall,
      recording_url: Math.random() > 0.5 ? "https://example.com/recording" : undefined // Randomly add recording URL
    };
    
    setPracticeSessions([newSession, ...practiceSessions]);
  };
  
  const handleSaveSession = () => {
    toast.success("Practice session saved to your profile!");
    setShowQuestionDialog(false);
  };
  
  const startInterviewSimulation = () => {
    setInterviewMode('simulation');
    handleStartSession();
    toast.info("Starting interview simulation mode. Your responses will be timed and evaluated for realistic interview practice.");
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Interview Preparation Tools</h1>
        
        <Tabs defaultValue="questions">
          <TabsList className="mb-6">
            <TabsTrigger value="questions">Practice Questions</TabsTrigger>
            <TabsTrigger value="practice">Practice Sessions</TabsTrigger>
            <TabsTrigger value="simulation">Interview Simulation</TabsTrigger>
            <TabsTrigger value="tips">Interview Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Common Interview Questions</CardTitle>
                <CardDescription>
                  Browse and practice with common interview questions for different roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4 mb-4">
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueRoles.map(role => (
                          <SelectItem key={role} value={role}>
                            {role === 'all' ? 'All Roles' : role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Question Type</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Question type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="behavioral">Behavioral</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="situational">Situational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger id="difficulty">
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
                  
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search questions..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <Button className="mb-6" onClick={() => {
                  setInterviewMode('practice');
                  handleStartSession();
                }}>
                  Start Practice Session
                </Button>
                
                <div className="grid gap-4">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map(question => (
                      <Card key={question.id} className="bg-white">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{question.question}</CardTitle>
                              <CardDescription>{question.role}</CardDescription>
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                              <Badge className={getCategoryBadgeColor(question.category)}>
                                {question.category}
                              </Badge>
                              <Badge className={getDifficultyBadgeColor(question.difficulty)}>
                                {question.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setInterviewMode('practice');
                              setCurrentQuestion(question);
                              setShowQuestionDialog(true);
                              setAnswer('');
                              setTranscript('');
                              setShowFeedback(false);
                            }}
                          >
                            Practice This Question
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No questions match your current filters.</p>
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setSelectedRole('all');
                          setSelectedCategory('all');
                          setSelectedDifficulty('all');
                          setSearchQuery('');
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>Your Practice Sessions</CardTitle>
                <CardDescription>
                  Review your past interview practice sessions and feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                {practiceSessions.length > 0 ? (
                  <div className="grid gap-4">
                    {practiceSessions.map(session => (
                      <Card key={session.id} className="bg-white">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">Practice Session</CardTitle>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <Calendar className="h-4 w-4" />
                                <span>{session.date}</span>
                                <Clock className="h-4 w-4 ml-2" />
                                <span>{session.duration} minutes</span>
                                <MessageSquare className="h-4 w-4 ml-2" />
                                <span>{session.questions_attempted} questions</span>
                              </div>
                            </div>
                            {session.recording_url && (
                              <Button variant="outline" size="sm">
                                <Video className="h-4 w-4 mr-2" />
                                View Recording
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-muted p-3 rounded-md">
                            <div className="flex items-start gap-2">
                              <MessageCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div>
                                <h4 className="font-medium text-sm mb-1">Feedback:</h4>
                                <p className="text-sm text-muted-foreground">{session.feedback}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't completed any practice sessions yet.</p>
                    <Button onClick={() => {
                      setInterviewMode('practice');
                      handleStartSession();
                    }}>Start Your First Practice</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="simulation">
            <Card>
              <CardHeader>
                <CardTitle>Interview Simulation</CardTitle>
                <CardDescription>
                  Experience a realistic interview simulation with timed responses and professional feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Entry Level Positions</CardTitle>
                      <CardDescription>
                        Practice for roles that require minimal experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        This simulation includes common questions for entry-level positions in customer service, retail, administrative work, and more.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">15 questions simulation</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">Timed responses</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">Instant AI feedback</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={startInterviewSimulation} className="w-full">
                        Start Simulation
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Specialized Roles</CardTitle>
                      <CardDescription>
                        Practice for roles requiring specific skills or certifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        This simulation focuses on roles that require specific skills or certifications in healthcare, technology, trades, and more.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">20 questions simulation</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">Technical and behavioral questions</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">Detailed performance analysis</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={startInterviewSimulation} className="w-full">
                        Start Simulation
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tips">
            <Card>
              <CardHeader>
                <CardTitle>Interview Tips</CardTitle>
                <CardDescription>
                  Expert advice to help you succeed in your interviews
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Before the Interview</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Research the company and position thoroughly</li>
                    <li>Practice common interview questions</li>
                    <li>Prepare your own questions to ask the interviewer</li>
                    <li>Plan your outfit the day before</li>
                    <li>Get a good night's sleep</li>
                    <li>Arrive 10-15 minutes early (or log in early for virtual interviews)</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">During the Interview</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Maintain good posture and eye contact</li>
                    <li>Speak clearly and at a moderate pace</li>
                    <li>Use the STAR method for behavioral questions (Situation, Task, Action, Result)</li>
                    <li>Be specific with examples from your experience</li>
                    <li>Show enthusiasm for the role and company</li>
                    <li>Ask thoughtful questions when given the opportunity</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">After the Interview</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Send a thank-you email within 24 hours</li>
                    <li>Reflect on what went well and what could be improved</li>
                    <li>Follow up if you haven't heard back within the timeframe they provided</li>
                    <li>Continue your job search until you've accepted an offer</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">The STAR Method Explained</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Situation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Describe the context. What was the situation you were in?</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Task</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Explain your responsibility. What were you asked to do?</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Action</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Describe what you did. How did you complete the task?</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Result</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Share the outcome. What did you accomplish?</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Dialog open={showQuestionDialog} onOpenChange={setShowQuestionDialog}>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>
                {interviewMode === 'simulation' ? 'Interview Simulation' : 'Practice Question'}
              </DialogTitle>
              <DialogDescription>
                Role: {currentQuestion?.role}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium">{currentQuestion?.question}</h3>
                <div className="flex flex-col gap-1">
                  {currentQuestion && (
                    <>
                      <Badge className={getCategoryBadgeColor(currentQuestion.category)}>
                        {currentQuestion.category}
                      </Badge>
                      <Badge className={getDifficultyBadgeColor(currentQuestion.difficulty)}>
                        {currentQuestion.difficulty}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {!showFeedback ? (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex items-start mb-2">
                      <BookOpen className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                      <h4 className="font-medium">Preparation Tips:</h4>
                    </div>
                    {currentQuestion?.category === 'behavioral' && (
                      <p className="text-sm text-muted-foreground">
                        Use the STAR method (Situation, Task, Action, Result) to structure your answer.
                        Focus on specific examples from your past experiences.
                      </p>
                    )}
                    {currentQuestion?.category === 'technical' && (
                      <p className="text-sm text-muted-foreground">
                        Be clear and concise. Explain technical concepts in simple terms.
                        If you don't know something, it's okay to say so and explain how you would find the answer.
                      </p>
                    )}
                    {currentQuestion?.category === 'situational' && (
                      <p className="text-sm text-muted-foreground">
                        Describe how you would handle the hypothetical situation step by step.
                        Emphasize your problem-solving approach and decision-making process.
                      </p>
                    )}
                  </div>
                  
                  {transcript ? (
                    <div className="space-y-2">
                      <Label>Your Recorded Answer:</Label>
                      <div className="bg-muted/40 p-4 rounded-md">
                        <p className="text-sm">{transcript}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handlePlayRecording}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Play Recording
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={toggleRecording}
                        >
                          <Mic className="h-4 w-4 mr-2" />
                          Record Again
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="answer">Your Answer:</Label>
                      <Textarea 
                        id="answer" 
                        placeholder="Type your answer here..." 
                        rows={5}
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                        disabled={isRecording}
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant={isRecording ? "destructive" : "outline"}
                      onClick={toggleRecording}
                    >
                      {isRecording ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          Record Answer
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      type="button"
                      disabled={(!answer.trim() && !transcript) || isRecording}
                      onClick={handleSubmitAnswer}
                    >
                      Get Feedback
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-md border border-green-200">
                    <div className="flex items-start gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">Strengths:</h4>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {feedback.strengths.map((strength, index) => (
                            <li key={index} className="text-sm text-green-700">{strength}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                    <div className="flex items-start gap-2 mb-3">
                      <XCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">Areas for Improvement:</h4>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {feedback.improvements.map((improvement, index) => (
                            <li key={index} className="text-sm text-amber-700">{improvement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Overall Feedback:</h4>
                    <p className="text-sm text-muted-foreground">{feedback.overall}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium">Performance Score:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              feedback.score >= 90 ? 'bg-green-500' : 
                              feedback.score >= 80 ? 'bg-blue-500' : 
                              feedback.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${feedback.score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{feedback.score}/100</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setShowFeedback(false)}>
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                    
                    <Button size="sm" variant="outline">
                      <FileAudio className="h-4 w-4 mr-2" />
                      Download Recording
                    </Button>
                    
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Feedback
                    </Button>
                    
                    <Button size="sm" onClick={handleSaveSession}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Session
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowQuestionDialog(false)}>
                Exit
              </Button>
              <Button onClick={handleNextQuestion} disabled={isRecording}>
                Next Question
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default InterviewPrep;
