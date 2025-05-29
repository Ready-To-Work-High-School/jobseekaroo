
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { validateQRCodeUrl } from '@/utils/qrValidation';

interface QRValidatorProps {
  maxAgeSeconds?: number;
  onValidationChange?: (isValid: boolean) => void;
}

const QRValidator: React.FC<QRValidatorProps> = ({ 
  maxAgeSeconds = 60,
  onValidationChange 
}) => {
  const [searchParams] = useSearchParams();
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    reason?: string;
    timeRemaining?: number;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const timestamp = searchParams.get('t');
    
    if (timestamp) {
      const currentUrl = window.location.href;
      const result = validateQRCodeUrl(currentUrl, maxAgeSeconds);
      setValidationResult(result);
      setTimeLeft(result.timeRemaining || 0);
      
      if (onValidationChange) {
        onValidationChange(result.isValid);
      }
    } else {
      // No timestamp parameter - this might be a direct access
      setValidationResult({
        isValid: true, // Allow direct access
        reason: 'Direct access (no QR validation required)'
      });
      
      if (onValidationChange) {
        onValidationChange(true);
      }
    }
  }, [searchParams, maxAgeSeconds, onValidationChange]);

  // Countdown timer for valid QR codes
  useEffect(() => {
    if (validationResult?.isValid && timeLeft !== null && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            // Re-validate when time expires
            const timestamp = searchParams.get('t');
            if (timestamp) {
              const currentUrl = window.location.href;
              const newResult = validateQRCodeUrl(currentUrl, maxAgeSeconds);
              setValidationResult(newResult);
              
              if (onValidationChange) {
                onValidationChange(newResult.isValid);
              }
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [validationResult?.isValid, timeLeft, searchParams, maxAgeSeconds, onValidationChange]);

  if (!validationResult) {
    return null;
  }

  const getStatusIcon = () => {
    if (validationResult.isValid) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    return validationResult.isValid ? 'default' : 'destructive';
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          {getStatusIcon()}
          QR Code Security Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant={getStatusColor()}>
          <AlertDescription className="flex items-center justify-between">
            <span>
              {validationResult.isValid 
                ? 'QR code is valid and secure' 
                : validationResult.reason || 'QR code validation failed'
              }
            </span>
            {validationResult.isValid && timeLeft !== null && timeLeft > 0 && (
              <div className="flex items-center gap-1 text-sm font-mono">
                <Clock className="h-3 w-3" />
                {timeLeft}s
              </div>
            )}
          </AlertDescription>
        </Alert>
        
        {!validationResult.isValid && (
          <div className="mt-3 text-sm text-muted-foreground">
            <p>Please scan a fresh QR code from the employer's QR generator page.</p>
            <div className="flex items-center gap-1 mt-1">
              <RefreshCw className="h-3 w-3" />
              QR codes refresh every {maxAgeSeconds} seconds for security
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRValidator;
