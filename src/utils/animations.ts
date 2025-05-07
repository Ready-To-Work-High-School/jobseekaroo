
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
 * @param directionOrDelay Direction to slide in from: 'left', 'right', 'top', 'bottom' or delay in ms
 * @param delay Delay in milliseconds before the animation starts
 * @returns CSS class string for the animation
 */
export const useSlideIn = (
  directionOrDelay: 'left' | 'right' | 'top' | 'bottom' | number = 'left', 
  delay?: number
): string => {
  const [classes, setClasses] = useState('opacity-0');
  
  useEffect(() => {
    let direction: 'left' | 'right' | 'top' | 'bottom' = 'left';
    let actualDelay: number = 0;
    
    // Handle overloaded parameters
    if (typeof directionOrDelay === 'number') {
      direction = 'left';
      actualDelay = directionOrDelay;
    } else {
      direction = directionOrDelay;
      actualDelay = delay || 0;
    }
    
    const initialClass = {
      left: 'opacity-0 -translate-x-4',
      right: 'opacity-0 translate-x-4',
      top: 'opacity-0 -translate-y-4',
      bottom: 'opacity-0 translate-y-4'
    }[direction];
    
    setClasses(initialClass);
    
    const timeout = setTimeout(() => {
      setClasses('opacity-100 translate-x-0 translate-y-0 transition-all duration-500');
    }, actualDelay);
    
    return () => clearTimeout(timeout);
  }, [directionOrDelay, delay]);
  
  return classes;
};

/**
 * Hook that creates a numbered slide-in animation effect
 * This is an overload that accepts a number for the delay
 * @param delay Delay in milliseconds before the animation starts
 * @returns CSS class string for the animation
 */
export const useSlideInWithDelay = (delay: number = 0): string => {
  return useSlideIn('left', delay);
};

