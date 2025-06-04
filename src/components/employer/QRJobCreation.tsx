
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRateLimit } from '@/hooks/useRateLimit';
import { useAuth } from '@/hooks/useAuth';
import { logQRCodeEvent } from '@/utils/qrAuditLogger';
import QRCodeDisplay from './qr/QRCodeDisplay';
import QRCodeControls from './qr/QRCodeControls';
import QRCodeInfo from './qr/QRCodeInfo';
import QRCodeSecurity from './qr/QRCodeSecurity';
import QRCodeHeader from './qr/QRCodeHeader';
import { useQRCodeActions } from './qr/hooks/useQRCodeActions';

interface QRJobCreationProps {
  baseUrl?: string;
  size?: number;
  refreshInterval?: number;
}

const QRJobCreation: React.FC<QRJobCreationProps> = ({
  baseUrl = window.location.origin,
  size = 200,
  refreshInterval = 30
}) => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(refreshInterval);
  const { user, userProfile } = useAuth();
  
  const rateLimiter = useRateLimit({
    maxRequests: 10,
    windowMs: 5 * 60 * 1000
  });
  
  const qrValue = `${baseUrl}/employer/qr-generator?t=${timestamp}`;

  const { manualRefresh, downloadQRCode, shareQRCode } = useQRCodeActions({
    timestamp,
    setTimestamp,
    setTimeLeft,
    refreshInterval,
    size,
    userId: user?.id,
    companyName: userProfile?.company_name,
    rateLimiter
  });

  // Auto-refresh the QR code at regular intervals
  const autoRefresh = useCallback(() => {
    const newTimestamp = Date.now();
    setTimestamp(newTimestamp);
    setTimeLeft(refreshInterval);
    console.log('QR code auto-refreshed for security');
    
    if (user?.id) {
      logQRCodeEvent('auto_refresh', user.id, {
        company_name: userProfile?.company_name,
        timestamp: newTimestamp,
        refresh_interval: refreshInterval
      });
    }
  }, [refreshInterval, user?.id, userProfile?.company_name]);

  useEffect(() => {
    const interval = setInterval(autoRefresh, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Log initial QR code generation
  useEffect(() => {
    if (user?.id) {
      logQRCodeEvent('generate', user.id, {
        company_name: userProfile?.company_name,
        timestamp,
        size,
        refresh_interval: refreshInterval
      });
    }
  }, [user?.id, userProfile?.company_name, timestamp, size, refreshInterval]);

  // Countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return refreshInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [refreshInterval]);

  // Update rate limit countdown
  useEffect(() => {
    if (rateLimiter.isBlocked && rateLimiter.timeUntilReset > 0) {
      const interval = setInterval(() => {
        // The hook will automatically update the time
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [rateLimiter.isBlocked, rateLimiter.timeUntilReset]);

  return (
    <Card className="w-fit mx-auto">
      <QRCodeHeader companyName={userProfile?.company_name} />
      <CardContent className="flex flex-col items-center space-y-4">
        <QRCodeSecurity
          isBlocked={rateLimiter.isBlocked}
          timeUntilReset={rateLimiter.timeUntilReset}
          refreshInterval={refreshInterval}
          companyName={userProfile?.company_name}
        />
        
        <QRCodeDisplay
          qrValue={qrValue}
          size={size}
          timeLeft={timeLeft}
        />
        
        <QRCodeInfo
          qrValue={qrValue}
          refreshInterval={refreshInterval}
          remainingRequests={rateLimiter.getRemainingRequests()}
        />
        
        <QRCodeControls
          onManualRefresh={manualRefresh}
          onDownload={downloadQRCode}
          onShare={shareQRCode}
          isBlocked={rateLimiter.isBlocked}
        />
      </CardContent>
    </Card>
  );
};

export default QRJobCreation;
