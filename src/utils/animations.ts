import { useEffect, useState, useRef } from 'react';

// Only run animations if the device prefers animations
const prefersReducedMotion = typeof window !== 'undefined' && 
  window.matchMedia && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Helper function to determine if animations should run
const shouldAnimate = () => !prefersReducedMotion;

export const useSlideIn = (delay = 0, direction = 'up') => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!shouldAnimate()) {
      setIsVisible(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  try {
    if (!shouldAnimate()) {
      return '';  // No animation classes if reduced motion is preferred
    }
    
    if (direction === 'up') {
      return isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4';
    } else if (direction === 'down') {
      return isVisible ? 'animate-slide-down opacity-100' : 'opacity-0 -translate-y-4';
    } else if (direction === 'right') {
      return isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0 -translate-x-4';
    } else if (direction === 'left') {
      return isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0 translate-x-4';
    }
    
    return isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4';
  } catch (error) {
    console.error("Animation error:", error);
    return ''; // Fallback to no animation in case of error
  }
};

export const useFadeIn = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!shouldAnimate()) {
      setIsVisible(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return shouldAnimate() ? (isVisible ? 'animate-fade-in opacity-100' : 'opacity-0') : '';
};

export const useZoomIn = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!shouldAnimate()) {
      setIsVisible(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-95';
};

export const useSwiping = (onSwipeLeft?: () => void, onSwipeRight?: () => void) => {
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (diff > 100) {
      onSwipeLeft?.();
      setIsDragging(false);
    } else if (diff < -100) {
      onSwipeRight?.();
      setIsDragging(false);
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isDragging
  };
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
  if (!shouldAnimate()) {
    return Promise.resolve(); // Skip animations if reduced motion is preferred
  }
  
  return Promise.all(
    animations.map(({ el, animation, duration, delay }) => 
      new Promise(resolve => 
        setTimeout(() => {
          try {
            animateElement(el, animation, duration).then(resolve);
          } catch (error) {
            console.error("Animation sequence error:", error);
            resolve(undefined);
          }
        }, delay)
      )
    )
  );
};

// Mobile gesture detection hooks
export const useSwipeGesture = (
  threshold = 50,
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void
) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const deltaX = touchStart.x - endX;
    const deltaY = touchStart.y - endY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          onSwipeLeft?.();
        } else {
          onSwipeRight?.();
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          onSwipeUp?.();
        } else {
          onSwipeDown?.();
        }
      }
    }
  };
  
  return {
    handleTouchStart,
    handleTouchEnd
  };
};
