
import { AccessibilitySettings } from '@/types/user';

export interface AccessibilityOptionProps {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
  id: string;
}

export interface FontSizeSliderProps {
  fontSize: number;
  onChange: (value: number[]) => void;
}
