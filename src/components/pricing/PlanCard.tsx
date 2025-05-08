
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PlanFeature from './PlanFeature';
import AlwaysIncludedFeature from './AlwaysIncludedFeature';

interface PlanCardProps {
  name: string;
  description: string;
  price: {
    monthly: string;
    annual: string;
  };
  features: string[];
  includedFeatures: string[];
  isPopular?: boolean;
  isAnnual: boolean;
  customBadge?: string;
  ctaText?: string;
  ctaLink?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  name, 
  description, 
  price, 
  features, 
  includedFeatures,
  isPopular = false,
  isAnnual,
  customBadge,
  ctaText = "Choose Plan",
  ctaLink = "#"
}) => {
  return (
    <div className={`bg-white border rounded-lg overflow-hidden ${isPopular ? 'border-indigo-500 shadow-lg relative' : 'border-gray-200'}`}>
      {isPopular && (
        <div className="bg-indigo-500 text-white text-xs font-medium py-1 px-4 text-center uppercase">
          Most Popular
        </div>
      )}
      {customBadge && (
        <div className="bg-gray-200 text-gray-800 text-xs font-medium py-1 px-4 text-center uppercase">
          {customBadge}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="border-t border-gray-200 pt-4 mb-6"></div>
        
        <ul className="space-y-2 mb-8">
          {features.map((feature, index) => (
            <PlanFeature key={index} feature={feature} />
          ))}
        </ul>

        {includedFeatures.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-500 font-medium mb-2">Always included in paid plans:</p>
            <ul className="space-y-2">
              {includedFeatures.map((feature, index) => (
                <AlwaysIncludedFeature key={index} feature={feature} />
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <div className="text-3xl font-bold mb-4">
            {isAnnual ? price.annual : price.monthly}
            {isAnnual && price.annual !== "$0" && (
              <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">-24%</span>
            )}
          </div>
          <Button 
            asChild
            className="w-full" 
            variant={isPopular ? "default" : "outline"}
          >
            <a href={ctaLink}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
