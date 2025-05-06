
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Video, Mic, Play, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InterviewTips from '@/components/students/toolkit-steps/interview/InterviewTips';
import RecordingComplete from '@/components/students/toolkit-steps/interview/RecordingComplete';
import { useToast } from '@/hooks/use-toast';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import InterviewPracticeRecorder from '@/components/students/toolkit-steps/interview/InterviewPracticeRecorder';

const MockInterview = () => {
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const { toast } = useToast();
  const { isOnline } = useNetworkStatus();
  
  // Check network status on component mount
  useEffect(() => {
    if (!isOnline) {
      toast({
        title: "Network Connection Issue",
        description: "You appear to be offline. Some features may not work properly.",
        variant: "destructive",
        duration: 5000
      });
    }
  }, [isOnline, toast]);
  
  const commonQuestions = [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "What's your availability?",
    "What are your strengths?",
    "How do you handle stress or pressure?",
    "Describe a challenge you faced and how you overcame it."
  ];
  
  const handleRecordingComplete = (question: string) => {
    console.log("Recording complete for question:", question);
    setRecordedVideo("mock-video-url");
    setSelectedQuestion(question);
    
    toast({
      title: "Recording saved",
      description: "Your interview response has been saved successfully.",
      duration: 3000
    });
  };
  
  const resetRecording = () => {
    console.log("Resetting recording state");
    setRecordedVideo(null);
    setSelectedQuestion(null);
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Mock Interview Practice</h1>
      
      <Card className="p-6 border-primary/20 bg-gradient-to-r from-blue-50 to-indigo-50 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Video className="h-6 w-6 text-primary" />
          <h2 className="font-medium text-xl">Interview Simulator</h2>
        </div>
        
        {!recordedVideo ? (
          <InterviewPracticeRecorder 
            commonQuestions={commonQuestions}
            onComplete={handleRecordingComplete}
          />
        ) : (
          <RecordingComplete
            selectedQuestion={selectedQuestion!}
            onReset={resetRecording}
          />
        )}
      </Card>
      
      <InterviewTips />
    </div>
  );
};

export default MockInterview;
