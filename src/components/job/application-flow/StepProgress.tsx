
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-2 text-sm">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className="font-medium">{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default StepProgress;
