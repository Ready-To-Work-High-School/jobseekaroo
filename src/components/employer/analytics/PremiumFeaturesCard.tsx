
import React from 'react';
import { Button } from '@/components/ui/button';

const PremiumFeaturesCard: React.FC = () => {
  return (
    <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-md">
      <h3 className="font-medium text-lg mb-2">Premium Analytics Features</h3>
      <p className="text-muted-foreground mb-4">
        Unlock additional insights with our premium analytics package:
      </p>
      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-4">
        <li>Detailed applicant skill mapping</li>
        <li>Student performance predictions</li>
        <li>Competitor job posting analysis</li>
        <li>Custom report generation</li>
        <li>Interactive data visualization tools</li>
      </ul>
      <Button>Upgrade to Premium</Button>
    </div>
  );
};

export default PremiumFeaturesCard;
