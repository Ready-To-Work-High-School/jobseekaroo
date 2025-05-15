
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  useAccessibilitySettings,
  AccessibilitySettings,
} from './useAccessibilitySettings';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AccessibilityMenuContent = () => {
  const { settings, updateSettings } = useAccessibilitySettings();
  const [fontScale, setFontScale] = useState(settings.fontSize);

  useEffect(() => {
    setFontScale(settings.fontSize);
  }, [settings.fontSize]);

  const handleFontScaleChange = (value: number[]) => {
    setFontScale(value[0]);
    updateSettings('fontSize', value[0]);
  };

  const handleToggle = (key: keyof AccessibilitySettings) => {
    updateSettings(key, !settings[key]);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Text Options</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="font-scale">Font Size</Label>
              <span className="text-sm font-medium">
                {fontScale === 0.9
                  ? 'Small'
                  : fontScale === 1
                  ? 'Default'
                  : fontScale === 1.1
                  ? 'Large'
                  : 'X-Large'}
              </span>
            </div>
            <Slider
              id="font-scale"
              min={0.9}
              max={1.2}
              step={0.1}
              value={[fontScale]}
              onValueChange={handleFontScaleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-x-2 flex items-center">
              <Label htmlFor="high-contrast">High Contrast</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Increases contrast between text and background
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={() => handleToggle('highContrast')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-x-2 flex items-center">
              <Label htmlFor="dyslexia-font">Dyslexia-Friendly Font</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Uses OpenDyslexic font to improve readability
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              id="dyslexia-font"
              checked={settings.dyslexiaFont}
              onCheckedChange={() => handleToggle('dyslexiaFont')}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Visual Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-x-2 flex items-center">
              <Label htmlFor="reduced-motion">Reduced Motion</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Reduces animations and transitions
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              id="reduced-motion"
              checked={settings.reducedMotion}
              onCheckedChange={() => handleToggle('reducedMotion')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-x-2 flex items-center">
              <Label htmlFor="screen-reader">Screen Reader Optimized</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Optimizes content for screen readers
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              id="screen-reader"
              checked={settings.screenReaderOptimized}
              onCheckedChange={() => handleToggle('screenReaderOptimized')}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Focus Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-x-2 flex items-center">
              <Label htmlFor="focus-indicators">Enhanced Focus Indicators</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Makes focus indicators more visible
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch
              id="focus-indicators"
              checked={settings.enhancedFocus}
              onCheckedChange={() => handleToggle('enhancedFocus')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityMenuContent;
