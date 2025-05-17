
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Video, X } from 'lucide-react';

interface RecordingCompleteProps {
  selectedQuestion: string;
  onReset: () => void;
}

const RecordingComplete = ({ selectedQuestion, onReset }: RecordingCompleteProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg border border-green-200">
        <div className="flex flex-col items-center text-center">
          <div className="mb-2">
            <Check className="h-10 w-10 text-green-500" />
          </div>
          <p className="font-medium text-green-600">Recording Complete!</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Answered: <span className="font-medium">{selectedQuestion}</span>
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="secondary" className="flex-1" onClick={onReset}>
          <X className="h-4 w-4 mr-2" /> Retry
        </Button>
        <Button className="flex-1 bg-primary">
          <Video className="h-4 w-4 mr-2" /> Review
        </Button>
      </div>
    </div>
  );
};

export default RecordingComplete;
