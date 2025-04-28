
import React from 'react';

interface StepByStepGuideProps {
  stepsText: string;
}

const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ stepsText }) => {
  // Check if the text has Step X: format
  if (!stepsText.includes('Step ')) {
    return <p className="text-muted-foreground">{stepsText}</p>;
  }
  
  const steps = stepsText
    .split(/Step \d+:/)
    .filter(Boolean)
    .map(step => step.trim());
  
  if (steps.length <= 1) {
    return <p className="text-muted-foreground">{stepsText}</p>;
  }

  return (
    <ol className="space-y-4 mt-3">
      {steps.map((step, index) => (
        <li key={index} className="flex items-start gap-3">
          <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-sm font-medium">{index + 1}</span>
          </div>
          <div className="text-muted-foreground">{step}</div>
        </li>
      ))}
    </ol>
  );
};

export default StepByStepGuide;
