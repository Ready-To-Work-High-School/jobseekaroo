
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthCallbackErrorProps {
  error: string;
  diagnosticInfo: Record<string, any>;
}

const AuthCallbackError = ({ error, diagnosticInfo }: AuthCallbackErrorProps) => {
  const isGoogleError = error.toLowerCase().includes('google') || 
                       diagnosticInfo.provider === 'google';
  const isAppleError = error.toLowerCase().includes('apple') || 
                      diagnosticInfo.provider === 'apple';
  
  return (
    <div className="bg-white border border-red-200 rounded-lg shadow-md p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-red-100 p-3 rounded-full">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-red-700 mb-2">Authentication Failed</h3>
      <p className="text-red-600 mb-4">{error}</p>
      
      {isGoogleError && (
        <div className="bg-blue-50 p-4 rounded-md mb-4 text-left">
          <h4 className="font-semibold text-blue-800 mb-2">Google Authentication Troubleshooting:</h4>
          <ul className="list-disc pl-5 text-blue-700 text-sm space-y-1">
            <li>Make sure third-party cookies are enabled in your browser</li>
            <li>Try using Chrome instead of Safari or Firefox</li>
            <li>Check if your browser is in private/incognito mode</li>
            <li>Ensure your network doesn't block Google authentication services</li>
          </ul>
        </div>
      )}
      
      {isAppleError && (
        <div className="bg-gray-50 p-4 rounded-md mb-4 text-left">
          <h4 className="font-semibold text-gray-800 mb-2">Apple Authentication Troubleshooting:</h4>
          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
            <li>Make sure you're signed in to your Apple ID</li>
            <li>Try using Safari for the best compatibility</li>
            <li>Ensure pop-ups are allowed for this website</li>
            <li>Check if you have two-factor authentication enabled on your Apple ID</li>
          </ul>
        </div>
      )}
      
      <div className="space-x-3">
        <Button asChild variant="default" className="mt-2">
          <Link to="/sign-in">Return to Sign In</Link>
        </Button>
        <Button asChild variant="outline" className="mt-2">
          <Link to="/">Go to Home</Link>
        </Button>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          If you continue to experience issues, please contact support or try a different sign-in method.
        </p>
      </div>
    </div>
  );
};

export default AuthCallbackError;
