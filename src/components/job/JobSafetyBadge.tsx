
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield, CheckCircle } from 'lucide-react';

interface JobSafetyBadgeProps {
  safetyScore: number;
  isVerified?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const JobSafetyBadge = ({ safetyScore, isVerified = false, size = 'md' }: JobSafetyBadgeProps) => {
  const getBadgeVariant = () => {
    if (safetyScore >= 80) return 'success';
    if (safetyScore >= 60) return 'warning';
    return 'destructive';
  };
  
  const getBadgeLabel = () => {
    if (safetyScore >= 80) return 'Safe for Students';
    if (safetyScore >= 60) return 'Moderately Safe';
    return 'Safety Concerns';
  };
  
  const getBadgeSize = () => {
    switch (size) {
      case 'sm': return 'text-xs py-0.5';
      case 'lg': return 'text-base py-1';
      default: return 'text-sm py-0.5';
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1">
            <Badge variant={getBadgeVariant()} className={`${getBadgeSize()} gap-1`}>
              <Shield className="h-2 w-2" />
              {getBadgeLabel()}
            </Badge>
            {isVerified && (
              <Badge variant="outline" className={`${getBadgeSize()} gap-1 border-green-200 bg-green-50`}>
                <CheckCircle className="h-2 w-2 text-green-600" />
                <span className="text-green-700">Verified</span>
              </Badge>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Safety Score: {safetyScore}/100</p>
          <p className="text-xs text-muted-foreground mt-1">
            This rating reflects workplace safety, youth employment law compliance, and student feedback
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default JobSafetyBadge;
