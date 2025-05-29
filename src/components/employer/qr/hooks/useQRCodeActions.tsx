
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { logQRCodeEvent } from '@/utils/qrAuditLogger';

interface UseQRCodeActionsProps {
  timestamp: number;
  setTimestamp: (timestamp: number) => void;
  setTimeLeft: (timeLeft: number) => void;
  refreshInterval: number;
  size: number;
  userId?: string;
  companyName?: string;
  rateLimiter: any;
}

export const useQRCodeActions = ({
  timestamp,
  setTimestamp,
  setTimeLeft,
  refreshInterval,
  size,
  userId,
  companyName,
  rateLimiter
}: UseQRCodeActionsProps) => {
  const { toast } = useToast();

  const manualRefresh = useCallback(() => {
    if (!rateLimiter.checkRateLimit()) {
      toast({
        title: "Rate Limited",
        description: `Too many refresh attempts. Try again in ${rateLimiter.timeUntilReset} seconds.`,
        variant: "destructive"
      });
      return;
    }

    const newTimestamp = Date.now();
    setTimestamp(newTimestamp);
    setTimeLeft(refreshInterval);
    
    if (userId) {
      logQRCodeEvent('manual_refresh', userId, {
        company_name: companyName,
        timestamp: newTimestamp,
        remaining_requests: rateLimiter.getRemainingRequests()
      });
    }
    
    toast({
      title: "QR Code Refreshed",
      description: `New secure QR code generated (${rateLimiter.getRemainingRequests()} refreshes remaining)`
    });
  }, [rateLimiter, timestamp, setTimestamp, setTimeLeft, refreshInterval, userId, companyName, toast]);

  const downloadQRCode = useCallback(() => {
    if (!rateLimiter.checkRateLimit()) {
      toast({
        title: "Rate Limited",
        description: `Too many download attempts. Try again in ${rateLimiter.timeUntilReset} seconds.`,
        variant: "destructive"
      });
      return;
    }

    const svg = document.getElementById('job-creation-qr') as HTMLElement;
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `job-creation-qr-${timestamp}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      if (userId) {
        logQRCodeEvent('download', userId, {
          company_name: companyName,
          timestamp,
          filename: `job-creation-qr-${timestamp}.png`,
          remaining_requests: rateLimiter.getRemainingRequests()
        });
      }
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  }, [rateLimiter, size, timestamp, userId, companyName, toast]);

  const shareQRCode = useCallback(async () => {
    if (!rateLimiter.checkRateLimit()) {
      toast({
        title: "Rate Limited",
        description: `Too many share attempts. Try again in ${rateLimiter.timeUntilReset} seconds.`,
        variant: "destructive"
      });
      return;
    }

    const baseUrl = window.location.origin;
    const qrValue = `${baseUrl}/employer/qr-generator?t=${timestamp}`;

    if (userId) {
      logQRCodeEvent('share', userId, {
        company_name: companyName,
        timestamp,
        share_method: navigator.share ? 'native' : 'clipboard',
        remaining_requests: rateLimiter.getRemainingRequests()
      });
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quick Job Posting',
          text: 'Scan this QR code to quickly post a job on JobSeekers4HS',
          url: qrValue
        });
      } catch (error) {
        console.error('Error sharing:', error);
        copyToClipboard(qrValue);
      }
    } else {
      copyToClipboard(qrValue);
    }
  }, [rateLimiter, timestamp, userId, companyName, toast]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Link Copied",
      description: "Job posting link copied to clipboard"
    });
  }, [toast]);

  return {
    manualRefresh,
    downloadQRCode,
    shareQRCode
  };
};
