
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProgramCardProps {
  image?: string;
  title: string;
  description: string;
  employerBenefits?: string[];
  index?: number;
  learnMoreLink?: string;
}

const ProgramCard = ({
  image,
  title,
  description,
  employerBenefits = [],
  index = 0,
  learnMoreLink
}: ProgramCardProps) => {
  // Function to get a different accent color for each program card
  const getAccentGradient = (cardIndex: number) => {
    const gradients = [
      'from-brand-400 via-brand-600 to-brand-800', // Blue gradient
      'from-amber-400 via-amber-500 to-amber-600', // Amber gradient
      'from-brand-600 via-amber-500 to-amber-600', // Mixed gradient
    ];
    
    return gradients[cardIndex % gradients.length];
  };
  
  return (
    <div 
      className={cn(
        "relative p-[2px] rounded-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex-1",
        "before:absolute before:inset-0 before:rounded-lg",
        `before:bg-gradient-to-br ${getAccentGradient(index)}`,
        "before:content-[''] before:z-0"
      )}
    >
      <div className="relative bg-white rounded-lg h-full z-10">
        <Card className="relative overflow-hidden hover:shadow-md transition-shadow border-blue-100 h-full flex flex-col">
          <div className="w-full relative h-40 overflow-hidden bg-[#f8f8f8] flex items-center justify-center border-b border-blue-100">
            {image && <img src={image} alt={title} className="w-full h-full object-scale-down" />}
          </div>
          <CardHeader className={cn(
            "bg-blue-50/50"
          )}>
            <CardTitle className="text-xl font-semibold leading-tight">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <p className="text-muted-foreground">
              {description}
            </p>
            
            {employerBenefits.length > 0 && (
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <h4 className="text-sm font-semibold mb-2 text-blue-700">Employer Benefits:</h4>
                <ul className="text-sm space-y-1">
                  {employerBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-auto pt-2">
              {learnMoreLink ? (
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600 hover:text-blue-800"
                  asChild
                >
                  <a href={learnMoreLink} target="_blank" rel="noopener noreferrer">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </Button>
              ) : (
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600 hover:text-blue-800"
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgramCard;
