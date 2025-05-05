
/**
 * Utility functions for checking UI components and navigation issues
 */

/**
 * Check for missing or broken navigation links
 * @returns Array of detected issues
 */
export const checkMissingLinks = (): string[] => {
  const issues: string[] = [];
  
  try {
    // Check if essential navigation links are present in the DOM
    const essentialPaths = ['/', '/jobs', '/profile', '/sign-in', '/sign-up'];
    const links = Array.from(document.querySelectorAll('a'))
      .map(link => link.getAttribute('href'))
      .filter(Boolean);
    
    essentialPaths.forEach(path => {
      if (!links.some(link => link === path || link?.endsWith(path))) {
        issues.push(`Navigation link to "${path}" may be missing`);
      }
    });
  } catch (error) {
    console.error("Error checking navigation links:", error);
  }
  
  return issues;
};

/**
 * Check for critical component presence and errors
 * @returns Array of detected issues
 */
export const checkCriticalComponents = (): string[] => {
  const issues: string[] = [];
  
  // Check if critical components are present
  const criticalComponents = [
    { selector: 'nav', name: 'Navigation bar' },
    { selector: 'main', name: 'Main content container' },
    { selector: 'footer', name: 'Footer' }
  ];
  
  criticalComponents.forEach(component => {
    if (document.querySelector(component.selector) === null) {
      issues.push(`Critical component "${component.name}" may be missing`);
    }
  });
  
  // Check for error boundaries without fallbacks
  // This is just a heuristic check since we can't truly detect this at runtime
  const errorBoundaries = Array.from(document.querySelectorAll('[data-error-boundary]'));
  if (errorBoundaries.length === 0) {
    issues.push('No error boundaries detected, application may crash on component errors');
  }
  
  return issues;
};
