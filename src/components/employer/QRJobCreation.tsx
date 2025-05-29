
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, QrCode, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sanitizeHtml, validateUrl } from '@/utils/sanitization';

interface QRJobCreationProps {
  baseUrl?: string;
  size?: number;
}

const QRJobCreation: React.FC<QRJobCreationProps> = ({
  baseUrl = window.location.origin,
  size = 200
}) => {
  // Validate and sanitize the base URL
  const sanitizedBaseUrl = sanitizeHtml(baseUrl);
  const isValidUrl = validateUrl(sanitizedBaseUrl);
  
  // Use a secure, validated URL for the QR code - links to the main website
  const secureUrl = isValidUrl ? sanitizedBaseUrl : window.location.origin;
  const [qrValue] = useState(secureUrl);
  const { toast } = useToast();

  // Security check for QR value
  const isSecureQrValue = validateUrl(qrValue);

  const downloadQRCode = () => {
    if (!isSecureQrValue) {
      toast({
        title: "Security Error",
        description: "QR code contains invalid URL",
        variant: "destructive"
      });
      return;
    }

    const svg = document.getElementById('job-creation-qr') as HTMLElement;
    if (!svg) return;
    
    try {
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
        downloadLink.download = 'jobseekers4hs-qr-code.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.onerror = () => {
        toast({
          title: "Download Error",
          description: "Failed to generate QR code image",
          variant: "destructive"
        });
      };
      
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    } catch (error) {
      console.error('QR code download error:', error);
      toast({
        title: "Download Error",
        description: "Failed to download QR code",
        variant: "destructive"
      });
    }
  };

  const shareQRCode = async () => {
    if (!isSecureQrValue) {
      toast({
        title: "Security Error",
        description: "Cannot share insecure URL",
        variant: "destructive"
      });
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Job Seekers 4 High Schools - Student Job Portal',
          text: 'Scan this QR code to access JobSeekers4HS - the premier job platform for high school students',
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
    if (!isSecureQrValue) {
      toast({
        title: "Security Error",
        description: "Cannot copy insecure URL",
        variant: "destructive"
      });
      return;
    }

    navigator.clipboard.writeText(qrValue);
    toast({
      title: "Link Copied",
      description: "JobSeekers4HS website link copied to clipboard"
    });
  };

  // Don't render if URL is not secure
  if (!isSecureQrValue) {
    return (
      <Card className="w-fit mx-auto border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Shield className="h-5 w-5" />
            Security Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Invalid or insecure URL detected. QR code generation blocked for security.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-fit mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          JobSeekers4HS Access QR Code
          <Shield className="h-4 w-4 text-green-600" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg border">
          <QRCode
            id="job-creation-qr"
            value={qrValue}
            size={size}
            level="H"
          />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Scan to access JobSeekers4HS platform
          </p>
          <p className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
            {qrValue}
          </p>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <Shield className="h-3 w-3" />
            <span>Secure & Verified URL</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={downloadQRCode}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={shareQRCode}
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
