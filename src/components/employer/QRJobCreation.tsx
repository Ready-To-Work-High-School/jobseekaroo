
import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, QrCode, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRJobCreationProps {
  baseUrl?: string;
  size?: number;
}

const QRJobCreation: React.FC<QRJobCreationProps> = ({
  baseUrl,
  size = 200
}) => {
  // Hardcoded secure URL for JobSeekers4HS
  const SECURE_URL = 'https://jobseekers4hs.org';
  const [qrValue, setQrValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simple initialization - set the QR value immediately
    console.log('Initializing QR code with URL:', SECURE_URL);
    setQrValue(SECURE_URL);
    setIsLoading(false);
  }, []);

  const downloadQRCode = () => {
    const svg = document.getElementById('job-creation-qr') as HTMLElement;
    if (!svg) {
      toast({
        title: "Download Error",
        description: "QR code element not found",
        variant: "destructive"
      });
      return;
    }
    
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
        
        toast({
          title: "Success",
          description: "QR code downloaded successfully"
        });
      };
      
      img.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to generate image",
          variant: "destructive"
        });
      };
      
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download QR code",
        variant: "destructive"
      });
    }
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'JobSeekers4HS',
          text: 'Scan this QR code to access JobSeekers4HS',
          url: qrValue
        });
      } catch (error) {
        console.error('Share error:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue).then(() => {
      toast({
        title: "Copied",
        description: "Link copied to clipboard"
      });
    }).catch(() => {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive"
      });
    });
  };

  if (isLoading) {
    return (
      <Card className="w-fit mx-auto">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading QR code...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!qrValue) {
    return (
      <Card className="w-fit mx-auto border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Failed to generate QR code</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-fit mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          JobSeekers4HS QR Code
          <Shield className="h-4 w-4 text-green-600" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <QRCode
            id="job-creation-qr"
            value={qrValue}
            size={size}
            level="H"
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Scan to access JobSeekers4HS
          </p>
          <p className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
            {qrValue}
          </p>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <Shield className="h-3 w-3" />
            <span>Secure URL</span>
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
