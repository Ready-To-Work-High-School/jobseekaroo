
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Mic, ArrowLeft, ArrowRight, Play, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useNetworkStatus } from '@/providers/NetworkStatusProvider';
import ConnectivityError from '@/components/ErrorRecovery/ConnectivityError';

const INTERVIEW_QUESTIONS = {
  entry: [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "What's your availability?",
    "What are your strengths?",
    "How would you handle a difficult customer?",
    "Tell me about a time when you worked in a team.",
    "Do you have any questions for me?",
  ],
  retail: [
    "How would you handle a situation where a customer is dissatisfied with a product?",
    "Can you describe your cash handling experience?",
    "How would you prioritize tasks during a busy period?",
    "How would you respond to a customer asking for a discount?",
    "How do you stay motivated during slow periods?",
    "How would you handle a shoplifting situation?",
  ],
  food: [
    "How would you handle multiple orders coming in at once?",
    "How would you ensure food safety standards are maintained?",
    "How would you deal with a customer complaint about their meal?",
    "How do you work under time pressure?",
    "What would you do if you noticed a coworker not following hygiene protocols?",
    "How would you handle a situation where you made a mistake with a customer's order?",
  ]
};

const MockInterview = () => {
  const [category, setCategory] = useState<'entry' | 'retail' | 'food'>('entry');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAnswers, setRecordedAnswers] = useState<{[key: number]: boolean}>({});
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isOnline, checkConnection } = useNetworkStatus();
  
  const questions = INTERVIEW_QUESTIONS[category];

  useEffect(() => {
    // Check network connection when component mounts
    checkConnection();
  }, []);
  
  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording started",
      description: "Answer the question as if you're in a real interview.",
    });
    
    // Simulate recording with progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      if (progress >= 100) {
        clearInterval(interval);
        completeRecording();
      }
    }, 750);
  };
  
  const completeRecording = () => {
    setIsRecording(false);
    setRecordedAnswers({
      ...recordedAnswers,
      [currentQuestionIndex]: true
    });
    
    toast({
      title: "Recording complete",
      description: "Your answer has been saved and is available for review.",
    });
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording stopped",
      description: "You can try recording again.",
      variant: "destructive"
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      toast({
        title: "Interview complete",
        description: "You've completed all questions for this category.",
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handlePlayRecording = (index: number) => {
    setIsLoading(true);
    
    // Simulate loading audio file
    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(index);
      
      toast({
        title: "Playing recording",
        description: `Playing your answer to question ${index + 1}`,
      });
      
      // Simulate playback ending
      setTimeout(() => {
        setIsPlaying(null);
      }, 3000);
    }, 1000);
  };
  
  const handlePausePlayback = () => {
    setIsPlaying(null);
    toast({
      title: "Playback paused",
      description: "You can resume playback anytime",
    });
  };

  const handleRetry = async () => {
    setIsLoading(true);
    const isConnected = await checkConnection();
    setIsLoading(false);
    
    if (!isConnected) {
      toast({
        title: "Still offline",
        description: "Please check your internet connection",
        variant: "destructive"
      });
    }
  };
  
  if (!isOnline) {
    return (
      <Layout>
        <ConnectivityError 
          onRetry={handleRetry} 
          isRetrying={isLoading}
          errorMessage="Unable to connect to the interview service. Please check your internet connection to continue with your mock interview."
        />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Helmet>
        <title>Mock Interview Simulator | Job Seekers 4 HS</title>
        <meta
          name="description"
          content="Practice your interview skills with our interactive mock interview simulator."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="p-0 mr-2">
            <Link to="/interview-prep">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Interview Prep
            </Link>
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Mock Interview Simulator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Interview Type</CardTitle>
                <CardDescription>Select the type of interview to practice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant={category === 'entry' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => {
                    setCategory('entry');
                    setCurrentQuestionIndex(0);
                    setRecordedAnswers({});
                  }}
                >
                  Entry Level (General)
                </Button>
                
                <Button 
                  variant={category === 'retail' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => {
                    setCategory('retail');
                    setCurrentQuestionIndex(0);
                    setRecordedAnswers({});
                  }}
                >
                  Retail Positions
                </Button>
                
                <Button 
                  variant={category === 'food' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => {
                    setCategory('food');
                    setCurrentQuestionIndex(0);
                    setRecordedAnswers({});
                  }}
                >
                  Food Service
                </Button>
              </CardContent>
            </Card>
            
            <div className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{currentQuestionIndex + 1} of {questions.length} questions</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2" 
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                  
                  {/* Show recorded questions summary */}
                  {Object.keys(recordedAnswers).length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="text-sm font-medium mb-2">Recordings:</h4>
                      <div className="space-y-2">
                        {Object.keys(recordedAnswers).map((indexStr) => {
                          const index = parseInt(indexStr);
                          return (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-xs truncate max-w-[70%]">
                                Q{index + 1}: {questions[index].substring(0, 20)}...
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => isPlaying === index ? handlePausePlayback() : handlePlayRecording(index)}
                              >
                                {isLoading && parseInt(indexStr) === currentQuestionIndex ? (
                                  <Video className="h-3 w-3 animate-spin" />
                                ) : isPlaying === index ? (
                                  <ArrowRight className="h-3 w-3" />
                                ) : (
                                  <Play className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Interview Question {currentQuestionIndex + 1}
                </CardTitle>
                <CardDescription>Respond as if you're in a real interview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-6 rounded-lg mb-4 text-lg font-medium">
                  {questions[currentQuestionIndex]}
                </div>
                
                <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
                  {isRecording ? (
                    <div className="text-center">
                      <div className="animate-pulse mb-4">
                        <Mic className="h-12 w-12 text-red-500 mx-auto" />
                      </div>
                      <p className="text-red-500 font-medium mb-2">Recording...</p>
                      <p className="text-sm text-muted-foreground mb-4">Speak clearly and remember to maintain good posture</p>
                      <Button 
                        variant="destructive" 
                        onClick={handleStopRecording}
                      >
                        Stop Recording
                      </Button>
                    </div>
                  ) : recordedAnswers[currentQuestionIndex] ? (
                    <div className="text-center">
                      <Video className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-green-500 font-medium mb-2">Response Recorded</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Button 
                          variant="outline" 
                          onClick={handleStartRecording}
                        >
                          Record Again
                        </Button>
                        <Button 
                          onClick={() => isPlaying === currentQuestionIndex ? handlePausePlayback() : handlePlayRecording(currentQuestionIndex)}
                          className="gap-2"
                        >
                          {isLoading ? (
                            <>
                              <Video className="h-4 w-4 animate-spin" />
                              Loading...
                            </>
                          ) : isPlaying === currentQuestionIndex ? (
                            <>
                              <ArrowRight className="h-4 w-4" />
                              Playing...
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4" />
                              Listen to Response
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Button onClick={handleStartRecording} className="gap-2 mb-4">
                        <Mic className="h-4 w-4" />
                        Record Your Answer
                      </Button>
                      <p className="text-sm text-muted-foreground">Click to start recording your response</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Question
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1 && !recordedAnswers[currentQuestionIndex]}
              >
                Next Question
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-md mt-8">
          <h3 className="font-medium mb-2">Interview Tips</h3>
          <ul className="space-y-1 text-sm">
            <li>• Answer questions using the STAR method: Situation, Task, Action, Result</li>
            <li>• Maintain good eye contact with the interviewer</li>
            <li>• Speak clearly and at a moderate pace</li>
            <li>• Take a moment to think before answering difficult questions</li>
            <li>• Prepare 2-3 questions to ask the interviewer at the end</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default MockInterview;
