
import { useEffect, useState } from 'react';

export const useSlideIn = (delay = 0, direction = 'up') => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (direction === 'up') {
    return isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4';
  } else if (direction === 'down') {
    return isVisible ? 'animate-slide-down opacity-100' : 'opacity-0 -translate-y-4';
  } else if (direction === 'right') {
    return isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0 translate-x-4';
  }
  
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

export const useZoomIn = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-95';
};

export const useStaggeredChildren = (childCount: number, baseDelay = 100, increment = 50) => {
  return Array.from({ length: childCount }, (_, i) => baseDelay + i * increment);
};

export const animateElement = (element: HTMLElement, animation: string, duration = 300) => {
  element.style.animation = `${animation} ${duration}ms forwards`;
  return new Promise(resolve => setTimeout(resolve, duration));
};

export const useInView = (ref: React.RefObject<HTMLElement>, options = {}) => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
  
  return isInView;
};

// Animation sequences for more complex animations
export const createAnimationSequence = (animations: { el: HTMLElement; animation: string; duration: number; delay: number }[]) => {
  return Promise.all(
    animations.map(({ el, animation, duration, delay }) => 
      new Promise(resolve => 
        setTimeout(() => {
          animateElement(el, animation, duration).then(resolve);
        }, delay)
      )
    )
  );
};
