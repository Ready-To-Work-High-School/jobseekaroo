
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Video, Mic } from 'lucide-react';

interface InterviewPracticeRecorderProps {
  commonQuestions: string[];
  onComplete: (question: string) => void;
}

const InterviewPracticeRecorder = ({ commonQuestions, onComplete }: InterviewPracticeRecorderProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  
  const handleStartRecording = () => {
    if (!selectedQuestion) return;
    
    setRecording(true);
    
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setRecording(false);
      onComplete(selectedQuestion);
    }, 3000);
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h5 className="font-medium">Select a question to practice:</h5>
        <div className="grid grid-cols-1 gap-2">
          {commonQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setSelectedQuestion(question)}
              className={`p-3 text-left rounded-md transition-colors ${
                selectedQuestion === question 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-accent/50 hover:bg-accent'
              }`}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      
      {selectedQuestion && (
        <div className="mt-4 space-y-4">
          <div className="p-4 border rounded-md bg-card">
            <h5 className="font-medium mb-2">Selected Question:</h5>
            <p className="text-lg">{selectedQuestion}</p>
          </div>
          
          <Button 
            onClick={handleStartRecording} 
            disabled={recording}
            className="w-full flex items-center justify-center gap-2"
          >
            {recording ? (
              <>
                <Mic className="h-4 w-4 animate-pulse text-red-500" />
                Recording...
              </>
            ) : (
              <>
                <Video className="h-4 w-4" />
                Start Practice Recording
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            Note: This is a simulation. No actual recording will be made.
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewPracticeRecorder;
