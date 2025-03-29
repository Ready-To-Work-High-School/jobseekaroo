
import { Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { AccessibilityMenuContent } from './AccessibilityMenuContent';
import { useAccessibilitySettings } from './useAccessibilitySettings';

export const AccessibilityMenu = () => {
  const { toast } = useToast();
  const { user, userProfile, updateProfile } = useAuth();
  const { 
    settings, 
    fontSize, 
    handleSettingChange,
    handleFontSizeChange,
    resetSettings 
  } = useAccessibilitySettings({ 
    toast, 
    user, 
    userProfile, 
    // Update the type to match the new signature
    updateProfile: async (profile) => {
      try {
        await updateProfile(profile);
        return;
      } catch (error) {
        console.error('Error updating accessibility settings:', error);
      }
    }
  });
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          aria-label="Accessibility options"
          className="fixed bottom-4 right-4 z-40 bg-background shadow-md"
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-4">
        <DropdownMenuLabel className="text-lg font-semibold">Accessibility Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <AccessibilityMenuContent 
          settings={settings}
          fontSize={fontSize}
          handleSettingChange={handleSettingChange}
          handleFontSizeChange={handleFontSizeChange}
          resetSettings={resetSettings}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
