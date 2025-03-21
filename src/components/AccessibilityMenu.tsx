import { useState, useEffect } from 'react';
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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { AccessibilitySettings } from '@/types/user';

export const AccessibilityMenu = () => {
  const { toast } = useToast();
  const { user, userProfile, updateProfile } = useAuth();
  
  // Default settings
  const defaultSettings: AccessibilitySettings = {
    high_contrast: false,
    increased_font_size: false,
    reduce_motion: false,
    screen_reader_optimized: false
  };
  
  // Initialize settings from user profile or localStorage
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // First try to load from localStorage
    const savedSettings = localStorage.getItem('accessibility_settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    
    // If user has profile settings, use those
    if (userProfile?.accessibility_settings) {
      return userProfile.accessibility_settings;
    }
    
    // Otherwise use defaults
    return defaultSettings;
  });
  
  const [fontSize, setFontSize] = useState<number>(() => {
    const savedSize = localStorage.getItem('font_size_scale');
    return savedSize ? parseInt(savedSize) : 100; // Default 100%
  });
  
  // Apply settings to the DOM
  useEffect(() => {
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}%`;
    
    // Apply high contrast
    if (settings.high_contrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Apply reduced motion
    if (settings.reduce_motion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    // Apply screen reader optimization
    if (settings.screen_reader_optimized) {
      document.documentElement.setAttribute('role', 'application');
      document.documentElement.classList.add('sr-optimized');
    } else {
      document.documentElement.removeAttribute('role');
      document.documentElement.classList.remove('sr-optimized');
    }
    
    // Save to localStorage
    localStorage.setItem('accessibility_settings', JSON.stringify(settings));
    localStorage.setItem('font_size_scale', fontSize.toString());
    
  }, [settings, fontSize]);
  
  // Save settings to user profile when logged in
  useEffect(() => {
    if (user && userProfile) {
      // Only save when changed from profile settings
      const profileSettings = userProfile.accessibility_settings || defaultSettings;
      const hasChanges = JSON.stringify(profileSettings) !== JSON.stringify(settings);
      
      if (hasChanges) {
        // Don't await this - let it update in the background
        updateProfile({
          ...userProfile,
          accessibility_settings: settings
        });
      }
    }
  }, [settings, user, userProfile]);
  
  const handleSettingChange = (key: keyof AccessibilitySettings) => {
    setSettings(prev => {
      const newSettings = { 
        ...prev, 
        [key]: !prev[key] 
      };
      return newSettings;
    });
    
    // Show toast
    toast({
      title: `${key.replace(/_/g, ' ')} ${!settings[key] ? 'enabled' : 'disabled'}`,
      description: `This setting has been ${!settings[key] ? 'enabled' : 'disabled'} and will be saved for your next visit.`
    });
  };
  
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
  };
  
  const resetSettings = () => {
    setSettings(defaultSettings);
    setFontSize(100);
    toast({
      title: "Settings reset",
      description: "All accessibility settings have been reset to default values."
    });
  };
  
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
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="high-contrast" className="font-medium">High Contrast</Label>
              <p className="text-xs text-muted-foreground">Increase color contrast for better readability</p>
            </div>
            <Switch 
              id="high-contrast" 
              checked={settings.high_contrast}
              onCheckedChange={() => handleSettingChange('high_contrast')}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="font-size" className="font-medium">Text Size</Label>
              <span className="text-sm">{fontSize}%</span>
            </div>
            <Slider
              id="font-size"
              min={75}
              max={150}
              step={5}
              value={[fontSize]}
              onValueChange={handleFontSizeChange}
              aria-label="Adjust font size"
            />
            <p className="text-xs text-muted-foreground">Adjust the size of text throughout the site</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reduce-motion" className="font-medium">Reduce Motion</Label>
              <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
            </div>
            <Switch 
              id="reduce-motion" 
              checked={settings.reduce_motion}
              onCheckedChange={() => handleSettingChange('reduce_motion')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="screen-reader" className="font-medium">Screen Reader Mode</Label>
              <p className="text-xs text-muted-foreground">Optimize layout for screen readers</p>
            </div>
            <Switch 
              id="screen-reader" 
              checked={settings.screen_reader_optimized}
              onCheckedChange={() => handleSettingChange('screen_reader_optimized')}
            />
          </div>
          
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
