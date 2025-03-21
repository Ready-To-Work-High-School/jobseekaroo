
import { Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AccessibilityOption } from './AccessibilityOption';
import { FontSizeSlider } from './FontSizeSlider';
import { useAccessibilitySettings } from './useAccessibilitySettings';

export const AccessibilityMenu = () => {
  const { 
    settings, 
    fontSize, 
    handleSettingChange, 
    handleFontSizeChange, 
    resetSettings 
  } = useAccessibilitySettings();
  
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
        
        <div className="space-y-4 py-2">
          <AccessibilityOption
            id="high-contrast"
            label="High Contrast"
            description="Increase color contrast for better readability"
            checked={settings.high_contrast}
            onToggle={() => handleSettingChange('high_contrast')}
          />
          
          <FontSizeSlider 
            fontSize={fontSize} 
            onChange={handleFontSizeChange} 
          />
          
          <AccessibilityOption
            id="reduce-motion"
            label="Reduce Motion"
            description="Minimize animations and transitions"
            checked={settings.reduce_motion}
            onToggle={() => handleSettingChange('reduce_motion')}
          />
          
          <AccessibilityOption
            id="screen-reader"
            label="Screen Reader Mode"
            description="Optimize layout for screen readers"
            checked={settings.screen_reader_optimized}
            onToggle={() => handleSettingChange('screen_reader_optimized')}
          />
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetSettings}
            className="w-full mt-2"
          >
            Reset to Default
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
