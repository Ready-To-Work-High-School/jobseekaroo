
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

interface PlanProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: {
    icon: React.ElementType;
    title: string;
    description: string;
  }[];
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
  const premiumFeatures = [
    {
      icon: Infinity,
      title: 'Unlimited Job Postings',
      description: 'Post unlimited jobs without restrictions.'
    },
    {
      icon: MessageSquare,
      title: 'Unlimited Messaging',
      description: 'Communicate freely with all candidates.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Matching',
      description: 'Advanced AI matches you with ideal candidates.'
    },
    {
      icon: BarChart2,
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into job performance.'
    },
    {
      icon: Search,
      title: 'Advanced Candidate Search',
      description: 'Powerful filtering and search capabilities.'
    },
    {
      icon: Star,
      title: 'Featured Company Profile',
      description: 'Stand out with a highlighted employer profile.'
    },
    {
      icon: Workflow,
      title: 'Custom Workflows',
      description: 'Create personalized recruitment processes.'
    },
    {
      icon: HeadphonesIcon,
      title: 'Priority Support',
      description: 'Dedicated support team always ready to help.'
    }
  ];

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
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="text-lg font-semibold mb-4">Premium Features:</h3>
        <div className="space-y-3">
          {premiumFeatures.map((feature, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div className="flex items-center hover:bg-muted/50 p-2 rounded-md transition-colors cursor-help">
                    <feature.icon className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">{feature.title}</p>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  {feature.description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
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
