
import React from 'react';
import { Check } from 'lucide-react';

interface PlanFeatureProps {
  feature: string;
}

const PlanFeature: React.FC<PlanFeatureProps> = ({ feature }) => {
  return (
    <li className="flex items-start mb-2">
      <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
      <span className="text-sm">{feature}</span>
    </li>
  );
};

export default PlanFeature;
