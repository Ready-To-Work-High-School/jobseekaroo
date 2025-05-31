
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AudioRecorder from '@/components/audio/AudioRecorder';
import AudioPlayback from '@/components/audio/AudioPlayback';

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

interface RecordedAnswer {
  audioBlob: Blob;
  audioUrl: string;
  questionText: string;
}

const MockInterview = () => {
  const [category, setCategory] = useState<'entry' | 'retail' | 'food'>('entry');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAnswers, setRecordedAnswers] = useState<{[key: number]: RecordedAnswer}>({});
  const { toast } = useToast();
  
  const questions = INTERVIEW_QUESTIONS[category];
  
  const handleRecordingStart = () => {
    setIsRecording(true);
    toast({
      title: "Recording started",
      description: "Answer the question as if you're in a real interview.",
    });
  };

  const handleRecordingStop = () => {
    setIsRecording(false);
  };

  const handleRecordingComplete = (audioBlob: Blob, audioUrl: string) => {
    const questionText = questions[currentQuestionIndex];
    setRecordedAnswers({
      ...recordedAnswers,
      [currentQuestionIndex]: {
        audioBlob,
        audioUrl,
        questionText
      }
    });
    
    toast({
      title: "Recording complete",
      description: "Your answer has been saved. You can play it back or download it.",
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

  const handleCategoryChange = (newCategory: 'entry' | 'retail' | 'food') => {
    setCategory(newCategory);
    setCurrentQuestionIndex(0);
    setRecordedAnswers({});
  };
  
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
                  onClick={() => handleCategoryChange('entry')}
                >
                  Entry Level (General)
                </Button>
                
                <Button 
                  variant={category === 'retail' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange('retail')}
                >
                  Retail Positions
                </Button>
                
                <Button 
                  variant={category === 'food' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => handleCategoryChange('food')}
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
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>
                  Interview Question {currentQuestionIndex + 1}
                </CardTitle>
                <CardDescription>Respond as if you're in a real interview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-6 rounded-lg mb-4 text-lg font-medium">
                  {questions[currentQuestionIndex]}
                </div>
                
                <div className="space-y-4">
                  {!recordedAnswers[currentQuestionIndex] ? (
                    <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
                      {isRecording ? (
                        <div className="text-center">
                          <div className="animate-pulse mb-4">
                            <div className="h-12 w-12 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                              <div className="h-6 w-6 bg-white rounded-full"></div>
                            </div>
                          </div>
                          <p className="text-red-500 font-medium mb-2">Recording...</p>
                          <p className="text-sm text-muted-foreground">Speak clearly and remember to maintain good posture</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <AudioRecorder 
                            onRecordingComplete={handleRecordingComplete}
                            isRecording={isRecording}
                            onRecordingStart={handleRecordingStart}
                            onRecordingStop={handleRecordingStop}
                          />
                          <p className="text-sm text-muted-foreground mt-4">Click to start recording your response</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <AudioPlayback 
                      audioUrl={recordedAnswers[currentQuestionIndex].audioUrl}
                      audioBlob={recordedAnswers[currentQuestionIndex].audioBlob}
                      questionText={recordedAnswers[currentQuestionIndex].questionText}
                    />
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
