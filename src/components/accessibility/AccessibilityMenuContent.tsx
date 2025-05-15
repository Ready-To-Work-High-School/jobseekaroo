
import React from 'react';
import {
  EyeIcon,
  TextIcon,
  ZoomInIcon,
  MousePointerClick,
  Moon,
  SunMoon,
  Glasses,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAccessibilitySettings } from './useAccessibilitySettings';

const AccessibilityMenuContent = () => {
  const { settings, updateSetting } = useAccessibilitySettings();

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Accessibility Options</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <EyeIcon className="h-4 w-4" />
            <Label htmlFor="high-contrast">High Contrast</Label>
          </div>
          <Switch
            id="high-contrast"
            checked={settings.highContrast}
            onCheckedChange={(checked) => updateSetting('highContrast', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TextIcon className="h-4 w-4" />
            <Label htmlFor="large-text">Large Text</Label>
          </div>
          <Switch
            id="large-text"
            checked={settings.largeText}
            onCheckedChange={(checked) => updateSetting('largeText', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MousePointerClick className="h-4 w-4" />
            <Label htmlFor="reduced-motion">Reduced Motion</Label>
          </div>
          <Switch
            id="reduced-motion"
            checked={settings.reducedMotion}
            onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Glasses className="h-4 w-4" />
            <Label htmlFor="dyslexic-font">Dyslexic Font</Label>
          </div>
          <Switch
            id="dyslexic-font"
            checked={settings.dyslexicFont}
            onCheckedChange={(checked) => updateSetting('dyslexicFont', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Moon className="h-4 w-4" />
            <Label htmlFor="invert-colors">Invert Colors</Label>
          </div>
          <Switch
            id="invert-colors"
            checked={settings.invertColors}
            onCheckedChange={(checked) => updateSetting('invertColors', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SunMoon className="h-4 w-4" />
            <Label htmlFor="grayscale">Grayscale</Label>
          </div>
          <Switch
            id="grayscale"
            checked={settings.grayscale}
            onCheckedChange={(checked) => updateSetting('grayscale', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ZoomInIcon className="h-4 w-4" />
            <Label htmlFor="screen-reader">Screen Reader Optimized</Label>
          </div>
          <Switch
            id="screen-reader"
            checked={settings.screenReaderOptimized}
            onCheckedChange={(checked) => updateSetting('screenReaderOptimized', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default AccessibilityMenuContent;
