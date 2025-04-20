
// Utility functions for checking UI components and links
export const checkMissingLinks = () => {
  const missingItems: string[] = [];
  const expectedLinks = [
    '/jobs', 
    '/student-dashboard', 
    '/profile', 
    '/saved-jobs', 
    '/interview-prep'
  ];

  expectedLinks.forEach(link => {
    try {
      const element = document.querySelector(`a[href="${link}"]`);
      if (!element) {
        missingItems.push(`Missing link: ${link}`);
      }
    } catch (error) {
      console.error(`Error checking link ${link}:`, error);
      // Don't add to missing items on error to avoid false positives
    }
  });

  return missingItems;
};

export const checkCriticalComponents = () => {
  const missingItems: string[] = [];
  const criticalComponents = [
    '#job-listings', 
    '.user-profile', 
    '.application-form'
  ];

  criticalComponents.forEach(selector => {
    try {
      const element = document.querySelector(selector);
      if (!element) {
        missingItems.push(`Missing component: ${selector}`);
      }
    } catch (error) {
      console.error(`Error checking component ${selector}:`, error);
      // Don't add to missing items on error to avoid false positives
    }
  });

  return missingItems;
};
