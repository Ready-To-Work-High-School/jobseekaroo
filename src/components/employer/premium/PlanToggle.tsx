
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
        <ArrowRight className="mr-1 h-4 w-4" />
        For Employers
      </Button>
      <Button
        variant={!isEmployer ? "default" : "outline"}
        onClick={() => setIsEmployer(false)}
        className="rounded-l-none"
      >
        For Schools
        <ArrowLeft className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default PlanToggle;
