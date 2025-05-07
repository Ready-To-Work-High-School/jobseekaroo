
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface StepperProps {
  currentStep: number;
  children: ReactNode;
  className?: string;
}

export interface StepProps {
  children: ReactNode;
  className?: string;
}

export const Stepper = ({ currentStep, children, className }: StepperProps) => {
  const steps = React.Children.toArray(children);
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                  index < currentStep 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : index === currentStep 
                      ? "border-primary text-primary bg-primary/10" 
                      : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {React.isValidElement(step) && (
                <div 
                  className={cn(
                    "text-xs mt-2 text-center",
                    index <= currentStep ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                >
                  {step.props.children}
                </div>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "flex-grow h-[2px] mx-1", 
                  index < currentStep ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const Step = ({ children }: StepProps) => {
  return <>{children}</>;
};
