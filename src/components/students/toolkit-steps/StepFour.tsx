
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Video } from 'lucide-react';
import InterviewPracticeRecorder from './interview/InterviewPracticeRecorder';
import RecordingComplete from './interview/RecordingComplete';
import InterviewTips from './interview/InterviewTips';

const StepFour = () => {
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  
  const commonQuestions = [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "What's your availability?",
    "What are your strengths?"
  ];
  
  const handleRecordingComplete = (question: string) => {
    setRecordedVideo("mock-video-url");
    setSelectedQuestion(question);
  };
  
  const resetRecording = () => {
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
