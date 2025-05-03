
import React from 'react';
import PlanCard from './PlanCard';

interface PlanGridProps {
  plans: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    buttonText: string;
    popular: boolean;
    planId: string;
  }[];
  isEmployer: boolean;
  handleSubscribe: (planId: string) => void;
  isLoading: boolean;
}

const PlanGrid = ({ plans, isEmployer, handleSubscribe, isLoading }: PlanGridProps) => {
  return (
    <div className={`grid ${isEmployer ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 md:max-w-4xl mx-auto'} gap-6`}>
      {plans.map((plan) => (
        <PlanCard 
          key={plan.planId}
          {...plan}
          onSubscribe={handleSubscribe}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default PlanGrid;
