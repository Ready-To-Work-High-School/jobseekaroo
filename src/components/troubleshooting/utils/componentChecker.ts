
/**
 * Utility to check for missing/broken components in the UI
 */

// Check for missing links in the navigation
export const checkMissingLinks = (): string[] => {
  const issues: string[] = [];
  
  try {
    // Check if main navigation links are defined
    const nav = document.querySelector('nav');
    if (nav) {
      // No navigation issues found
    } else {
      issues.push("Navigation component not found");
    }
    
    // Check for broken links (404s would be caught by the browser)
    const deadLinks = document.querySelectorAll('a[href="#broken"]');
    if (deadLinks.length > 0) {
      issues.push(`Found ${deadLinks.length} potentially broken links`);
    }
  } catch (error) {
    console.error("Error checking links:", error);
  }
  
  return issues;
};

// Check for critical UI components
export const checkCriticalComponents = (): string[] => {
  const issues: string[] = [];
  
  try {
    // Check for main content area
    if (!document.querySelector('main')) {
      issues.push("Main content area not found");
    }
    
    // Check for proper layout structure
    if (!document.querySelector('.layout, .app, #root > div')) {
      issues.push("Basic layout structure may be broken");
    }
  } catch (error) {
    console.error("Error checking components:", error);
  }
  
  return issues;
};

// Check for rendering errors (React error boundaries would catch these)
export const checkRenderingErrors = (): string[] => {
  const issues: string[] = [];
  
  try {
    // Look for error messages in the DOM
    const errorMessages = document.querySelectorAll('.error-message, [data-error]');
    if (errorMessages.length > 0) {
      issues.push(`Found ${errorMessages.length} error messages in the UI`);
    }
  } catch (error) {
    console.error("Error checking render errors:", error);
  }
  
  return issues;
};
