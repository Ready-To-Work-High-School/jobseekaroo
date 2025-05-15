
import { useState, useEffect, createContext, useContext } from 'react';

// Define the settings interface
export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: number;
  dyslexiaFont: boolean;
  enhancedFocus: boolean;
  reducedMotion: boolean;
  darkMode: boolean;
  screenReaderOptimized: boolean;
}

// Default settings
const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  fontSize: 1,
  dyslexiaFont: false,
  enhancedFocus: false,
  reducedMotion: false,
  darkMode: false,
  screenReaderOptimized: false,
};

// Create context
const AccessibilityContext = createContext<{
  settings: AccessibilitySettings;
  updateSettings: (key: keyof AccessibilitySettings, value: any) => void;
}>({
  settings: defaultSettings,
  updateSettings: () => {},
});

// Provider component
export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    // Load settings from localStorage on mount
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Apply settings to document
    document.documentElement.style.setProperty('--font-scale', settings.fontSize.toString());
    
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    if (settings.dyslexiaFont) {
      document.documentElement.classList.add('dyslexia-font');
    } else {
      document.documentElement.classList.remove('dyslexia-font');
    }
    
    if (settings.enhancedFocus) {
      document.documentElement.classList.add('enhanced-focus');
    } else {
      document.documentElement.classList.remove('enhanced-focus');
    }
    
    if (settings.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    
    if (settings.screenReaderOptimized) {
      document.documentElement.classList.add('screen-reader');
    } else {
      document.documentElement.classList.remove('screen-reader');
    }
  }, [settings]);

  const updateSettings = (key: keyof AccessibilitySettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Hook for using accessibility settings
export const useAccessibilitySettings = () => {
  const context = useContext(AccessibilityContext);
  
  if (!context) {
    throw new Error('useAccessibilitySettings must be used within an AccessibilityProvider');
  }
  
  return context;
};
