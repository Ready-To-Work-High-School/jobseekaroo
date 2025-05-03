
import React from 'react';
import { Check, Infinity, MessageSquare, Zap, BarChart2, Search, Star, Workflow, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface PlanProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[]; // Changed from complex objects to simple strings for now
  buttonText: string;
  popular: boolean;
  planId: string;
  onSubscribe: (planId: string) => void;
  isLoading: boolean;
}

const PlanCard = ({
  name,
  price,
  period,
  description,
  features,
  buttonText,
  popular,
  planId,
  onSubscribe,
  isLoading,
}: PlanProps) => {
  // Show a free trial badge for premium plans only
  const showFreeTrial = planId === 'standard_monthly';

  return (
    <Card className={`flex flex-col ${popular ? 'border-primary shadow-lg relative overflow-hidden' : ''}`}>
      {popular && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <div className="mt-2 flex items-baseline">
          <span className="text-3xl font-extrabold">{price}</span>
          <span className="ml-1 text-sm text-muted-foreground">{period}</span>
        </div>
        {showFreeTrial && (
          <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
            30-day free trial
          </Badge>
        )}
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="text-lg font-semibold mb-4">Features:</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${popular ? 'bg-primary' : ''}`}
          onClick={() => onSubscribe(planId)}
          disabled={isLoading}
          variant={planId === 'free' || planId === 'school_free' ? 'outline' : 'default'}
        >
          {isLoading ? "Processing..." : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
