
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface InterviewNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  hasRecordedAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const InterviewNavigation: React.FC<InterviewNavigationProps> = ({
  currentQuestionIndex,
  totalQuestions,
  hasRecordedAnswer,
  onPrevious,
  onNext
}) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className="flex justify-between">
      <Button 
        variant="outline" 
        onClick={onPrevious}
        disabled={isFirstQuestion}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Previous Question
      </Button>
      
      <Button 
        onClick={onNext}
        disabled={isLastQuestion && !hasRecordedAnswer}
      >
        Next Question
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default InterviewNavigation;
