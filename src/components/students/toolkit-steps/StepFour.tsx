
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Video } from 'lucide-react';
import InterviewPracticeRecorder from './interview/InterviewPracticeRecorder';
import RecordingComplete from './interview/RecordingComplete';
import InterviewTips from './interview/InterviewTips';
import { useToast } from '@/hooks/use-toast';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

const StepFour = () => {
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
    "What are your strengths?"
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
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Interview Preparation</h3>
      
      <Card className="p-4 border-primary/20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-2 mb-4">
          <Video className="h-6 w-6 text-primary" />
          <h4 className="font-medium text-lg">Interview Practice</h4>
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

export default StepFour;
