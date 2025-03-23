
import React, { useEffect } from 'react';
import { enableTextProtection } from '@/utils/textProtection';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface CopyProtectionProps {
  showNotice?: boolean;
}

const CopyProtection: React.FC<CopyProtectionProps> = ({ showNotice = true }) => {
  useEffect(() => {
    // Enable protection when component mounts
    enableTextProtection();
    
    return () => {
      // Nothing to clean up for now - usually we would disable, but we want protection to remain
    };
  }, []);

  if (!showNotice) return null;

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
