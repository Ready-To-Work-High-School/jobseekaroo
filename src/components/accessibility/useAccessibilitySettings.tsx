
import { useState, useEffect } from 'react';
import { AccessibilitySettings } from '@/types/user';

const DEFAULT_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  dyslexicFont: false,
  invertColors: false,
  grayscale: false,
  screenReaderOptimized: false,
};

const STORAGE_KEY = 'accessibility-settings';

export const useAccessibilitySettings = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error);
    }
  }, []);

  // Apply CSS classes based on settings
  useEffect(() => {
    const html = document.documentElement;
    
    if (settings.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }
    
    if (settings.largeText) {
      html.classList.add('large-text');
    } else {
      html.classList.remove('large-text');
    }
    
    if (settings.reducedMotion) {
      html.classList.add('reduced-motion');
    } else {
      html.classList.remove('reduced-motion');
    }
    
    if (settings.dyslexicFont) {
      html.classList.add('dyslexic-font');
    } else {
      html.classList.remove('dyslexic-font');
    }
    
    if (settings.invertColors) {
      html.classList.add('invert-colors');
    } else {
      html.classList.remove('invert-colors');
    }
    
    if (settings.grayscale) {
      html.classList.add('grayscale-mode');
    } else {
      html.classList.remove('grayscale-mode');
    }
    
    if (settings.screenReaderOptimized) {
      html.classList.add('screen-reader-optimized');
    } else {
      html.classList.remove('screen-reader-optimized');
    }
  }, [settings]);

  // Update a single setting
  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
    }
  };

  return { settings, updateSetting };
};
