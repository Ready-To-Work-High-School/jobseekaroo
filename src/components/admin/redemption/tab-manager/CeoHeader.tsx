
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck } from 'lucide-react';

const CeoHeader: React.FC = () => {
  return (
    <Alert className="mb-6 bg-amber-50 text-amber-900 border-amber-200">
      <ShieldCheck className="h-5 w-5 text-amber-600" />
      <AlertTitle className="text-amber-800">Executive Access</AlertTitle>
      <AlertDescription className="text-amber-700">
        You have executive-level access to the redemption code management system. 
        You can generate, distribute, and manage all redemption codes.
      </AlertDescription>
    </Alert>
  );
};

export default CeoHeader;
