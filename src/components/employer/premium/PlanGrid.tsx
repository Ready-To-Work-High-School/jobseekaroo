
import React from 'react';
import PlanCard from './PlanCard';
import { Check } from 'lucide-react';

interface PlanGridProps {
  plans: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[]; // This is already an array of strings in pricingData.ts
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
          name={plan.name}
          price={plan.price}
          period={plan.period}
          description={plan.description}
          features={plan.features} // No conversion needed anymore
          buttonText={plan.buttonText}
          popular={plan.popular}
          planId={plan.planId}
          onSubscribe={handleSubscribe}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default PlanGrid;
