
import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, Share2, Shield, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QRJobCreation = () => {
  const [qrValue, setQrValue] = useState('');
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [timeRemaining, setTimeRemaining] = useState(30);
  const { toast } = useToast();

  // Generate QR code URL with timestamp for security
  const generateQRValue = () => {
    const timestamp = Date.now();
    const baseUrl = window.location.origin;
    const qrUrl = `${baseUrl}/jobs/quick-apply?t=${timestamp}&employer=verified`;
    setQrValue(qrUrl);
    setLastRefresh(timestamp);
    setTimeRemaining(30);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    generateQRValue();
    
    const interval = setInterval(() => {
      generateQRValue();
      toast({
        title: "QR Code Refreshed",
        description: "Security code updated automatically",
        duration: 2000,
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) return 30;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lastRefresh]);

  const handleManualRefresh = () => {
    generateQRValue();
    toast({
      title: "QR Code Refreshed",
      description: "New security code generated",
    });
  };

  const handleDownload = () => {
    const svg = document.querySelector('#qr-code-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'job-qr-code.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
    
    toast({
      title: "QR Code Downloaded",
      description: "PNG file saved to your device",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Job Application QR Code',
          text: 'Scan this QR code to apply for our position',
          url: qrValue,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(qrValue);
      toast({
        title: "QR Code URL Copied",
        description: "Share the link with potential applicants",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Secure QR Code
        </CardTitle>
        <CardDescription>
          Students can scan this code to apply instantly
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* QR Code Display */}
        <div className="flex justify-center p-4 bg-white rounded-lg border-2 border-dashed border-gray-300">
          {qrValue && (
            <QRCodeSVG
              id="qr-code-svg"
              value={qrValue}
              size={200}
              level="M"
              includeMargin={true}
              fgColor="#1f2937"
              bgColor="#ffffff"
            />
          )}
        </div>
        
        {/* Security Timer */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Refreshes in {timeRemaining}s</span>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download className="h-3 w-3" />
            Download
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex items-center gap-1"
          >
            <Share2 className="h-3 w-3" />
            Share
          </Button>
        </div>
        
        {/* Security Notice */}
        <div className="text-xs text-center text-gray-500 border-t pt-3">
          <p className="flex items-center justify-center gap-1">
            <Shield className="h-3 w-3" />
            Code auto-refreshes for security
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRJobCreation;
