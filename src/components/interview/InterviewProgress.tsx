
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InterviewProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

const InterviewProgress: React.FC<InterviewProgressProps> = ({
  currentQuestionIndex,
  totalQuestions
}) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{currentQuestionIndex + 1} of {totalQuestions} questions</p>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewProgress;
