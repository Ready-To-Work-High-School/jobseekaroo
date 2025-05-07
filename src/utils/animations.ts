
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
