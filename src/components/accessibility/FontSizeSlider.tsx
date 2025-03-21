
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { FontSizeSliderProps } from './types';

export const FontSizeSlider = ({ fontSize, onChange }: FontSizeSliderProps) => {
  return (
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
        onValueChange={onChange}
        aria-label="Adjust font size"
      />
      <p className="text-xs text-muted-foreground">Adjust the size of text throughout the site</p>
    </div>
  );
};
