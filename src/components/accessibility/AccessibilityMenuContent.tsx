
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { AccessibilitySettings } from '@/types/user';

interface AccessibilityMenuContentProps {
  settings: AccessibilitySettings;
  fontSize: number;
  handleSettingChange: (key: keyof AccessibilitySettings, value: boolean) => void;
  handleFontSizeChange: (increase: boolean) => void;
  resetSettings: () => void;
}

export const AccessibilityMenuContent = ({
  settings,
  fontSize,
  handleSettingChange,
  handleFontSizeChange,
  resetSettings
}: AccessibilityMenuContentProps) => {
  return (
    <div className="space-y-4 py-2">
      <AccessibilityToggle
        id="high-contrast"
        label="High Contrast"
        description="Increase color contrast for better readability"
        checked={settings.highContrast}
        onChange={() => handleSettingChange('highContrast', !settings.highContrast)}
      />
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="font-size" className="font-medium">Text Size</Label>
          <span className="text-sm">{Math.round(fontSize * 100)}%</span>
        </div>
        <Slider
          id="font-size"
          min={75}
          max={150}
          step={5}
          value={[fontSize * 100]}
          onValueChange={(value) => handleFontSizeChange(value[0] > 100)}
          aria-label="Adjust font size"
        />
        <p className="text-xs text-muted-foreground">Adjust the size of text throughout the site</p>
      </div>
      
      <AccessibilityToggle
        id="reduce-motion"
        label="Reduce Motion"
        description="Minimize animations and transitions"
        checked={settings.reducedMotion}
        onChange={() => handleSettingChange('reducedMotion', !settings.reducedMotion)}
      />
      
      <AccessibilityToggle
        id="screen-reader"
        label="Screen Reader Mode"
        description="Optimize layout for screen readers"
        checked={settings.screenReaderOptimized}
        onChange={() => handleSettingChange('screenReaderOptimized', !settings.screenReaderOptimized)}
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
  );
};

// Extract the toggle component for reuse
interface AccessibilityToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

const AccessibilityToggle = ({
  id,
  label,
  description,
  checked,
  onChange
}: AccessibilityToggleProps) => (
  <div className="flex items-center justify-between">
    <div>
      <Label htmlFor={id} className="font-medium">{label}</Label>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <Switch 
      id={id} 
      checked={checked}
      onCheckedChange={onChange}
    />
  </div>
);
