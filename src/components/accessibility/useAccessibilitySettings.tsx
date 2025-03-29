
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile, AccessibilitySettings } from '@/types/user';

type UseAccessibilitySettingsProps = {
  toast: any;
  user: User | null;
  userProfile: UserProfile | null;
  updateProfile: (profile: any) => Promise<void>;
};

export const useAccessibilitySettings = ({ toast, user, userProfile, updateProfile }: UseAccessibilitySettingsProps) => {
  const defaultSettings: AccessibilitySettings = {
    high_contrast: false,
    increased_font_size: false,
    reduce_motion: false,
    screen_reader_optimized: false,
  };

  const [settings, setSettings] = useState<AccessibilitySettings>(
    userProfile?.accessibility_settings || defaultSettings
  );
  
  const [fontSize, setFontSize] = useState<number>(
    userProfile?.accessibility_settings?.increased_font_size ? 1.2 : 1
  );

  // Update settings when userProfile changes
  useEffect(() => {
    if (userProfile?.accessibility_settings) {
      setSettings(userProfile.accessibility_settings);
      setFontSize(userProfile.accessibility_settings.increased_font_size ? 1.2 : 1);
    }
  }, [userProfile]);

  // Update document CSS when settings change
  useEffect(() => {
    const html = document.documentElement;
    
    // Apply high contrast
    if (settings.high_contrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }
    
    // Apply reduced motion
    if (settings.reduce_motion) {
      html.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
    }
    
    // Apply screen reader optimizations
    if (settings.screen_reader_optimized) {
      html.classList.add('screen-reader');
    } else {
      html.classList.remove('screen-reader');
    }
    
    // Apply font size
    html.style.setProperty('--accessibility-font-scale', fontSize.toString());
    
  }, [settings, fontSize]);

  const handleSettingChange = async (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    if (user) {
      try {
        await updateProfile({
          accessibility_settings: newSettings
        });
        
        toast({
          title: "Settings updated",
          description: "Your accessibility preferences have been saved.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save your preferences. Please try again.",
          variant: "destructive",
        });
        
        // Revert changes if saving failed
        setSettings(settings);
      }
    }
  };

  const handleFontSizeChange = async (increase: boolean) => {
    const newSize = increase ? 1.2 : 1;
    setFontSize(newSize);
    
    const newSettings = { 
      ...settings, 
      increased_font_size: increase 
    };
    
    setSettings(newSettings);
    
    if (user) {
      try {
        await updateProfile({
          accessibility_settings: newSettings
        });
        
        toast({
          title: "Font size updated",
          description: "Your font size preference has been saved.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save your font size preference. Please try again.",
          variant: "destructive",
        });
        
        // Revert changes if saving failed
        setFontSize(increase ? 1 : 1.2);
        setSettings({
          ...settings,
          increased_font_size: !increase
        });
      }
    }
  };

  const resetSettings = async () => {
    setSettings(defaultSettings);
    setFontSize(1);
    
    if (user) {
      try {
        await updateProfile({
          accessibility_settings: defaultSettings
        });
        
        toast({
          title: "Settings reset",
          description: "Your accessibility preferences have been reset to defaults.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to reset your preferences. Please try again.",
          variant: "destructive",
        });
        
        // Revert changes if resetting failed
        if (userProfile?.accessibility_settings) {
          setSettings(userProfile.accessibility_settings);
          setFontSize(userProfile.accessibility_settings.increased_font_size ? 1.2 : 1);
        }
      }
    }
  };

  return {
    settings,
    fontSize,
    handleSettingChange,
    handleFontSizeChange,
    resetSettings
  };
};
