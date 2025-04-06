
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AvatarWithTooltipProps {
  src?: string;
  fallback: string;
  tooltipContent: React.ReactNode;
  alt?: string;
}

const AvatarWithTooltip = ({ src, fallback, tooltipContent, alt }: AvatarWithTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            {src && <AvatarImage src={src} alt={alt || fallback} />}
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent side="top">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AvatarWithTooltip;
