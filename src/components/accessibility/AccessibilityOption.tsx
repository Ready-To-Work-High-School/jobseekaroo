
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AccessibilityOptionProps } from './types';

export const AccessibilityOption = ({ 
  label, 
  description, 
  checked, 
  onToggle, 
  id 
}: AccessibilityOptionProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Label htmlFor={id} className="font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch 
        id={id} 
        checked={checked}
        onCheckedChange={onToggle}
      />
    </div>
  );
};
