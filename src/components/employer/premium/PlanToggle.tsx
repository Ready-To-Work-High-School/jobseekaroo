
import React from 'react';
import { Button } from '@/components/ui/button';

interface PlanToggleProps {
  isEmployer: boolean;
  setIsEmployer: (value: boolean) => void;
}

const PlanToggle = ({ isEmployer, setIsEmployer }: PlanToggleProps) => {
  return (
    <div className="inline-flex rounded-md shadow-sm mb-8">
      <Button
        variant={isEmployer ? "default" : "outline"}
        onClick={() => setIsEmployer(true)}
        className="rounded-r-none"
      >
        For Employers
      </Button>
      <Button
        variant={!isEmployer ? "default" : "outline"}
        onClick={() => setIsEmployer(false)}
        className="rounded-l-none"
      >
        For Schools
      </Button>
    </div>
  );
};

export default PlanToggle;
