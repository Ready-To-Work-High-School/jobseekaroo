
import * as React from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
  children: React.ReactNode;
  className?: string;
}

const Stepper = ({ currentStep, children, className }: StepperProps) => {
  const steps = React.Children.toArray(children);
  
  return (
    <div className={cn("flex items-center w-full", className)}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center flex-col flex-1">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                i < currentStep 
                  ? "bg-primary text-primary-foreground" // completed
                  : i === currentStep
                    ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary" // current
                    : "bg-muted text-muted-foreground" // upcoming
              )}
            >
              {i < currentStep ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <div className={cn(
              "mt-2 text-xs font-medium text-center",
              i <= currentStep ? "text-foreground" : "text-muted-foreground"
            )}>
              {step}
            </div>
          </div>
          
          {i < steps.length - 1 && (
            <div className={cn(
              "flex-1 h-[2px]",
              i < currentStep ? "bg-primary" : "bg-muted"
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Step = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export { Stepper, Step };
