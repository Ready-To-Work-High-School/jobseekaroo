
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, Play, X, Check, Video } from 'lucide-react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useToast } from '@/hooks/use-toast';

interface InterviewPracticeRecorderProps {
  commonQuestions: string[];
  onComplete: (question: string) => void;
}

const InterviewPracticeRecorder = ({ commonQuestions, onComplete }: InterviewPracticeRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const isOnline = useNetworkStatus();
  const { toast } = useToast();
  
  const startRecording = (question: string) => {
    if (!isOnline) {
      toast({
        title: "Network Error",
        description: "You appear to be offline. Recording may not work properly.",
        variant: "destructive"
      });
    }
    
    setSelectedQuestion(question);
    setIsRecording(true);
    setRecordingProgress(0);
    
    // Simulate recording progress
    const progressInterval = setInterval(() => {
      setRecordingProgress(prev => {
        const newProgress = prev + 33;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsRecording(false);
            setIsProcessing(true);
            // Simulate processing before completing
            setTimeout(() => {
              setIsProcessing(false);
              if (question) {
                onComplete(question);
              }
            }, 1000);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 1000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    setRecordingProgress(0);
  };
  
  return (
    <div className="space-y-3">
      {!isRecording && !isProcessing ? (
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
      ) : isProcessing ? (
        <div className="flex items-center justify-center p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex flex-col items-center">
            <div className="animate-spin mb-2">
              <Video className="h-12 w-12 text-blue-500" />
            </div>
            <p className="font-medium text-blue-600">Processing recording...</p>
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
              
              {/* Progress bar */}
              <div className="w-full mt-3 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-600 h-2 rounded-full" 
                  style={{ width: `${recordingProgress}%` }}
                />
              </div>
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
