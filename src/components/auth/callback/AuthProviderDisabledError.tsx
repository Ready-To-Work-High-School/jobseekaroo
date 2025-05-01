
import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthProviderDisabledErrorProps {
  provider: string;
}

const AuthProviderDisabledError = ({ provider }: AuthProviderDisabledErrorProps) => {
  const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
  
  return (
    <div className="bg-white border border-red-200 rounded-lg shadow-md p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-red-100 p-3 rounded-full">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-red-700 mb-2">Authentication Provider Not Enabled</h3>
      <p className="text-gray-700 mb-4">
        {providerName} authentication is not currently enabled for this application.
      </p>
      
      <div className="bg-amber-50 p-4 rounded-md mb-4 text-left">
        <h4 className="font-semibold text-amber-800 mb-2">What happened:</h4>
        <p className="text-amber-700 text-sm mb-2">
          The {providerName} authentication provider has not been properly configured in the Supabase project settings.
        </p>
        <h4 className="font-semibold text-amber-800 mt-3 mb-1">Next steps:</h4>
        <ul className="list-disc pl-5 text-amber-700 text-sm space-y-1">
          <li>Use email/password authentication instead</li>
          <li>Try another social login provider if available</li>
          <li>Contact the application administrator to enable {providerName} authentication</li>
        </ul>
      </div>
      
      <div className="space-x-3">
        <Button asChild variant="default" className="mt-2">
          <Link to="/sign-in">Return to Sign In</Link>
        </Button>
        <Button asChild variant="outline" className="mt-2">
          <Link to="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default AuthProviderDisabledError;
