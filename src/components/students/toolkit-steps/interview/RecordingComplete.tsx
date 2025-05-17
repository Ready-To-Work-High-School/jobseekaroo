
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, RefreshCw } from 'lucide-react';

interface RecordingCompleteProps {
  selectedQuestion: string;
  onReset: () => void;
}

const RecordingComplete = ({ selectedQuestion, onReset }: RecordingCompleteProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center p-8 bg-green-50 rounded-lg">
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
          <h4 className="font-medium text-lg mb-1">Recording Completed!</h4>
          <p className="text-sm text-muted-foreground">
            You've practiced answering:
          </p>
          <p className="font-medium mt-2">"{selectedQuestion}"</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <h5 className="font-medium">Feedback:</h5>
        <div className="p-4 bg-accent/30 rounded-lg space-y-2">
          <div>
            <span className="font-medium">Strengths:</span>
            <p className="text-sm">Clear answer structure, good eye contact</p>
          </div>
          <div>
            <span className="font-medium">Areas to improve:</span>
            <p className="text-sm">Consider adding a specific example to strengthen your answer</p>
          </div>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Practice Another Question
      </Button>
    </div>
  );
};

export default RecordingComplete;
