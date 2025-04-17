
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface SimulationProgressBarProps {
  progress: number;
  showProgress: boolean;
}

const SimulationProgressBar = ({ progress, showProgress }: SimulationProgressBarProps) => {
  if (!showProgress) return null;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Your progress</span>
        <span className="text-sm">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default SimulationProgressBar;
