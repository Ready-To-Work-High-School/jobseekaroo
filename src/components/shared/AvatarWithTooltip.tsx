
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AvatarWithTooltipProps {
  src?: string;
  fallback: string;
  tooltipContent: React.ReactNode;
  alt?: string;
  name?: string; // Added name prop for color generation
  useColorBackground?: boolean; // Added prop to toggle between image and color
}

// Function to generate a consistent color from a name string
const generateColorFromName = (name: string): string => {
  // Get a hash value from the name to ensure consistency
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // List of vibrant background colors
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-lavender-500',
    'bg-brand-500', 'bg-cyan-500', 'bg-teal-500', 'bg-orange-500'
  ];
  
  // Use the hash to select a color
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
};

const AvatarWithTooltip = ({ 
  src, 
  fallback, 
  tooltipContent, 
  alt, 
  name,
  useColorBackground = true // Default to color background if not specified
}: AvatarWithTooltipProps) => {
  // Use name for color generation, fallback to the fallback text if name not provided
  const nameToUse = name || fallback;
  const backgroundColorClass = generateColorFromName(nameToUse);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar>
            {(!useColorBackground && src) && <AvatarImage src={src} alt={alt || fallback} />}
            <AvatarFallback 
              className={`text-white ${useColorBackground ? backgroundColorClass : 'bg-gray-300'}`}
            >
              {fallback}
            </AvatarFallback>
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
