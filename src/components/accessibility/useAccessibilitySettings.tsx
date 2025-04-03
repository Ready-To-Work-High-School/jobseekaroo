import { useState, useEffect } from 'react';
import { AccessibilitySettings } from '@/types/user';
import { toast as toastType } from '@/hooks/use-toast';

interface UseAccessibilitySettingsProps {
  toast: typeof toastType;
  user: any;
  userProfile: any;
  updateProfile: (profile: any) => Promise<void>;
}

export const useAccessibilitySettings = ({ 
  toast, 
  user, 
  userProfile, 
  updateProfile 
}: UseAccessibilitySettingsProps) => {
  // Default settings
  const defaultSettings: AccessibilitySettings = {
    high_contrast: false,
    increased_font_size: false,
    reduce_motion: false,
    screen_reader_optimized: false
  };
  
  // Initialize settings from user profile or localStorage
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // First try to load from localStorage
    const savedSettings = localStorage.getItem('accessibility_settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    
    // If user has profile settings, use those
    if (userProfile?.accessibility_settings) {
      return userProfile.accessibility_settings;
    }
    
    // Otherwise use defaults
    return defaultSettings;
  });
  
  const [fontSize, setFontSize] = useState<number>(() => {
    const savedSize = localStorage.getItem('font_size_scale');
    return savedSize ? parseInt(savedSize) : 100; // Default 100%
  });
  
  // Apply settings to the DOM
  useEffect(() => {
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}%`;
    
    // Apply high contrast
    if (settings.high_contrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Apply reduced motion
    if (settings.reduce_motion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    // Apply screen reader optimization
    if (settings.screen_reader_optimized) {
      document.documentElement.setAttribute('role', 'application');
      document.documentElement.classList.add('sr-optimized');
    } else {
      document.documentElement.removeAttribute('role');
      document.documentElement.classList.remove('sr-optimized');
    }
    
    // Save to localStorage
    localStorage.setItem('accessibility_settings', JSON.stringify(settings));
    localStorage.setItem('font_size_scale', fontSize.toString());
    
  }, [settings, fontSize]);
  
  // Save settings to user profile when logged in
  useEffect(() => {
    if (user && userProfile) {
      // Only save when changed from profile settings
      const profileSettings = userProfile.accessibility_settings || defaultSettings;
      const hasChanges = JSON.stringify(profileSettings) !== JSON.stringify(settings);
      
      if (hasChanges) {
        // Don't await this - let it update in the background
        updateProfile({
          ...userProfile,
          accessibility_settings: settings
        });
      }
    }
  }, [settings, user, userProfile]);
  
  const handleSettingChange = (key: keyof AccessibilitySettings) => {
    setSettings(prev => {
      const newSettings = { 
        ...prev, 
        [key]: !prev[key] 
      };
      return newSettings;
    });
    
    // Show toast
    toast({
      title: `${key.toString().replace(/_/g, ' ')} ${!settings[key] ? 'enabled' : 'disabled'}`,
      description: `This setting has been ${!settings[key] ? 'enabled' : 'disabled'} and will be saved for your next visit.`
    });
  };
  
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
  };
  
  const resetSettings = () => {
    setSettings(defaultSettings);
    setFontSize(100);
    toast({
      title: "Settings reset",
      description: "All accessibility settings have been reset to default values."
    });
  };

  return {
    settings,
    setSettings,
    fontSize,
    setFontSize,
    defaultSettings,
    handleSettingChange,
    handleFontSizeChange,
    resetSettings
  };
};
