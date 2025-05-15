
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { AccessibilitySettings } from '@/types/user';

interface AccessibilityMenuContentProps {
  settings: AccessibilitySettings;
  onSettingChange: (key: keyof AccessibilitySettings, value: boolean) => void;
}

const AccessibilityMenuContent: React.FC<AccessibilityMenuContentProps> = ({
  settings,
  onSettingChange,
}) => {
  return (
    <div className="p-4 w-full space-y-4">
      <div>
        <h3 className="text-lg font-medium">Accessibility Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize your experience with these accessibility features
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="high-contrast">High Contrast</Label>
            <p className="text-sm text-muted-foreground">
              Enhances color contrast for better visibility
            </p>
          </div>
          <Switch
            id="high-contrast"
            checked={settings.highContrast}
            onCheckedChange={(checked) => onSettingChange('highContrast', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="large-text">Large Text</Label>
            <p className="text-sm text-muted-foreground">
              Increases text size across the site
            </p>
          </div>
          <Switch
            id="large-text"
            checked={settings.largeText}
            onCheckedChange={(checked) => onSettingChange('largeText', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="reduced-motion">Reduced Motion</Label>
            <p className="text-sm text-muted-foreground">
              Minimizes animations and transitions
            </p>
          </div>
          <Switch
            id="reduced-motion"
            checked={settings.reducedMotion}
            onCheckedChange={(checked) => onSettingChange('reducedMotion', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="screen-reader">Screen Reader Optimized</Label>
            <p className="text-sm text-muted-foreground">
              Enhances compatibility with screen readers
            </p>
          </div>
          <Switch
            id="screen-reader"
            checked={settings.screenReaderOptimized}
            onCheckedChange={(checked) => onSettingChange('screenReaderOptimized', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="dyslexic-font">Dyslexic Font</Label>
            <p className="text-sm text-muted-foreground">
              Uses a font designed for readers with dyslexia
            </p>
          </div>
          <Switch
            id="dyslexic-font"
            checked={settings.dyslexicFont}
            onCheckedChange={(checked) => onSettingChange('dyslexicFont', checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default AccessibilityMenuContent;
