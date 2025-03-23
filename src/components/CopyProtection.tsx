
import React, { useEffect, useState } from 'react';
import { enableTextProtection } from '@/utils/textProtection';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CopyProtectionProps {
  showNotice?: boolean;
}

const CopyProtection: React.FC<CopyProtectionProps> = ({ showNotice = true }) => {
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
    
    return () => {
      // Nothing to clean up for now - usually we would disable, but we want protection to remain
    };
  }, []);

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
