
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Accessibility } from 'lucide-react';
import AccessibilityMenuContent from './AccessibilityMenuContent';

export const AccessibilityMenu: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Accessibility options">
          <Accessibility className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <AccessibilityMenuContent />
      </PopoverContent>
    </Popover>
  );
};

export default AccessibilityMenu;
