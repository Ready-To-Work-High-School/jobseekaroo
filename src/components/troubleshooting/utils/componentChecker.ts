
/**
 * Utility functions to check for missing critical components and links
 */

/**
 * Check for missing links in the navigation
 * @returns Array of issues related to missing navigation links
 */
export const checkMissingLinks = (): string[] => {
  const issues: string[] = [];
  
  // Get all route links in the document
  const links = document.querySelectorAll('a');
  
  // Check if critical navigation links exist
  const criticalPaths = ['/jobs', '/profile', '/dashboard'];
  const foundPaths = Array.from(links).map(link => link.getAttribute('href'));
  
  criticalPaths.forEach(path => {
    if (!foundPaths.some(href => href === path)) {
      issues.push(`Missing navigation link to ${path}`);
    }
  });
  
  return issues;
};

/**
 * Check for critical UI components being properly rendered
 * @returns Array of issues related to critical components
 */
export const checkCriticalComponents = (): string[] => {
  const issues: string[] = [];
  
  // Check for header presence
  if (!document.querySelector('header')) {
    issues.push('Header component is missing or not rendering properly');
  }
  
  // Check for footer presence
  if (!document.querySelector('footer')) {
    issues.push('Footer component is missing or not rendering properly');
  }
  
  // Check for main navigation
  if (!document.querySelector('nav')) {
    issues.push('Navigation component is missing or not rendering properly');
  }
  
  // Check for common UI elements
  const commonElements = ['button', 'input', 'a'];
  commonElements.forEach(element => {
    if (document.querySelectorAll(element).length === 0) {
      issues.push(`No ${element} elements found in the DOM, possible rendering issue`);
    }
  });
  
  return issues;
};
