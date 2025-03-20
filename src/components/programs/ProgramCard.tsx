import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
interface ProgramCardProps {
  image?: string;
  title: string;
  description: string;
  employerBenefits?: string[];
}
const ProgramCard = ({
  image,
  title,
  description,
  employerBenefits = []
}: ProgramCardProps) => {
  return <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-full relative h-40 overflow-hidden bg-[#f8f8f8] flex items-center justify-center">
        {image && <img src={image} alt={title} className="w-full h-full object-scale-down" />}
      </div>
      <CardHeader className="bg-sky-50">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {description}
        </p>
        
        {employerBenefits.length > 0 && <div>
            <h4 className="text-sm font-semibold mb-2 text-zinc-950">Employer Benefits:</h4>
            <ul className="text-sm space-y-1">
              {employerBenefits.map((benefit, i) => <li key={i} className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{benefit}</span>
                </li>)}
            </ul>
          </div>}
        
        <Button variant="link" className="p-0 h-auto">
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
      </CardContent>
    </Card>;
};
export default ProgramCard;