
import React from 'react';
import { Accessibility } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import AccessibilityMenuContent from './AccessibilityMenuContent';

export const AccessibilityMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="flex items-center justify-center rounded-full w-10 h-10 bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Accessibility Settings"
        >
          <Accessibility className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[450px] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>Accessibility Settings</SheetTitle>
        </SheetHeader>
        <AccessibilityMenuContent />
      </SheetContent>
    </Sheet>
  );
};

export default AccessibilityMenu;
