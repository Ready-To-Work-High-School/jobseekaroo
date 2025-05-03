
// This file provides utility functions to check for missing components and links

export const checkMissingLinks = (): string[] => {
  try {
    // Define essential routes that should be accessible
    const essentialRoutes = [
      { path: '/jobs', name: 'Jobs listing' },
      { path: '/student-dashboard', name: 'Student dashboard' },
      { path: '/profile', name: 'User profile' },
      { path: '/applications', name: 'Applications' },
      { path: '/settings', name: 'Settings' }
    ];
    
    const missingLinks: string[] = [];
    
    // Check for the presence of navigation links in the DOM
    essentialRoutes.forEach(route => {
      const linkExists = document.querySelector(`a[href="${route.path}"]`) || 
                        document.querySelector(`a[href="#${route.path}"]`);
      
      if (!linkExists) {
        missingLinks.push(`Missing link: ${route.name}`);
      }
    });
    
    return missingLinks;
  } catch (error) {
    console.error("Error checking for missing links:", error);
    return [];
  }
};

export const checkCriticalComponents = (): string[] => {
  try {
    // Define critical components that should be present
    const criticalComponents = [
      { selector: '#job-listings', name: 'Job listings component' },
      { selector: '.user-profile', name: 'User profile component' },
      { selector: '.navigation-menu', name: 'Navigation menu' }
    ];
    
    const missingComponents: string[] = [];
    
    // Check if these components exist in the DOM
    criticalComponents.forEach(component => {
      const exists = document.querySelector(component.selector);
      if (!exists) {
        missingComponents.push(`Missing component: ${component.name}`);
      }
    });
    
    return missingComponents;
  } catch (error) {
    console.error("Error checking for critical components:", error);
    return [];
  }
};
