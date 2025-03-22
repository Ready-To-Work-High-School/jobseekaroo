
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { AccessibilitySettings } from '@/types/user';

interface AccessibilityMenuContentProps {
  settings: AccessibilitySettings;
  fontSize: number;
  handleSettingChange: (key: keyof AccessibilitySettings) => void;
  handleFontSizeChange: (value: number[]) => void;
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
        checked={settings.high_contrast}
        onChange={() => handleSettingChange('high_contrast')}
      />
      
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
      
      <AccessibilityToggle
        id="reduce-motion"
        label="Reduce Motion"
        description="Minimize animations and transitions"
        checked={settings.reduce_motion}
        onChange={() => handleSettingChange('reduce_motion')}
      />
      
      <AccessibilityToggle
        id="screen-reader"
        label="Screen Reader Mode"
        description="Optimize layout for screen readers"
        checked={settings.screen_reader_optimized}
        onChange={() => handleSettingChange('screen_reader_optimized')}
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
