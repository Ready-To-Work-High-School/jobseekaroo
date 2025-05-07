
import { useEffect, useState } from 'react';

/**
 * Hook that creates a fade-in animation effect
 * @param delay Delay in milliseconds before the animation starts
 * @returns CSS class string for the animation
 */
export const useFadeIn = (delay: number = 0): string => {
  const [opacity, setOpacity] = useState('opacity-0');
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity('opacity-100 transition-opacity duration-500');
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [delay]);
  
  return opacity;
};

/**
 * Hook that creates a slide-in animation effect
 * @param direction Direction to slide in from: 'left', 'right', 'top', or 'bottom'
 * @param delay Delay in milliseconds before the animation starts
 * @returns CSS class string for the animation
 */
export const useSlideIn = (direction: 'left' | 'right' | 'top' | 'bottom' = 'left', delay: number = 0): string => {
  const [classes, setClasses] = useState('opacity-0');
  
  useEffect(() => {
    const initialClass = {
      left: 'opacity-0 -translate-x-4',
      right: 'opacity-0 translate-x-4',
      top: 'opacity-0 -translate-y-4',
      bottom: 'opacity-0 translate-y-4'
    }[direction];
    
    setClasses(initialClass);
    
    const timeout = setTimeout(() => {
      setClasses('opacity-100 translate-x-0 translate-y-0 transition-all duration-500');
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [direction, delay]);
  
  return classes;
};
