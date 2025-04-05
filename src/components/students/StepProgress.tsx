
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const StepProgress = ({ currentStep, totalSteps, stepTitles }: StepProgressProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground mb-2 sm:mb-0">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium">
          {progressPercentage}% Complete
        </span>
      </div>
      
      <Progress 
        value={progressPercentage} 
        className="h-3 progress-lavender-gold-purple" 
      />
      
      <div className="grid grid-cols-6 gap-1 mt-2">
        {stepTitles.map((title, index) => (
          <div 
            key={index} 
            className={cn(
              "text-center relative pt-6",
              index + 1 <= currentStep ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div 
              className={cn(
                "absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full",
                index + 1 < currentStep ? "bg-primary" : 
                index + 1 === currentStep ? "bg-primary animate-pulse" : 
                "bg-muted border border-muted-foreground"
              )}
            />
            <span className="text-xs font-medium hidden sm:block">{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;

