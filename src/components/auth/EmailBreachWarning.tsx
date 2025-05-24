
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield, Info } from 'lucide-react';

interface EmailBreachWarningProps {
  isBreached: boolean;
  breachCount: number;
  breaches?: string[];
  message: string;
}

const EmailBreachWarning: React.FC<EmailBreachWarningProps> = ({
  isBreached,
  breachCount,
  breaches,
  message
}) => {
  if (!isBreached && breachCount === 0) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          ✓ {message}
        </AlertDescription>
      </Alert>
    );
  }

  if (isBreached) {
    return (
      <Alert variant="destructive" className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <div className="space-y-2">
            <p className="font-medium">⚠️ Security Alert: {message}</p>
            <p className="text-sm">
              We recommend using a different email address or ensuring your password is unique and strong.
            </p>
            {breaches && breaches.length > 0 && (
              <details className="text-xs">
                <summary className="cursor-pointer hover:underline">
                  View affected services ({breachCount} total)
                </summary>
                <div className="mt-1 pl-4">
                  {breaches.slice(0, 10).map((breach, index) => (
                    <div key={index}>• {breach}</div>
                  ))}
                  {breaches.length > 10 && (
                    <div>• ... and {breaches.length - 10} more</div>
                  )}
                </div>
              </details>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default EmailBreachWarning;
