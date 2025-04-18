
import React from 'react';
import PlanCard from './PlanCard';
import { Infinity, MessageSquare, Zap, BarChart2, Search, Star, Workflow, HeadphonesIcon, Check } from 'lucide-react';

interface PlanGridProps {
  plans: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[]; // We'll convert this to the required format
    buttonText: string;
    popular: boolean;
    planId: string;
  }[];
  isEmployer: boolean;
  handleSubscribe: (planId: string) => void;
  isLoading: boolean;
}

const PlanGrid = ({ plans, isEmployer, handleSubscribe, isLoading }: PlanGridProps) => {
  // Function to convert string features to the required object format
  const convertFeatures = (stringFeatures: string[]) => {
    // Map string features to objects with default icon
    return stringFeatures.map(feature => ({
      icon: Check,
      title: feature,
      description: feature // Using the same string as description for now
    }));
  };
  
  return (
    <div className={`grid ${isEmployer ? 'md:grid-cols-3' : 'md:grid-cols-2 md:max-w-4xl mx-auto'} gap-6`}>
      {plans.map((plan) => (
        <PlanCard 
          key={plan.planId}
          name={plan.name}
          price={plan.price}
          period={plan.period}
          description={plan.description}
          features={convertFeatures(plan.features)}
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
