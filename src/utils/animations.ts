export const useFadeIn = (delay = 0) => {
  // Keep the animation simple for faster initial render
  return `animate-fade-in opacity-0 [animation-delay:${delay}ms] [animation-fill-mode:forwards]`;
};

export const useSlideIn = (delay = 0, direction = 'bottom') => {
  const directionStyles = {
    'bottom': 'translate-y-4',
    'top': '-translate-y-4',
    'left': '-translate-x-4',
    'right': 'translate-x-4',
  };
  
  const directionClass = directionStyles[direction as keyof typeof directionStyles] || 'translate-y-4';
  
  // Keep the animation simple for faster initial render
  return `animate-slide-in opacity-0 ${directionClass} [animation-delay:${delay}ms] [animation-fill-mode:forwards]`;
};

export const usePopIn = (delay = 0) => {
  return `animate-pop-in opacity-0 scale-95 [animation-delay:${delay}ms] [animation-fill-mode:forwards]`;
};

export const useRotateIn = (delay = 0, degrees = 10) => {
  return `animate-rotate-in opacity-0 rotate-${degrees} [animation-delay:${delay}ms] [animation-fill-mode:forwards]`;
};

export const useStaggeredChildren = (baseDelay = 100, increment = 100) => {
  return (index: number) => {
    const delay = baseDelay + (index * increment);
    return useFadeIn(delay);
  };
};

export const useStaggeredSlideChildren = (baseDelay = 100, increment = 100, direction = 'bottom') => {
  return (index: number) => {
    const delay = baseDelay + (index * increment);
    return useSlideIn(delay, direction);
  };
};

export const useAnimatedList = (baseDelay = 100, increment = 100) => {
  return (index: number) => {
    const delay = baseDelay + (index * increment);
    return `animate-fade-slide-in opacity-0 translate-y-4 [animation-delay:${delay}ms] [animation-fill-mode:forwards]`;
  };
};

export const useAnimatedGrid = (baseDelay = 100, rowIncrement = 100, colIncrement = 50) => {
  return (row: number, col: number) => {
    const delay = baseDelay + (row * rowIncrement) + (col * colIncrement);
    return useFadeIn(delay);
  };
};
