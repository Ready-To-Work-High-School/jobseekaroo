
import React, { useEffect, useState } from 'react';
import { enableTextProtection } from '@/utils/textProtection';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CopyProtectionProps {
  showNotice?: boolean;
  enhancedProtection?: boolean;
}

const CopyProtection: React.FC<CopyProtectionProps> = ({ 
  showNotice = true, 
  enhancedProtection = true 
}) => {
  const [showAlert, setShowAlert] = useState(false);
  
  // Function to handle copy attempts
  const handleCopyAttempt = () => {
    setShowAlert(true);
    
    // Auto-hide the alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    
    // Also show a toast notification
    toast({
      title: "Protected Content",
      description: "Unauthorized copying or redistribution of content is prohibited.",
      variant: "destructive",
    });
  };
  
  useEffect(() => {
    // Enable protection when component mounts
    enableTextProtection(handleCopyAttempt);
    
    // Enhanced security measures - uses only DOM APIs that are allowed by CSP
    if (enhancedProtection) {
      // Use MutationObserver to detect potentially dangerous elements
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
              // Check for suspicious iframes or script injections
              if (node.nodeName === 'IFRAME' || node.nodeName === 'SCRIPT') {
                const element = node as HTMLElement;
                const src = element.getAttribute('src') || '';
                
                // Only allow trusted sources
                if (src && 
                    !src.includes('lovable.dev') && 
                    !src.includes('gpteng.co')) {
                  console.warn('Suspicious element detected and blocked:', node);
                  element.remove();
                  
                  toast({
                    title: "Security Alert",
                    description: "Suspicious content was blocked for your protection.",
                    variant: "destructive",
                  });
                }
              }
            });
          }
        });
      });
      
      // Start observing document for changes
      observer.observe(document.body, { childList: true, subtree: true });
      
      return () => {
        observer.disconnect();
      };
    }
  }, [enhancedProtection]);

  if (!showNotice || !showAlert) return null;

  return (
    <Alert variant="destructive" className="fixed bottom-4 right-4 w-auto max-w-md z-50 bg-white/95 border-red-500 shadow-lg">
      <AlertTriangle className="h-4 w-4 text-red-500" />
      <AlertDescription className="text-xs md:text-sm">
        Unauthorized copying or redistribution of content is prohibited.
      </AlertDescription>
    </Alert>
  );
};

export default CopyProtection;
