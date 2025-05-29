
import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, QrCode, RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRateLimit } from '@/hooks/useRateLimit';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QRJobCreationProps {
  baseUrl?: string;
  size?: number;
  refreshInterval?: number; // in seconds
}

const QRJobCreation: React.FC<QRJobCreationProps> = ({
  baseUrl = window.location.origin,
  size = 200,
  refreshInterval = 30 // refresh every 30 seconds by default
}) => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(refreshInterval);
  const { toast } = useToast();
  
  // Rate limiting: 10 manual refreshes per 5 minutes
  const rateLimiter = useRateLimit({
    maxRequests: 10,
    windowMs: 5 * 60 * 1000 // 5 minutes
  });
  
  const qrValue = `${baseUrl}/employer/qr-generator?t=${timestamp}`;

  // Auto-refresh the QR code at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
      setTimeLeft(refreshInterval);
      console.log('QR code refreshed for security');
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

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

  const manualRefresh = () => {
    if (!rateLimiter.checkRateLimit()) {
      toast({
        title: "Rate Limited",
        description: `Too many refresh attempts. Try again in ${rateLimiter.timeUntilReset} seconds.`,
        variant: "destructive"
      });
      return;
    }

    setTimestamp(Date.now());
    setTimeLeft(refreshInterval);
    toast({
      title: "QR Code Refreshed",
      description: `New secure QR code generated (${rateLimiter.getRemainingRequests()} refreshes remaining)`
    });
  };

  const downloadQRCode = () => {
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
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const shareQRCode = async () => {
    if (!rateLimiter.checkRateLimit()) {
      toast({
        title: "Rate Limited",
        description: `Too many share attempts. Try again in ${rateLimiter.timeUntilReset} seconds.`,
        variant: "destructive"
      });
      return;
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
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue);
    toast({
      title: "Link Copied",
      description: "Job posting link copied to clipboard"
    });
  };

  return (
    <Card className="w-fit mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Secure Job Posting QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {rateLimiter.isBlocked && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Rate limit exceeded. Wait {rateLimiter.timeUntilReset} seconds before trying again.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-white p-4 rounded-lg border relative">
          <QRCode
            id="job-creation-qr"
            value={qrValue}
            size={size}
            level="H"
          />
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {timeLeft}s
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Scan to create a job posting
          </p>
          <p className="text-xs text-green-600 font-medium">
            🔒 Auto-refreshes every {refreshInterval}s for security
          </p>
          <p className="text-xs text-blue-600 font-medium">
            ⚡ {rateLimiter.getRemainingRequests()} manual actions remaining
          </p>
          <p className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
            {qrValue}
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap justify-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={manualRefresh}
            disabled={rateLimiter.isBlocked}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Now
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={downloadQRCode}
            disabled={rateLimiter.isBlocked}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={shareQRCode}
            disabled={rateLimiter.isBlocked}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRJobCreation;
