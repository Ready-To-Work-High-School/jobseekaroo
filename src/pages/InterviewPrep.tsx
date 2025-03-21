
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
  Search 
} from 'lucide-react';
import { toast } from 'sonner';

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
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>(mockPracticeSessions);
  const [answer, setAnswer] = useState<string>('');
  
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
    } else {
      toast.info("You've gone through all available questions! You can adjust filters for more questions.");
      setShowQuestionDialog(false);
    }
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      toast.success("Recording saved successfully!");
      
      // Create a new practice session
      const newSession: PracticeSession = {
        id: `session${new Date().getTime()}`,
        user_id: user?.id || "guest",
        date: new Date().toISOString().split('T')[0],
        duration: 5, // mock duration
        questions_attempted: 1,
        feedback: "This is automated feedback. Your answer was clear and concise. Consider using more specific examples next time.",
      };
      
      setPracticeSessions([newSession, ...practiceSessions]);
    } else {
      // Start recording
      setIsRecording(true);
      toast.info("Recording started... Speak clearly into your microphone.");
    }
  };
  
  const handleSubmitAnswer = () => {
    toast.success("Answer submitted for review!");
    
    // Create a new practice session
    const newSession: PracticeSession = {
      id: `session${new Date().getTime()}`,
      user_id: user?.id || "guest",
      date: new Date().toISOString().split('T')[0],
      duration: 3, // mock duration
      questions_attempted: 1,
      feedback: "Your written answer shows good understanding. Try to include a specific example that demonstrates your point.",
    };
    
    setPracticeSessions([newSession, ...practiceSessions]);
    setShowQuestionDialog(false);
    setAnswer('');
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Interview Preparation Tools</h1>
        
        <Tabs defaultValue="questions">
          <TabsList className="mb-6">
            <TabsTrigger value="questions">Practice Questions</TabsTrigger>
            <TabsTrigger value="practice">Practice Sessions</TabsTrigger>
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
                
                <Button className="mb-6" onClick={handleStartSession}>
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
                              setCurrentQuestion(question);
                              setShowQuestionDialog(true);
                              setAnswer('');
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
                    <Button onClick={() => handleStartSession()}>Start Your First Practice</Button>
                  </div>
                )}
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
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Practice Question</DialogTitle>
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
                
                <div className="space-y-2">
                  <Label htmlFor="answer">Your Answer:</Label>
                  <Textarea 
                    id="answer" 
                    placeholder="Type your answer here..." 
                    rows={5}
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={toggleRecording}
                  >
                    {isRecording ? (
                      <>
                        <Pause className="h-4 w-4 mr-2 text-red-500" />
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
                    disabled={!answer.trim() && !isRecording}
                    onClick={handleSubmitAnswer}
                  >
                    Submit Answer
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowQuestionDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleNextQuestion}>
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
