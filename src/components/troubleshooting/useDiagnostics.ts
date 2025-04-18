
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const useDiagnostics = () => {
  const { toast } = useToast();
  const isOnline = useNetworkStatus();
  const [isChecking, setIsChecking] = useState(false);

  const checkMissingLinksAndComponents = () => {
    const missingItems = [];

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
      }
    });

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
      }
    });

    return missingItems;
  };

  const handleDiagnostics = async () => {
    setIsChecking(true);
    try {
      const networkStatus = isOnline;
      const authStatus = true; // Replace with actual auth check
      const dataStatus = true; // Replace with actual data access check
      const missingItems = checkMissingLinksAndComponents();

      toast({
        title: "Diagnostic Results",
        description: `
          Network: ${networkStatus ? "✅" : "❌"}
          Auth: ${authStatus ? "✅" : "❌"}
          Data: ${dataStatus ? "✅" : "❌"}
          Missing Items: ${missingItems.length > 0 ? missingItems.join(", ") : "None"}
        `,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Diagnostic Failed",
        description: "Could not complete the system check. Please try again later.",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return {
    isChecking,
    handleDiagnostics
  };
};
