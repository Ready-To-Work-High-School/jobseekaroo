
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Play, X, Check, Video } from 'lucide-react';

interface InterviewPracticeRecorderProps {
  commonQuestions: string[];
  onComplete: (question: string) => void;
}

const InterviewPracticeRecorder = ({ commonQuestions, onComplete }: InterviewPracticeRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  
  const startRecording = (question: string) => {
    setSelectedQuestion(question);
    setIsRecording(true);
    // Simulate recording completion after 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      onComplete(question);
    }, 3000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
  };
  
  return (
    <div className="space-y-3">
      {!isRecording ? (
        <div className="space-y-3">
          <p className="font-medium">Select a question:</p>
          <div className="grid grid-cols-1 gap-2">
            {commonQuestions.map((question, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="justify-start text-left h-auto py-3" 
                onClick={() => startRecording(question)}
              >
                <Play className="h-4 w-4 mr-2 text-primary" /> {question}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-center p-6 bg-red-50 rounded-lg border border-red-200">
            <div className="flex flex-col items-center">
              <div className="animate-pulse mb-2">
                <Mic className="h-12 w-12 text-red-500" />
              </div>
              <p className="font-medium text-red-600">Recording...</p>
              <p className="text-sm text-muted-foreground mt-1">Answering: {selectedQuestion}</p>
            </div>
          </div>
          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={stopRecording}
          >
            <X className="h-4 w-4 mr-2" /> Stop Recording
          </Button>
        </div>
      )}
    </div>
  );
};

export default InterviewPracticeRecorder;
