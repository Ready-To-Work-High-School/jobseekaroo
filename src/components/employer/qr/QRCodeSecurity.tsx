
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield } from 'lucide-react';

interface QRCodeSecurityProps {
  isBlocked: boolean;
  timeUntilReset: number;
  refreshInterval: number;
  companyName?: string;
}

const QRCodeSecurity: React.FC<QRCodeSecurityProps> = ({
  isBlocked,
  timeUntilReset,
  refreshInterval,
  companyName
}) => {
  return (
    <>
      {isBlocked && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Rate limit exceeded. Wait {timeUntilReset} seconds before trying again.
          </AlertDescription>
        </Alert>
      )}
      
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <div className="text-sm">
            <div className="font-medium mb-1">Session Validation Active</div>
            <div className="text-muted-foreground">
              QR codes expire after {refreshInterval} seconds to prevent unauthorized use
            </div>
            <div className="text-xs text-blue-600 mt-1">
              🔍 All QR code activities are logged for security audit
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </>
  );
};

export default QRCodeSecurity;
