
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield, Info, CheckCircle2 } from 'lucide-react';

interface SafetyRatingProps {
  score: number;
  isVerified?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const SafetyRating = ({ 
  score, 
  isVerified = false, 
  size = 'md',
  showDetails = false
}: SafetyRatingProps) => {
  
  const getColor = () => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-green-400';
    if (score >= 60) return 'bg-amber-400';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  const getLabel = () => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Very Good';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };
  
  const getBadgeSize = () => {
    switch (size) {
      case 'sm': return 'text-xs py-0.5 px-1.5';
      case 'lg': return 'text-base py-1 px-3';
      default: return 'text-sm py-0.5 px-2';
    }
  };
  
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-3 w-3';
      case 'lg': return 'h-4 w-4';
      default: return 'h-3.5 w-3.5';
    }
  };
  
  return (
    <div className="flex flex-col">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-flex items-center gap-1">
              <Badge 
                variant="outline" 
                className={`${getBadgeSize()} gap-1 font-medium border-2`}
              >
                <Shield className={`${getIconSize()} text-blue-600`} />
                <span>Safety Score: {score}</span>
                <span className={`flex items-center justify-center rounded-full h-5 w-5 text-xs text-white ${getColor()}`}>
                  {Math.round(score / 10)}
                </span>
              </Badge>
              
              {isVerified && (
                <Badge 
                  variant="outline" 
                  className={`${getBadgeSize()} gap-1 font-medium border-green-200 bg-green-50`}
                >
                  <CheckCircle2 className={`${getIconSize()} text-green-600`} />
                  <span className="text-green-700">Verified</span>
                </Badge>
              )}
              
              <Info className="h-3 w-3 text-muted-foreground cursor-help" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Safety Score: {getLabel()}</p>
            <p className="text-xs text-muted-foreground">
              Based on employer verification, student feedback, and compliance with youth employment laws
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {showDetails && (
        <div className="mt-2 text-sm">
          <p className="font-medium">Score components:</p>
          <ul className="text-muted-foreground">
            <li className="flex justify-between">
              <span>• Verified business credentials</span>
              <span>{isVerified ? '✓' : '✗'}</span>
            </li>
            <li className="flex justify-between">
              <span>• Background checks for supervisors</span>
              <span>{score > 70 ? '✓' : 'Partial'}</span>
            </li>
            <li className="flex justify-between">
              <span>• Youth employment law compliance</span>
              <span>{score > 60 ? '✓' : 'Partial'}</span>
            </li>
            <li className="flex justify-between">
              <span>• Student feedback rating</span>
              <span>{Math.floor(score/10)}/10</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SafetyRating;
