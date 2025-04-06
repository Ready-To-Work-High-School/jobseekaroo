
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const PremiumFeaturesCard: React.FC = () => {
  return (
    <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-md shadow-sm dark:bg-blue-950/20 dark:border-blue-900">
      <h3 className="font-medium text-xl mb-3 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-amber-500" />
        Premium Analytics Features
      </h3>
      <p className="text-muted-foreground mb-5">
        Unlock additional insights with our premium analytics package:
      </p>
      <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-6">
        <li>Detailed applicant skill mapping</li>
        <li>Student performance predictions</li>
        <li>Competitor job posting analysis</li>
        <li>Custom report generation</li>
        <li>Interactive data visualization tools</li>
      </ul>
      <p className="text-sm font-medium mb-4">Plans starting from $49.99/month</p>
      <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
        <Link to="/employer-premium">Upgrade to Premium</Link>
      </Button>
    </div>
  );
};

export default PremiumFeaturesCard;
