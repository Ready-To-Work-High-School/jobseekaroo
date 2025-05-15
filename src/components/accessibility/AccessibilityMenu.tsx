
import { useState } from 'react';
import { 
  FontBoldIcon, 
  TextAlignJustifyIcon, 
  MoonIcon,
  SunIcon,
  MinusIcon,
  PlusIcon,
  AccessibilityIcon,
} from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';

export const AccessibilityMenu = () => {
  const { setTheme, theme } = useTheme();
  const [fontSize, setFontSize] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [lineSpacing, setLineSpacing] = useState(false);

  const increaseFontSize = () => {
    if (fontSize < 1.5) {
      const newSize = fontSize + 0.1;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}rem`;
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 0.8) {
      const newSize = fontSize - 0.1;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}rem`;
    }
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    if (newValue) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  const toggleLineSpacing = () => {
    const newValue = !lineSpacing;
    setLineSpacing(newValue);
    if (newValue) {
      document.body.classList.add('increased-spacing');
    } else {
      document.body.classList.remove('increased-spacing');
    }
  };

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <AccessibilityIcon className="h-4 w-4" />
          <span>Accessibility</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Accessibility Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Font Size</span>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 w-7 p-0" 
                onClick={decreaseFontSize}
                disabled={fontSize <= 0.8}
              >
                <MinusIcon className="h-3 w-3" />
              </Button>
              <span className="mx-2 text-xs">{Math.round(fontSize * 100)}%</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 w-7 p-0" 
                onClick={increaseFontSize}
                disabled={fontSize >= 1.5}
              >
                <PlusIcon className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <FontBoldIcon />
              High Contrast
            </span>
            <Switch checked={highContrast} onCheckedChange={toggleHighContrast} />
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <TextAlignJustifyIcon />
              Line Spacing
            </span>
            <Switch checked={lineSpacing} onCheckedChange={toggleLineSpacing} />
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleDarkMode} />
          </div>
        </div>
        
        <DropdownMenuItem className="justify-center mt-2 font-medium cursor-pointer">
          Reset All Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
