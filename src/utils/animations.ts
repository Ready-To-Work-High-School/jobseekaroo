
import { useEffect, useState } from 'react';

export const useSlideIn = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4';
};

export const useFadeIn = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible ? 'animate-fade-in opacity-100' : 'opacity-0';
};

export const animateElement = (element: HTMLElement, animation: string, duration = 300) => {
  element.style.animation = `${animation} ${duration}ms forwards`;
  return new Promise(resolve => setTimeout(resolve, duration));
};
