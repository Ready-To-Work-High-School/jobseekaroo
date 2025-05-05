
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
    
    // Check for broken links (those with '#' only or javascript:void(0))
    const potentiallyBrokenLinks = Array.from(document.querySelectorAll('a[href="#"], a[href="javascript:void(0)"]'));
    if (potentiallyBrokenLinks.length > 0) {
      issues.push(`Found ${potentiallyBrokenLinks.length} potentially broken or placeholder links`);
    }
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
  
  // Check for UI inconsistencies
  const buttons = document.querySelectorAll('button');
  const visibleButtons = Array.from(buttons).filter(button => {
    const style = window.getComputedStyle(button);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  });
  
  // Check if any visible buttons lack accessible text
  const inaccessibleButtons = visibleButtons.filter(button => 
    !button.textContent?.trim() && 
    !button.getAttribute('aria-label') &&
    !button.getAttribute('title')
  );
  
  if (inaccessibleButtons.length > 0) {
    issues.push(`Found ${inaccessibleButtons.length} buttons without accessible text`);
  }
  
  return issues;
};

/**
 * Check for accessibility issues in the current DOM
 * @returns Array of detected accessibility issues
 */
export const checkAccessibilityIssues = (): string[] => {
  const issues: string[] = [];
  
  try {
    // Check for images without alt text
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    if (imagesWithoutAlt.length > 0) {
      issues.push(`Found ${imagesWithoutAlt.length} images without alt text`);
    }
    
    // Check for form elements without labels
    const formElements = document.querySelectorAll('input, select, textarea');
    let unlabeledElements = 0;
    
    formElements.forEach(element => {
      const id = element.getAttribute('id');
      if (id) {
        // Check if there's a label with a matching 'for' attribute
        const hasLabel = document.querySelector(`label[for="${id}"]`);
        if (!hasLabel && !element.getAttribute('aria-label')) {
          unlabeledElements++;
        }
      } else if (!element.getAttribute('aria-label')) {
        // No id and no aria-label
        unlabeledElements++;
      }
    });
    
    if (unlabeledElements > 0) {
      issues.push(`Found ${unlabeledElements} form elements without proper labels`);
    }
  } catch (error) {
    console.error("Error checking accessibility issues:", error);
  }
  
  return issues;
};

